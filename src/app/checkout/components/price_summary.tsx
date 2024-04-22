"use client";
import Button from "@material-tailwind/react/components/Button";
import Checkbox from "@material-tailwind/react/components/Checkbox";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Image from "next/image";
import { useCart } from "@/src/providers/cart_context";
import {
  addPlan,
  capturePayment,
  checkoutToOrder,
  makePayment,
  updateCheckout,
} from "@/src/providers/api_provider";
import ZenclubConfirmationCheckbox from "./zenclub_confirmation_checkbox";
import ZenclubInfoDialog from "./zenclub_info_dialog";
import { useRouter } from "next/navigation";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";

import CustomizeDialog from "./customize_dialog";

import { CheckoutModel, Line } from "@/src/providers/models/checkout_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import { useSiteData } from "@/src/providers/site_data_context";
import Link from "next/link";

type PriceSummaryProps = {
  showPaymentOption?: () => void;
};

export default function PriceSummary({ showPaymentOption }: PriceSummaryProps) {
  const showCoupon = true;
  const {
    currentStep,
    checkout,
    selectedAddress,
    selectedPayment,
    showCustomizeDialog,
    editAddress,
    clearCart,
    setShowCustomizeDialog,
    setOrderSuccess,
    setCheckout,
    setCustomizeCheckout,
  } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(true);

  const router = useRouter();

  const updateSuccess = (
    commissionEarned: number | undefined,
    plan: number | undefined | null,
    canUpgrade: boolean | null | undefined,
    userName: string | null | undefined
  ) => {
    setOrderSuccess({
      commission_earned: commissionEarned,
      plan: plan,
      can_upgrade: canUpgrade,
      user_name: userName,
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  async function placeOrder() {
    if (checkout != null) {
      if (currentStep == 2) {
        setIsUpdating(true);
        checkout.shipping_address = selectedAddress;
        checkout.billing_address = selectedAddress;
        updateCheckout(checkout!).then((r) => {
          if (r.data) {
            setCheckout(r.data);
            const updatedCheckout = {
              ...r.data,
              lines: r.data.lines,
            };

            setCustomizeCheckout(updatedCheckout);
          }
          showPaymentOption?.call("");
          setIsUpdating(false);
        });
      } else if (currentStep == 3) {
        setIsUpdating(true);
        const res = await initializeRazorpay();

        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }

        // Make API call to the serverless API
        checkout.payment_mode = selectedPayment == "cod" ? "COD" : "RAZORPAY";
        await updateCheckout(checkout);
        const data =
          checkout.payment_mode == "COD"
            ? await checkoutToOrder()
            : await makePayment();
        if (data.status) {
          if (
            data.data?.razorpay_order_id == null &&
            checkout.payment_mode == "COD"
          ) {
            updateSuccess(
              checkout?.discount_data?.discount_amount,
              checkout?.plan,
              checkout?.can_upgrade_to_pro,
              checkout?.user_name
            );
            clearCart();
            //setCartItemCount(0);

            router.push("/order-success");
            return;
          } else {
            let options = {
              key: process.env.RAZORPAY_KEY,
              order_id: data.data?.razorpay_order_id,
              description: "Payment for Zoozle",
              handler: function (response: any) {
                if (response.razorpay_payment_id) {
                  captureRazorpayPayment(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature
                  );
                }
              },
              prefill: {
                name: checkout.user_name,
                email: checkout.user_email,
                contact: checkout.user_mobile,
              },
            };
            // @ts-ignore
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsUpdating(false);
          }
        }
      }
    }
  }

  function captureRazorpayPayment(
    paymentId: string,
    orderId: string,
    signature: string
  ) {
    capturePayment(paymentId, orderId, signature).then((response) => {
      if (response.status) {
        updateSuccess(
          checkout?.discount_data?.discount_amount,
          checkout?.plan,
          checkout?.can_upgrade_to_pro,
          checkout?.user_name
        );
        clearCart();
        //setCartItemCount(0);
        router.push("/order-success");
      }
    });
  }

  const { isMicroSite } = useSiteData();

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col w-full md:hidden">
        <div className="py-4 text-[#1a1c1e] text-sm">
          <p className="font-medium">
            PRICE DETAILS{" "}
            <span>
              ({checkout?.lines?.length} Product
              {+(checkout?.lines?.length ?? "0") > 1 ? "s" : ""})
            </span>
          </p>
          <hr className="my-2" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>
                Price ({checkout?.lines?.length} item
                {+(checkout?.lines?.length ?? "0") > 1 ? "s" : ""})
              </p>
              <span className="text-base font-medium">
                {" "}
                ₹{checkout?.discount_data?.before_discount_amount}
              </span>
            </div>
            {checkout?.is_new_buyer && !isMicroSite && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ZenclubConfirmationCheckbox
                    save={"₹".concat(
                      checkout?.discount_data?.discount_amount?.toString() ?? ""
                    )}
                  />
                  <p className="mx-3">ZEN club (15 days free trial)</p>
                  <div className="rounded-full bg-[#FFDCC3] p-[5px] cursor-pointer">
                    <ZenclubInfoDialog />
                  </div>
                </div>
                <span className="text-[#008F17] font-medium">Free</span>
              </div>
            )}

            {!isMicroSite && (
              <div
                className={`flex justify-between ${
                  (checkout?.discount_data?.discount_amount ?? 0) > 0
                    ? ""
                    : "line-through"
                } flex justify-between`}
              >
                <p>Member Incentive</p>
                <span className="text-[#008F17] font-medium">
                  -₹
                  {checkout?.discount_data?.maybe_buyer_can_receive_discount ===
                  0
                    ? Math.floor(checkout?.discount_data?.discount_amount)
                    : Math.floor(
                        checkout?.discount_data
                          ?.maybe_buyer_can_receive_discount ?? 0
                      )}
                </span>
              </div>
            )}
            <div
              className={`${
                (checkout?.discount_data?.shipping_charges ?? 0) > 0
                  ? "flex justify-between"
                  : "hidden"
              } `}
            >
              <p>Shipping Charges</p>
              <span className="font-medium">
                ₹{checkout?.discount_data?.shipping_charges}
              </span>
            </div>
            {(checkout?.plan_price_with_gst ?? 0) > 0 && (
              <div className="flex justify-between">
                <p>
                  {checkout?.plan_name}{" "}
                  <span className="mlt-2 text-[10px]">(inclusive GST)</span>
                </p>
                <span className="font-medium">
                  ₹{checkout?.plan_price_with_gst}
                </span>
              </div>
            )}
            <div className="flex justify-between mt-5 py-3 border-t border-b">
              <p className="font-medium">Amount Payable</p>
              <span className="font-medium">
                ₹{checkout?.discount_data?.after_discount_amount}
              </span>
            </div>
            {currentStep != 3 && (
              <div className=" fixed bottom-0 left-0 flex md:hidden justify-center  w-full  bg-white flex-col">
                {showCoupon &&
                  !isMicroSite &&
                  checkout?.discount_data &&
                  checkout?.discount_data?.discount_amount > 0 && (
                    <p
                      className={`bg-[#008f17] text-white text-[12px] w-full px-4 text-medium py-1 flex justify-center`}
                    >
                      You saved ₹
                      {Math.floor(checkout?.discount_data?.discount_amount)} on
                      this product with Zen Club Membership
                    </p>
                  )}
                {(checkout?.discount_data?.discount_amount ?? 0) <= 0 &&
                  !isMicroSite && (
                    <p
                      className={`bg-red-400 text-white text-[12px] w-full px-4 text-medium py-1 flex justify-center`}
                    >
                      {(checkout?.zen_club_plans?.length ?? 0) > 0
                        ? "Select Zen Club membership to save ₹"
                        : "Select Zen Club free trial to save ₹"}
                      {
                        checkout?.discount_data
                          ?.maybe_buyer_can_receive_discount
                      }
                    </p>
                  )}

                <div className="flex gap-4 my-3 px-4">
                  <div className="flex flex-col w-1/2">
                    {!isMicroSite && (
                      <div className="flex items-center">
                        <div className="relative w-[119px] h-[20px] mr-4">
                          <Image
                            src="/svg/member-price.svg"
                            fill
                            className={`h-auto ${
                              (checkout?.discount_data?.discount_amount ?? 0) <=
                              0
                                ? "opacity-25"
                                : ""
                            }`}
                            alt="member price"
                            objectFit="contain"
                          />
                        </div>
                        <span
                          className={`${
                            (checkout?.discount_data?.discount_amount ?? 0) <= 0
                              ? "line-through"
                              : ""
                          }`}
                        >
                          ₹
                          {(checkout?.discount_data?.after_discount_amount ??
                            0) -
                            (checkout?.discount_data
                              ?.maybe_buyer_can_receive_discount ?? 0)}
                        </span>
                      </div>
                    )}
                    <span
                      className={`${
                        !isMicroSite &&
                        (checkout?.discount_data?.discount_amount ?? 0) > 0
                          ? "line-through"
                          : ""
                      }`}
                    >
                      Total amount ₹
                      {checkout?.discount_data?.before_discount_amount}
                    </span>
                  </div>
                  {isUpdating ? (
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : checkout?.lines?.find(
                      (e) =>
                        e.product_data?.is_customizable == true &&
                        (e.custom_images == null ||
                          e.custom_images?.paths?.length == 0) &&
                        (e.custom_text == null || e.custom_text?.length == 0)
                    ) == null ? (
                    <Button
                      type="submit"
                      className="rounded-full bg-[#6a4fa3] h-fit w-[90%] active:!opacity-100 focus:!opacity-100"
                      placeholder=""
                      disabled={editAddress}
                      onClick={placeOrder}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Proceed
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full bg-[#6a4fa3] h-fit w-[90%] active:!opacity-100 focus:!opacity-100"
                      placeholder=""
                      onClick={() =>
                        setShowCustomizeDialog(!showCustomizeDialog)
                      }
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      disabled={
                        currentStep == 3 &&
                        selectedPayment === "cod" &&
                        !checkout?.lines?.every((r) => r.is_cod_accepted)
                      }
                    >
                      customize
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {currentStep === 3 &&
          bottomPlaceOrderCTA(
            checkout,
            currentStep,
            selectedPayment,
            acceptTermsAndCondition,
            showCustomizeDialog,
            placeOrder,
            setShowCustomizeDialog,
            setAcceptTermsAndCondition,
            isMicroSite,
            editAddress,
            isUpdating
          )}
      </div>
      {/* Desktop */}
      <div className="hidden md:block ">
        {checkout?.discount_data &&
          checkout?.discount_data?.discount_amount > 0 &&
          !isMicroSite && (
            <p className="rounded-t-lg bg-[#008f17] text-white text-[15px] text-center text-medium py-2">
              You saved ₹{Math.floor(checkout?.discount_data?.discount_amount)}{" "}
              on this product with Zen Club Membership
            </p>
          )}
        <div className="p-4  text-[#1a1c1e] text-sm">
          <p className="font-medium">
            PRICE DETAILS{" "}
            <span>
              ({checkout?.lines?.length} Product
              {+(checkout?.lines?.length ?? "0") > 1 ? "s" : ""})
            </span>
          </p>
          <hr className="my-2" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>
                Price ({checkout?.lines?.length} item
                {+(checkout?.lines?.length ?? "0") > 1 ? "s" : ""})
              </p>
              <span className="text-base font-medium">
                ₹{checkout?.discount_data?.before_discount_amount}
              </span>
            </div>
            {checkout?.is_new_buyer && !isMicroSite && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ZenclubConfirmationCheckbox
                    save={"₹".concat(
                      checkout?.discount_data?.discount_amount?.toString() ?? ""
                    )}
                  />

                  <p className="mx-3">ZEN club (15 days free trial)</p>

                  <div className="rounded-full bg-[#FFDCC3] p-[5px] cursor-pointer">
                    <ZenclubInfoDialog />
                  </div>
                </div>
                <span className="text-[#008F17] font-medium">Free</span>
              </div>
            )}
            {!isMicroSite && (
              <div
                className={`${
                  (checkout?.discount_data?.discount_amount ?? 0) > 0
                    ? ""
                    : "line-through"
                } flex justify-between`}
              >
                <p>Member Incentive</p>
                <span className="text-[#008F17] font-medium">
                  -₹
                  {checkout?.discount_data?.maybe_buyer_can_receive_discount ===
                  0
                    ? Math.floor(checkout?.discount_data?.discount_amount)
                    : Math.floor(
                        checkout?.discount_data
                          ?.maybe_buyer_can_receive_discount ?? 0
                      )}
                </span>
              </div>
            )}
            {checkout?.discount_data &&
              +checkout?.discount_data?.shipping_charges > 0 && (
                <div className="flex justify-between pt-2">
                  <p>Shipping charges</p>
                  <span className="font-medium">
                    ₹{+checkout?.discount_data?.shipping_charges}
                  </span>
                </div>
              )}
            {(checkout?.plan_price_with_gst ?? 0) > 0 && (
              <div className="flex justify-between pt-2">
                <p>
                  {checkout?.plan_name}{" "}
                  <span className="mlt-2 text-[10px]">(inclusive GST)</span>
                </p>
                <span className="font-medium">
                  ₹{checkout?.plan_price_with_gst}
                </span>
              </div>
            )}
            <div className="flex justify-between mt-5 py-3 border-t border-b">
              <p className="font-medium">Amount Payable</p>
              <span className="font-medium">
                ₹{checkout?.discount_data?.after_discount_amount}
              </span>
            </div>
            {
              <div className="my-4">
                {currentStep == 3 && (
                  <>
                    {checkout?.lines?.some(
                      (line) => line.is_deliverable === false
                    ) && (
                      <span className="text-red-500 md:text-[14px] text-[13px] mt-2">
                        Some items in your cart are not deliverable to your PIN
                        code.
                      </span>
                    )}

                    <div className="flex items-end mb-5">
                      <Checkbox
                        onChange={() =>
                          setAcceptTermsAndCondition(!acceptTermsAndCondition)
                        }
                        defaultChecked
                        crossOrigin=""
                        name=""
                        ripple={false}
                        className="h-5 w-5 p-0 rounded-md  checked:bg-[#6A4FA1] transition-all hover:scale-105 hover:before:opacity-0"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <div className="text-xs font-normal items-start text-[#1a1c1e]">
                        I accept the{" "}
                        <Link
                          href="/buyer-terms-and-conditions"
                          className="underline"
                        >
                          Terms & Conditions
                        </Link>
                        ,{" "}
                        <Link href="/privacy-policy" className="underline">
                          Privacy Policy
                        </Link>
                        ,
                        {+(checkout?.plan ?? "0") > 0 && !isMicroSite && (
                          <Link
                            href="/zen-club-membership-agreement"
                            className="underline text-[#6a4fa3]"
                          >
                            Zen Club Membership Agreement
                          </Link>
                        )}{" "}
                        and{" "}
                        <Link
                          href="/end-user-license-agreement"
                          className="underline"
                        >
                          End User License Agreement
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {selectedAddress != null && (
                  <div>
                    {isUpdating ? (
                      <div className="flex justify-center">
                        <div
                          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      </div>
                    ) : checkout?.lines?.find(
                        (e) =>
                          e.product_data?.is_customizable == true &&
                          (e.custom_images == null ||
                            e.custom_images?.paths?.length == 0) &&
                          (e.custom_text == null || e.custom_text?.length == 0)
                      ) == null ? (
                      <Button
                        className="bg-[#6A4FA3] text-white rounded-full my-2 w-[90%] flex justify-center mx-auto active:!opacity-100 focus:!opacity-100"
                        placeholder=""
                        onClick={() => placeOrder()}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        disabled={
                          editAddress ||
                          (currentStep === 3 &&
                            ((selectedPayment === "cod" &&
                              !checkout?.lines?.every(
                                (r) => r.is_cod_accepted
                              )) ||
                              checkout?.can_make_payment == false)) ||
                          !acceptTermsAndCondition
                        }
                      >
                        {currentStep === 2
                          ? "Proceed"
                          : `Pay ₹
                          ${
                            selectedPayment === "cod" &&
                            checkout?.plan_price_with_gst > 0
                              ? checkout?.plan_price_with_gst
                              : checkout?.discount_data?.after_discount_amount
                          }
                          ${
                            selectedPayment === "cod" &&
                            checkout?.plan_price_with_gst <= 0
                              ? " on delivery"
                              : selectedPayment === "cod" &&
                                checkout?.plan_price_with_gst > 0
                              ? "now & proceed"
                              : " "
                          }`}
                      </Button>
                    ) : (
                      <Button
                        className="rounded-full w-full bg-[#6A4FA1] active:!opacity-100 focus:!opacity-100"
                        placeholder=""
                        onClick={() =>
                          setShowCustomizeDialog(!showCustomizeDialog)
                        }
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        disabled={
                          currentStep == 3 &&
                          selectedPayment === "cod" &&
                          !checkout?.lines?.every((r) => r.is_cod_accepted)
                        }
                      >
                        customize
                      </Button>
                    )}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

function bottomPlaceOrderCTA(
  checkout: CheckoutModel | null,
  currentStep: number,
  selectedPayment: string,
  acceptTermsAndCondition: boolean,
  showCustomizeDialog: boolean,
  placeOrder: () => Promise<void>,
  setShowCustomizeDialog: (value: boolean) => void,
  setAcceptTermsAndCondition: (value: boolean) => void,
  isMicroSite: boolean,
  editAddress: boolean,
  isUpdating: boolean
): React.ReactNode {
  return (
    <div className="fixed bottom-0 left-0 flex md:hidden items-center w-full bg-white flex-col">
      {checkout?.discount_data &&
        checkout?.discount_data?.discount_amount > 0 &&
        !isMicroSite && (
          <p className=" bg-[#008f17] text-white text-[12px] w-full px-4 text-medium py-1">
            You saved ₹{checkout?.discount_data?.discount_amount} on this
            product with Zen Club Membership
          </p>
        )}
      {currentStep == 3 &&
        checkout?.lines?.some((line) => line.is_deliverable === false) && (
          <span className="text-red-500 md:text-[14px] text-[13px] mt-2">
            Some items in your cart are not deliverable to your PIN code.
          </span>
        )}
      <div className="flex items-end">
        <Checkbox
          onChange={() => setAcceptTermsAndCondition(!acceptTermsAndCondition)}
          defaultChecked
          crossOrigin=""
          name=""
          ripple={false}
          className="h-5 w-5 p-0 rounded-md  checked:bg-[#6A4FA1] transition-all hover:scale-105 hover:before:opacity-0"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <div className="text-xs font-normal items-start text-[#1a1c1e]">
          I accept the{" "}
          <Link href="/buyer-terms-and-conditions" className="underline">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          ,
          {+(checkout?.plan ?? "0") > 0 && !isMicroSite && (
            <Link
              href="/zen-club-membership-agreement"
              className="underline text-[#6a4fa3]"
            >
              Zen Club Membership Agreement
            </Link>
          )}{" "}
          and{" "}
          <Link href="/end-user-license-agreement" className="underline">
            End User License Agreement
          </Link>
        </div>
      </div>
      {isUpdating ? (
        <div className="flex justify-center">
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : checkout?.lines?.find(
          (e) =>
            e.product_data?.is_customizable == true &&
            (e.custom_images == null || e.custom_images?.paths?.length == 0) &&
            (e.custom_text == null || e.custom_text?.length == 0)
        ) == null ? (
        <Button
          className="bg-[#6A4FA3] text-white rounded-full my-2 w-[90%] active:!opacity-100 focus:!opacity-100"
          placeholder=""
          onClick={() => placeOrder()}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          disabled={
            editAddress ||
            (currentStep === 3 &&
              ((selectedPayment === "cod" &&
                !checkout?.lines?.every((r) => r.is_cod_accepted)) ||
                checkout?.can_make_payment == false)) ||
            !acceptTermsAndCondition
          }
        >
          {currentStep === 2
            ? "Proceed"
            : `Pay ₹
  ${
    selectedPayment === "cod" && checkout?.plan_price_with_gst > 0
      ? checkout?.plan_price_with_gst
      : checkout?.discount_data?.after_discount_amount
  }
  ${
    selectedPayment === "cod" && checkout?.plan_price_with_gst <= 0
      ? " on delivery"
      : selectedPayment === "cod" && checkout?.plan_price_with_gst > 0
      ? "now & proceed"
      : " "
  }`}
        </Button>
      ) : (
        <Button
          className="rounded-full w-full bg-[#6A4FA1] active:!opacity-100 focus:!opacity-100"
          placeholder=""
          onClick={() => setShowCustomizeDialog(!showCustomizeDialog)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          disabled={
            currentStep == 3 &&
            selectedPayment === "cod" &&
            !checkout?.lines?.every((r) => r.is_cod_accepted)
          }
        >
          customize
        </Button>
      )}
    </div>
  );
}

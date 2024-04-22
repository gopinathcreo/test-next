"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Line } from "@/src/providers/models/checkout_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import {
  decrementQuantity,
  deleteLine,
  incrementQuantity,
  updateCheckout,
} from "@/src/providers/api_provider";
import { useCart } from "@/src/providers/cart_context";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { Dialog } from "@mui/material";
import { useSiteData } from "@/src/providers/site_data_context";
import { useRouter } from "next/navigation";

interface CartMenuProps {
  currentStep: number;
}

const CartItem = ({ line }: { line: Line }) => {
  const router = useRouter();
  const { selectedPayment, setSelectedPayment } = useCart();
  const { isMicroSite } = useSiteData();
  const {
    checkout,
    setCheckout,
    showCustomizeDialog,
    setShowCustomizeDialog,
    currentStep,
  } = useCart();

  const [openDeleteProdConfirmationDialog, setDeleteProdConfirmationDialog] =
    useState(false);
  const [showQuantExceedError, setShowQuantExceedError] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (showQuantExceedError) {
      setOpacity(1);
      setTimeout(() => {
        setOpacity(0);
      }, 5000); // starts fading out after 3 seconds
    }
  }, [showQuantExceedError]);

  const deleteProd = async (lineId: number) => {
    if (checkout) {
      const updatedLines = checkout.lines?.filter(
        (line: any) => line.id !== lineId
      );
      const updatedCheckout = {
        ...checkout,
        lines: updatedLines,
      };
      const patchRes = await updateCheckout(updatedCheckout);
      if (patchRes.data) {
        setCheckout(patchRes.data);
        if (patchRes.data?.lines?.length === 0) {
          router.push("/");
        }
      }
    }
  };

  async function updateQuantity(quantity: any, line: Line) {
    if (quantity == -1 && line.quantity == 1) return;

    if (checkout) {
      const product = checkout.lines?.find((x: any) => x.id == line.id);
      const updatedQuant = quantity == -1 ? -1 : 1;
      console.log(product?.stock_data?.quantity);

      if (
        product?.quantity &&
        product?.stock_data?.quantity &&
        +product?.quantity + updatedQuant > +product?.stock_data?.quantity
      ) {
        setShowQuantExceedError(true);
        setTimeout(() => {
          setShowQuantExceedError(false);
        }, 6000);
        return;
      }
      if (product?.quantity) {
        product.quantity += updatedQuant;
        const updatedCheckout = {
          ...checkout,
          lines: checkout.lines?.map((item: any) =>
            item.id === line.id ? product : item
          ),
        };
        const patchRes = await updateCheckout(updatedCheckout);
        if (patchRes.data) {
          setCheckout(patchRes.data);
        }
      }
    }
  }

  async function removeItem() {
    let lineResponse = await deleteLine(line.id!);
    if (lineResponse.status) {
      checkout!.lines = checkout?.lines?.filter((l) => l.id != line.id);
      if (checkout != null) {
        setCheckout({ ...checkout });
      }
    }
  }

  return (
    <div
      className={`${currentStep === 1 ? "w-[80vw]" : ""
        }  flex flex-col items-start gap-2 md:border-t py-3 px-2 pb-2 md:bg-[#F9F9FC] h-fit rounded-xl  shadow-[0px_1px_3px_1px_rgba(0_0_0_0.15),0px_1px_2px_0px_rgba(0_0_0_0.30)] border md:border-none md:w-auto`}
    >
      <div className="flex gap-2">
        <Link href={`/product/${line.product_slug}/?v=${line.product_variant_data?.id}`}>
          <div className="w-[123px] h-[192px] bg-white md:bg-[#F9F9FC] rounded-md flex-shrink-0 relative">
            <Image
              src={getImageUrl(
                line.product_variant_data?.images?.preview ??
                line.product_data?.images?.preview ??
                ""
              )}
              fill
              className="w-full rounded-md"
              objectFit="contain"
              alt="cart image"
            />
          </div>
        </Link>
        <div className="flex flex-grow flex-col text-[#101828] space-y-3">
          <Link href={`/product/${line.product_slug}/?v=${line.product_variant_data?.id}`}>
            <span className="text-xs line-clamp-2">
              {line.product_variant_data?.name}
            </span>
          </Link>

          <div className="flex items-center">
            <span className="font-medium mr-4">Quantity</span>
            <Image
              src="/svg/reducequantity.svg"
              alt="increase"
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => updateQuantity(-1, line)}
            />
            <span className="text-lg mx-2 cursor-default">{line.quantity}</span>
            <Image
              src="/svg/addquantity.svg"
              alt="increase"
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => updateQuantity(1, line)}
            />
          </div>
          <div className="flex gap-2 text-sm md:text-base">
            <span className="font-medium">
              ₹{Math.ceil(+(line.stock_price ?? "0"))}
            </span>
            {line.product_variant_data?.max_price &&
              line.stock_price != line.product_variant_data?.max_price && (Math.floor(
                ((+line.product_variant_data?.max_price -
                  +line.stock_price!) /
                  +line?.product_variant_data?.max_price) *
                100
              ) > 3) && (
                <span className="line-through text-sm">
                  {Math.ceil(+line.product_variant_data?.max_price)}
                </span>
              )}
            {line.stock_price &&
              line.product_variant_data?.max_price &&
              line.stock_price != line.product_variant_data?.max_price && (Math.floor(
                ((+line.product_variant_data?.max_price -
                  +line.stock_price) /
                  +line?.product_variant_data?.max_price) *
                100
              ) > 3) && (
                <span className="text-[#904D00]">
                  -{Math.floor(
                    ((+line.product_variant_data?.max_price -
                      +line.stock_price) /
                      +line?.product_variant_data?.max_price) *
                    100
                  )}%

                </span>
              )}
          </div>

          {!isMicroSite &&
            ((checkout?.discount_data?.discount_amount ?? 0) > 0 ||
              checkout?.user == null) && (
              <div className="flex items-center">
                <div className="relative w-[112px] h-[20px] mr-1">
                  <Image
                    src="https://zoozle.in/assets/svg/member-price.svg"
                    fill
                    className="h-auto"
                    alt="member price"
                    objectFit="contain"
                  />
                </div>

                <span className="font-medium">
                  ₹
                  {Math.round(
                    +(line.stock_price ?? 0) -
                    +Math.floor(+(line.discount_amount ?? "0"))
                  )}
                </span>
              </div>
            )}
          {(checkout?.discount_data?.discount_amount ?? 0) <= 0 &&
            !isMicroSite &&
            checkout?.user != null && (
              <div className="flex items-center">
                <div className="relative w-[112px] h-[20px] mr-1 opacity-35">
                  <Image
                    src="https://zoozle.in/assets/svg/member-price.svg"
                    fill
                    className="h-auto"
                    alt="member price"
                    objectFit="contain"
                  />
                </div>

                <span className="font-medium line-through">
                  ₹
                  {Math.round(
                    +(line.stock_price ?? 0) -
                    +Math.floor(+(line.discount_amount ?? "0"))
                  )}
                </span>
              </div>
            )}

          {line.product_data?.is_customizable && (
            <p className="text-[11px] font-medium text-[#400010] bg-[#ffd9dc] p-2">
              Customisable Product
            </p>
          )}
        </div>
      </div>

      {line?.custom_images?.paths?.length > 0 && (
        <div className="relative size-28">
          <Image
            src={`${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_URL
              }${encodeURIComponent(line?.custom_images.paths[0])}?alt=media`}
            alt="custom image"
            fill
            objectFit="contain"
          />
        </div>
      )}
      {line?.custom_text && (
        <input
          className="focus:outline-none rounded-md shadow-md border border-[#ccc] w-full my-2 p-2"
          placeholder="Enter custom text"
          readOnly
          value={line.custom_text}
        />
      )}
      {(line?.custom_images?.paths?.length || line?.custom_text) && (
        <Button
          className="text-[#6A4FA1] rounded-full border-[#73777f]"
          variant="outlined"
          placeholder=""
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
          onClick={() => {
            setShowCustomizeDialog(!showCustomizeDialog);
          }}
        >
          Edit
        </Button>
      )}
      <Image
        className="self-end cursor-pointer"
        src="/svg/deleted.svg"
        width={24}
        height={24}
        onClick={() =>
          setDeleteProdConfirmationDialog(!openDeleteProdConfirmationDialog)
        }
        alt={"delete icon"}
      />
      {showQuantExceedError && (
        <span
          style={{ opacity }}
          className="text-sm text-red-700 font-medium transition-opacity duration-1000 mt"
        >
          Required quantity not available in stock
        </span>
      )}
      <Dialog
        open={openDeleteProdConfirmationDialog}
        onClose={() =>
          setDeleteProdConfirmationDialog(!openDeleteProdConfirmationDialog)
        }
      >
        <div className="p-4 w-fit">
          <p className="">Are you sure?</p>
          <div className="flex gap-4 mt-2">
            <Button
              variant="filled"
              placeholder=""
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="text-[#6a4fa3] rounded-md bg-gray-300"
              onClick={() => deleteProd(line.id!)}
            >
              yes
            </Button>
            <Button
              variant="filled"
              placeholder=""
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="bg-[#6a4fa3] rounded-md text-white"
              onClick={() =>
                setDeleteProdConfirmationDialog(
                  !openDeleteProdConfirmationDialog
                )
              }
            >
              No
            </Button>
          </div>
        </div>
      </Dialog>

      {selectedPayment === "cod" && line.is_cod_accepted === false && (
        <p className="text-red-500 md:text-[14px] text-[13px]  ">
          Some items in your cart are not available for COD
        </p>
      )}
    </div>
  );
};

export default CartItem;

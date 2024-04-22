import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Radio,
  Checkbox,
  Dialog,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import {
  CheckoutModel,
  ZenClubPlan,
} from "@/src/providers/models/checkout_model";
import { useCart } from "@/src/providers/cart_context";
import { updateCheckout } from "@/src/providers/api_provider";
import { GoDotFill } from "react-icons/go";
import { Divider } from "@mui/material";

interface ZenPlanProps {
  checkoutDetails: CheckoutModel | null;
  isPlan: boolean;
  planSelect: string;
  onPlanChange: (planId: string) => void;
}

const ZenPlan: React.FC<ZenPlanProps> = ({
  checkoutDetails,
  isPlan,
  planSelect,
  onPlanChange,
}) => {
  const { checkout, setCheckout, currentStep } = useCart();
  const [selectedPlan, setSelectedPlan] = React.useState<
    number | null | undefined
  >(null);

  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedPlan(
      checkout?.plan != null
        ? checkout?.plan
        : (checkout?.zen_club_plans?.length ?? 0) > 0
        ? checkout?.zen_club_plans![0].id
        : null
    );
  }, [checkout]);

  async function updatePlan(planId: number | null) {
    if (checkout != null) {
      if (checkout.plan && planId == null) {
        checkout.plan = null;
        setIsLoading(true);
        let checkoutResponse = await updateCheckout(checkout);
        if (checkoutResponse.status) {
          setCheckout(checkoutResponse.data!);
          setIsLoading(false);
          setShowDialog(false);
        }
      } else {
        checkout.plan = planId ?? selectedPlan;
        let checkoutResponse = await updateCheckout(checkout);
        if (checkoutResponse.status) {
          setCheckout(checkoutResponse.data!);
        }
      }
    }
  }

    return (
            (currentStep != 3 || checkout?.plan != null) && <>
                <div
                    className={` bg-gradient-to-r from-[#e9db9a] via-[#846e22] to-[#ffe993] shadow-sm mb-3 p-1 rounded-2xl ${
                        checkoutDetails?.can_upgrade_to_pro &&
                        checkoutDetails?.zen_club_plans?.length
                            ? ""
                            : "hidden"
                    }`}
                >
                    <div className={`bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-[#BD0041AD] via-black to-black m-[-2px] rounded-2xl`}>
                        <div className={` flex pt-2 justify-between `}>
                            <div
                                className={`col-span-8 h-10 px-1`}
                            >
                                <Image src="/svg/zoozle_membership.svg" alt="Zen Club" width={110} height={70}/>
                                
                            </div>
                            {currentStep != 3 && <div className="col-span-4 text-right pr-2">
                                <div
                                    onClick={
                                        checkout?.plan
                                            ? () => setShowDialog(true)
                                            : () => updatePlan(null)
                                    }
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={
                                            checkout?.plan
                                                ? "/svg/zenclub_select_checkbox.svg"
                                                : "/svg/zenclub_unselect_checkbox.svg"
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>}
                        </div>

                        <div
                            className={` ${checkout?.plan
                              ? "" : "opacity-50"} my-3 flex pl-4 justify-center items-center pb-1`}
                        >
                            <Image src={"/svg/discount_for_members.svg"} alt={""} width={180} height={120} />
                            
                            <div className="pl-3 text-[14px] text-[#b48d3b]  bg-gradient-to-r from-[#FFB783] to-[#FFB4A4] text-transparent bg-clip-text ">&quot;Enjoy benefits upto 18% off on all products with Club Membership.&quot;</div>

                        </div>

                      <Divider className="bg-[#730A2E] mx-4 mt-2"/>

                        <div
                            className={` ${checkout?.plan
                              ? "" : "opacity-50"} flex pb-2 px-1`}
                        >
                            {checkoutDetails?.zen_club_plans?.map(
                                (plan: ZenClubPlan, index: number) => (
                                    <>
                                        {(currentStep != 3 || selectedPlan === plan.id) &&
                                            <div
                                                key={index}
                                                onClick={
                                                    checkout?.plan && currentStep != 3 ? () => updatePlan(plan.id) : undefined
                                                }
                                                className="w-full px-2 pt-1 cursor-pointer flex justify-between"
                                            >
                                                <div className="flex items-start pt-1 ">
                                                    <img
                                                        src={
                                                            selectedPlan === plan.id
                                                                ? "/svg/zenclub_select_radio.svg"
                                                                : "/svg/zenclub_unselect_radio.svg"
                                                        }
                                                        alt=""
                                                        className="w-6"
                                                    />
                                                    <div className="md:text-[14px] text-[12px] font-medium text-[#8d9199] ml-2">
                                                        <div>{plan.name}</div>
                                                        <div className="text-[15px]">₹{Math.round(+plan.price)} {+plan.id == 18 ? "/ 1 Month" : "/ 1 Year"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </div>

          <Dialog
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            open={showDialog}
            handler={() => setShowDialog(false)}
            placeholder
            size="xs"
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                <p className="text-[#904D00] font-bold text-sm m-0">
                  ARE YOU SURE?
                </p>
              </div>
              <div className="mb-1" onClick={() => setShowDialog(false)}>
                <Image
                  src="/svg/close_icon.svg"
                  alt="Close icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <hr className="bg-[#73777F] h-px" />

            <div className="px-4 py-4">
              <div className="text-black">
                <p className="font-bold text-sm">
                  By opting out you will be losing exclusive benefits,
                  including:
                </p>
                <div className="p-2 space-y-2">
                  <div className="text-black text-base flex items-start gap-2">
                    <GoDotFill className="mt-[3px]" />
                    <p>
                      {"₹".concat(
                        checkout?.discount_data?.discount_amount?.toString() ??
                          ""
                      )}{" "}
                      <Image
                        className="inline"
                        src="/svg/member_incentive.svg"
                        width={100}
                        height={36}
                        alt="Member incentive"
                      />{" "}
                      <span>on your current purchase.</span>
                    </p>
                  </div>
                  <div className="text-black text-base flex items-start gap-1">
                    <GoDotFill className="mt-[3px]" />
                    <p>
                      <span>Up to 18% </span>
                      <Image
                        className="inline"
                        src="/svg/member_incentive.svg"
                        alt="Member incentive"
                        width={100}
                        height={36}
                      />{" "}
                      <span>on all purchases</span>
                    </p>
                  </div>
                </div>

                <p className="text-[#73777F] font-bold text-sm">
                  Your membership is your key to a world of savings & exclusive
                  perks.
                </p>
              </div>
            </div>

            <hr className="bg-[#73777F] h-px" />

            <div className="flex mt-3 px-4 pb-4 items-center">
              <div className="flex-1">
                {isLoading ? (
                  <button className="uppercase text-[#B81F1E] text-sm font-medium bg-transparent border-none">
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </button>
                ) : (
                  <button
                    className="uppercase text-[#B81F1E] text-sm font-medium bg-transparent border-none"
                    onClick={() => updatePlan(null)}
                  >
                    OPT-OUT ANYWAY
                  </button>
                )}
              </div>
              <div className="flex-1">
                <Button
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="btn rounded-full bg-[#6A4FA1] w-full uppercase text-white"
                  onClick={() => setShowDialog(false)}
                  placeholder
                >
                  SAVE{" "}
                  {"₹".concat(
                    Math.floor(
                      +(checkout?.discount_data?.discount_amount ?? "0")
                    ).toString()
                  )}
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      );
};

export default ZenPlan;

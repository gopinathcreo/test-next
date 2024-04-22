import { Button, Dialog } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useCart } from "@/src/providers/cart_context";
import { addPlan, removePlan } from "@/src/providers/api_provider";
import Image from "next/image";

interface ConfirmationCheckboxprops {
  save: string;
}

const ZenclubConfirmationCheckbox = ({ save }: ConfirmationCheckboxprops) => {
  const [isChecked, setIsChecked] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { checkout, setCheckout } = useCart();

  const updateFreePlan = () => {
    if (checkout?.is_new_buyer) {
      setIsLoading(true);
      if (checkout?.plan == null) {
        addPlan().then((response) => {
          setIsLoading(false);
          if (response.status) {
            setCheckout(response.data!);
          }
        });
      } else {
        removePlan().then((response) => {
          setIsLoading(false);
          if (response.status) {
            setCheckout(response.data!);
          }
          setShowDialog(false);
          setIsChecked(false);
        });
      }
    }
  };

  useEffect(() => {
    setIsChecked(checkout?.plan != null);
  }, [checkout]);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setShowDialog(true);
    } else {
      updateFreePlan();
    }
  };

  const onOptOut = () => {
    updateFreePlan();
  };

  return (
    <>
      {isLoading ? (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <div className="flex relative">
          <input
            className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-indigo-500 checked:border-indigo-500 checked:before:bg-indigo-500 !text-[#1a1c1e] !text-sm !p-0"
            id=":r0:"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      )}
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
              By opting out you will be losing exclusive benefits, including:
            </p>
            <div className="p-2 space-y-2">
              <div className="text-black text-base flex items-start gap-2">
                <GoDotFill className="mt-[3px]" />
                <p>
                  {save}{" "}
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
                onClick={onOptOut}
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
              SAVE {save}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ZenclubConfirmationCheckbox;

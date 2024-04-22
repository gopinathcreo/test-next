"use client";
import LoginMain from "@/src/components/login";
import { useCart } from "@/src/providers/cart_context";
import { buySubscription, capturePayment, createPlan, subscriptions } from "@/src/providers/api_provider";
import { Button,Dialog, DialogBody, DialogFooter, DialogHeader, Radio } from "@material-tailwind/react";
import { Jost } from "next/font/google";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/src/providers/models/api_response";
import { Subscription, subscriptionList } from "@/src/providers/models/subscription_model";
const jost = Jost({ subsets: ["latin"] });

function ZenClub() {
  const [loginDialog, setLoginDialog] = useState(null);
  const [size, setSize] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState("radio1"); 
  const handlePlanRadio = (radioValue: SetStateAction<string>) => {
    setSelectedRadio(radioValue); 
  };
  const [alreadyMemberDialog, setAlreadyMember] = useState(null);
  const [successDialog, setSuccessDialog] = useState(null);
  const handleOpenPlans = (value:any) => setSize(value);
  const handleLoginOpen = (value:any) => setLoginDialog(value);
  const handleSuccessOpen = (value:any) => setSuccessDialog(value);
  const handleAlreadyMember = (value:any) => setAlreadyMember(value);
   const {isLoggedIn} = useCart();
   const router = useRouter();


  const checkMember = async () => {
    const response = await subscriptions();
    if (
      isLoggedIn &&
      response?.data?.results[0]?.status !== "active"
    ) {
      handleOpenPlans("lg");
    } else if (isLoggedIn && response.data?.results[0]?.status == "active") {
      handleAlreadyMember("lg");
    } else {
      handleLoginOpen("lg");
    }
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
  
   
 let response: ApiResponse<Subscription>;
 const becomeMember = async (Id: number) => {
   response = await buySubscription(Id);
  const res = await initializeRazorpay();
  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }
  var options = {
    key: process.env.RAZORPAY_KEY,
    order_id: response.data?.razorpay_order_id,
    description: "Payment for Paid Plan",
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
      namecontact: response.data?.razorpay_order_id,
    },
  };
  const paymentObject = await new (window as any).Razorpay(options);
  paymentObject.open();
 };

 function captureRazorpayPayment(
  paymentId: string,
  orderId: string,
  signature: string
) {
  createPlan(response?.data?.id ?? 0, paymentId, orderId, signature).then(
    (response) => {
      if (response.status) {
        handleSuccessOpen("lg");
      }
    }
  );
}
  return (
    <div className="bg-[#131416]">
      <div className="flex justify-center md:w-full w-full h-[200px]">
        <img
          className=""
          src="/svg/membership-logo.svg"
          alt="membership logo"
        />{" "}
      </div>
      <div className="flex justify-center items-center py-8">
        <img className="md:w-max w-16" src="/svg/start-divider.svg"></img>
        <h2 className="md:px-8 md:text-4xl pl-2 text-[22px] font-[500] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text  md:tracking-[22px] tracking-[12px14px]">
          BENEFITS
        </h2>
        <img
          className="w-16 md:w-max"
          src="/svg/end-divider.svg"
          width={273}
          height={70}
          alt="end divider"
        ></img>
      </div>
      <div className="md:flex block md:items-center md:justify-center md:px-4 px-4 md:gap-10 md:space-y-0 space-y-7">
      <div className="flex items-center justify-center md:px-3 my-2">
          <div className="container md:size-12 size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-2">
            <img
              className="flex items-center justify-center"
              src="/svg/percent-icon.svg"
              alt="percent icon"
            />{" "}
          </div>
          <p className="text-white md:w-96 w-80 px-4 md:text-lg md:text-[24px] text-[14px]">
          Save upto 18% on all your purchases.{" "}
          </p>
        </div>
        <div className="flex items-center justify-center md:px-3 my-2">
          <div className="container md:size-12 size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-2">
            <img
              className="flex items-center justify-center"
              src="/svg/store-icon.svg"
              alt="membership logo"
            />{" "}
          </div>

          <p className="text-white md:w-96 w-80 px-4 md:text-lg md:text-[24px] text-[14px]">
            Become a reseller of 4000+ products and earn commission on every
            sale.{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center md:py-6 py-4">
        <hr className="md:w-40 w-10 h-px my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>

        <h1 className="md:px-8 px-3 md:text-4xl text-[20px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text  md:tracking-[22px] tracking-[8px]">
          HOW IT WORKS
        </h1>
        <hr className="md:w-40 w-10 h-px my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
      </div>
      <div>
        <div className="md:columns-2 columns-1 md:flex md:justify-center">
          <div className="flex items-center mx-0 md:hidden md:px-45 px-4">
            <div className="container size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-2">
              <img
                className="flex items-center justify-center"
                src="/svg/percent-icon.svg"
                alt="membership logo"
              />{" "}
            </div>
            <p className="text-white w-80 px-4 md:text-[28px] text-[14px]">
              Save upto 18% on all your purchases
            </p>
          </div>
          <div className="px-3">
            <img src="/svg/bag-image.svg" alt="bag image" width={500} />{" "}
          </div>
          <div className="md:w-[530px] md:px-2 px-4">
            <div className="items-center pt-10 mx-0 md:flex hidden py-4">
              <div className="container md:size-12 size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-2">
                <img
                  className="flex items-center justify-center"
                  src="/svg/percent-icon.svg"
                  alt="membership logo"
                />{" "}
              </div>
              <p className="text-white  pl-3  md:text-[28px]">
                Save upto 18% on all your purchases
              </p>
            </div>
            <div className="md:text-lg">
            <ul className="text-white list-image-[url(/svg/list-icon.svg)] list md:px-4 px-8 md:text-[22px] text-[14px] md:space-y-4 mt-3">
                <li className="pb-2">
                  <p className="px-4">
                    This DSLR Camera Backpack by Mobius costs ₹2,700{" "}
                    <del>₹4,495</del>{" "}
                    <span className="text-[#FFB2BA]">39% Off</span>
                  </p>
                </li>
                <li className="py-2">
                  <p className="px-4">Member Price is ₹2,247</p>
                </li>
                <li className="py-2">
                  <p className="px-4">
                    You only pay ₹2,247 and save ₹453 instantly
                  </p>
                </li>
                <li className="py-2">
                  <p className="px-4">
                    This savings of ₹453 is the Member Incentive
                  </p>
                </li>
              </ul>
              <p className="text-[#8D9199] py-3 text-justify md:text-[27px] text-[14px]">
                This is purely an illustration to help you understand the
                concept.
              </p>
              <p className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text md:text-[24px] text-[16px]">
                You can save upto 18% on all your purchases
              </p>
              <hr className="h-px my-6 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
              <p className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text md:text-[24px] text-sm">
                How does Member Price work?
              </p>
              <p className="text-white text-justify md:text-[24px] text-[14px] md:py-3">
                We pass on the entire commission we earn to our members, except
                the incidental charges of 3%. Ex – If we earn Rs 100 on a sale
                of a product worth 500 we keep Rs 3 and pass on Rs 97 as price
                benefit to our members and the member pays Rs 403 instead of Rs
                500.
              </p>

              <p className="text-white text-justify md:text-[24px] text-[14px] md:py-2 pt-5">
                Zoozle does not sell refurbished, damaged or expired goods.
              </p>
              <hr className="h-px my-5 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
              <div
                onClick={checkMember}
                className="bg-gradient-to-r h-12 from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] md:w-[400px] rounded-full justify-center items-center md:flex hidden cursor-pointer"
              >
                <div className="flex justify-center items-center rounded-full h-11 md:w-[410px] mx-0.5 bg-[#131416]">
                  <span className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text">
                    START SAVING NOW
                  </span>
                </div>
              </div>
              <hr className=" md:flex hidden h-px my-5 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
            </div>
          </div>
        </div>
        <hr className="bg-[#73777F] w-2/3[1040px] mx-auto md:flex hidden"></hr>
        <div className="md:columns-2 md:flex md:justify-center columns-1">
          <div className="md:hidden flex px-4">
            <div className="container md:size-12 size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-2">
              <img
                className="flex items-center justify-center"
                src="/svg/store-icon.svg"
                alt="membership logo"
              />{" "}
            </div>
            <p className="text-white w-80 px-4 md:text-lg text-sm">
              Become a reseller and earn commission on every sale.
            </p>
          </div>
          <div className="px-3">
          <img src="/svg/mobile-image.svg" alt="bagmobile image" width={500} />{" "}
          </div>
          <div className="md:w-[500px]">
          <div className="items-center pt-10 md:flex hidden">
              <div className="container md:w-14 md:h-11 size-10 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-md p-1">
                <img
                  className="flex items-center justify-center"
                  src="/svg/store-icon.svg"
                  alt="membership logo"
                />{" "}
              </div>
              <p className="text-white  pl-3 text-[24px]">
Become a reseller and earn commission on every sale.              </p>
            </div>
            <div className="md:py-10 py-0 px-2">
              <p className="text-white md:text-[28px] text-[14px] text-justify">
                Start your own e-commerce store in less than 3 minutes. Choose
                from over 4000 products to sell, on your own e-commerce
                platform, logistics taken care of, get customer support and
                payment gateway.{" "}
              </p>

              <hr className="md:flex hidden h-px my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>

              <div
                onClick={checkMember 
                }
                className="md:flex hidden bg-gradient-to-r h-12 from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] w-[400px] rounded-full justify-center items-center cursor-pointer "
              >                <div className="flex justify-center items-center rounded-full h-11 md:w-[410px] mx-0.5 bg-[#131416]">
                  <span className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text">
                    BECOME A MEMBER
                  </span>
                </div>
              </div>

              <hr className="md:flex hidden h-px my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
            </div>
          </div>
        </div>
        <hr className="bg-[#73777F] w-[1000px] mx-auto md:flex hidden"></hr>
        <div className="flex justify-center items-center">
          <hr className="md:w-40 w-[70px] h-px bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>

          <h1 className="md:px-6 px-1 md:text-2xl text-[14px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text  md:tracking-[10px] tracking-[2px]">
            POCKET FRIENDLY PLANS
          </h1>
          <hr className="md:w-44 w-[70px] h-px my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
        </div>
        <div className="block md:flex md:justify-center">
        <div
            onClick={() => handlePlanRadio("radio1")}
            className="p-0.5 rounded-2xl  mx-3 md:text-lg text-[14px] font-medium bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993]"
          >
             <div className="container bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-2xl  md:w-max h-full">
              <div className="flex justify-end">
                <div className="bg-[#BD0041] text-white md:text-sm text-[11px] py-2 px-4 rounded-tr-2xl rounded-bl-2xl">
                  <p>BEST VALUE</p>
                </div>
              </div>
              <div className="flex items-center mt-0 pb-1">
                <p className="md:px-4 px-4 md:text-lg text-[14px]">Zen Club Annual</p>
                
              </div>
              <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
              <div className="flex">
                <div className="grid grid-cols-2 divide-x divide-[#846E22]">
                  <div className="py-2 px-4">
                    <p>Validity</p>
                    <p>1 Year</p>
                  </div>
                  <div className="py-2 px-2">
                    <p>Total plan amount</p>
                    <p>
                      ₹999 <span className="bg-[#FFB77D]"> Save 15%</span>
                    </p>
                  </div>
                </div>
              </div>

              <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0 "></hr>
              <ol className="list-image-[url(/svg/list-icon.svg)] px-8 ">
                <li className="">
                  <p>Save upto 18% on all your purchases for 1 year.</p>
                </li>
                <li className="pb-2">
                  <p>Your own E - Commerce Store</p>
                </li>
              </ol>
            </div>
          </div>
          <br className="md:hidden visible"></br>
          <div
            onClick={() => handlePlanRadio("radio2")}
            className="p-0.5 rounded-2xl bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] mx-3 md:text-lg text-[14px] font-medium"
          >            <div className="container bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-2xl  md:w-max h-max  ">
            <div className="flex items-center pt-5">
            <p className="md:px-4 px-4 pt-4 pb-1">Zen Club Monthly</p>
              </div>
               <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
              <div className="flex">
                <div className="grid grid-cols-2 divide-x divide-[#846E22]">
                  <div className="md:py-2 py-1 px-4">
                    <p>Validity</p>
                    <p>1 Month</p>
                  </div>
                  <div className="md:py-2 px-2">
                    <p>Total plan amount</p>
                    <p>₹99</p>
                  </div>
                </div>
              </div>

              <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
              <ol className="list-none list-image-[url(/svg/list-icon.svg)] px-8">
                <li className="md:pt-1">
                  <p>Save upto 18% on all your purchases for 1 month.</p>
                </li>
                <li className="pb-2">
                  <p>Your own E - Commerce Store</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <br></br>
        <hr className="md:flex hidden bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] w-[1000px] mx-auto border-0 h-px"></hr>
        <br></br>
        <div className="md:flex hidden justify-center">
          <Button onClick={checkMember
            }
            className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-full py-3 px-4 w-64 text-sm text-black font-medium"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}>
          BECOME A MEMBER
          </Button>
        </div>
        <div className="md:flex hidden justify-center py-4">
        <Link
            href={"/"}
            className="bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text rounded-full py-3  text-[14px] font-semibold "
          > EXPLORE PRODUCTS
          </Link>
        </div>
      </div>
      <br className="md:hidden visible"></br>
      <br className="md:hidden visible"></br>

      <div className="md:hidden fixed bottom-0 w-full h-24 bg-opacity-25 backdrop-filter backdrop-blur-3xl rounded-t-xl flex justify-center items-center">
        <div className="bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] rounded-full w-80 flex justify-center items-center h-10 px-2 mx-10">
          <p className="text-center">
            {" "}
            <Button
              onClick={checkMember}
              className="w-[316px] my-4  py-2 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#E2BF59]  tracking-wide rounded-full focus:outline-none"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >              <p className=" text-black text-sm font-medium">
                {" "}
                BECOME A MEMBER
              </p>
            </Button>
          </p>
        </div>

        </div>
      <Dialog
        className="bg-[#1E2022] rounded-3xl "
        open={size === "lg"}
        size={size || "md"}
        handler={handleOpenPlans}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogBody
          className="bg-[#1E2022] rounded-3xl border-dashed border-2  "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex justify-center items-center md:py-4">
            <hr className="md:w-40 w-[15px] h-px bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
            <h1 className="md:px-6 px-1 md:text-2xl text-[22px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text  md:tracking-[10px] tracking-[2px]">
              CHOOSE A PLAN
            </h1>
            <hr className="md:w-44 w-[15px] h-px md:my-8 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] border-0"></hr>
          </div>
          <div className="block md:flex md:justify-center md:py-8 py-4">
            <div
              onClick={() => handlePlanRadio("radio1")}
              className={`${
                selectedRadio == "radio1"
                  ? "scale-110 shadow-cyan-500/50"
                  : "scale-100"} font-[500] text-black md:hover:scale-110 hover:scale-105 hover:shadow-lg p-0.5 rounded-2xl  md:mx-6 md:text-lg  bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993]  md:w-[426px] md:h-[211px]`}
            >
              <div className="container bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-2xl  md:w-[423px] md:h-[207px]">
                <div className="flex justify-end">
                  <div className="bg-[#BD0041] text-white md:text-sm text-[14px] py-1 px-4 rounded-tr-2xl rounded-bl-2xl">
                    <p>BEST VALUE</p>
                  </div>
                </div>
                <div className="flex items-center mt-0">
                  <div className="">
                    <Radio
                      color="gray"
                      name={""}
                      value={""}
                      checked={selectedRadio === "radio1"}
                      className="border-black border-2 "
                      crossOrigin=""
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />{" "}
                  </div>{" "}
                  <p className="md:px-4 px-4 md:text-[17px] text-[14px]">Zen Club Annual</p>
                                  </div>
                <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
                <div className="flex">
                  <div className="grid grid-cols-2 divide-x divide-[#846E22] md:text-[15px] text-[14px]">
                    <div className="px-4">
                      <p>Validity</p>
                      <p>1 Year</p>
                    </div>
                    <div className="px-2">
                      <p>Total plan amount</p>            <p>
                        ₹999 <span className="bg-[#FFB77D]"> Save 15%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0 "></hr>
                <ol className="list-image-[url(/svg/list-icon.svg)] px-8 md:text-[16px] text-[14px]">
                  <li className="">
                    <p>Save upto 18% on all your purchases for 1 year.</p>
                  </li>
                  <li className="">
                    <p>Your own E - Commerce Store</p>
                  </li>
                </ol>
              </div>
            </div>
            <br className="md:hidden visible"></br>
            <div
              onClick={() => handlePlanRadio("radio2")}
              className={`${
                selectedRadio == "radio2"
                  ? "scale-110 shadow-[0_35px_60px_-15px_rgba(255, 200, 0)]"
                  : "scale-100"} text-black md:hover:scale-110 hover:scale-105  hover:shadow-lg p-0.5 rounded-2xl bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] md:mx-6 md:text-lg md:text-[14px] font-[500] md:w-[426px] w-full md:h-[211px]`}
            >
              <div className="container bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] rounded-2xl  md:w-[423px] w-full md:h-[207px]  ">
                <div className="flex items-center">
                  <Radio
                    color="gray"
                    name={""}
                    value={""}
                    checked={selectedRadio === "radio2"}
                    className="border-black border-2 "
                    crossOrigin=""
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />{" "}
                     <p className="md:px-0 px-4 md:text-[17px] text-[14px]">Zen Club Monthly</p>
                </div>
                <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
                <div className="flex">
                  <div className="grid grid-cols-2 divide-x divide-[#846E22]">
                    <div className="px-4 md:text-[16px] text-[14px]">
                      <p>Validity</p>
                      <p>1 Month</p>
                    </div>
                    <div className="md:py-1 px-2 md:text-[15px] text-[14px]">
                      <p>Total plan amount</p>
                      <p>₹99</p>
                    </div>
                  </div>
                </div>

                <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>
                <ol className="list-none list-image-[url(/svg/list-icon.svg)] px-8 md:py-2 md:text-[16px] text-[14px]">
                  <li className="">
                    <p>Save upto 18% on all your purchases for 1 month.</p>
                  </li>
                  <li className="pb-2">
                    <p>Your own E - Commerce Store</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <hr className="my-4 md:flex hidden bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] w-[1000px] mx-auto border-0 h-px"></hr>
          <div className="flex justify-center py-4">
          <Button
              onClick={() => becomeMember(selectedRadio === "radio1" ? 19 : 18)}
              className="md:bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] bg-[#D2BBFF] rounded-full py-3 px-4 w-72 text-sm text-black font-medium"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {selectedRadio === "radio1"
                ? "BECOME A MEMBER - ₹999/YEAR"
                : "BECOME A MEMBER - ₹99/MONTH"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        className="bg-[#1E2022] rounded-3xl "
        open={loginDialog === "lg"}
        size={loginDialog || "md"}
        handler={handleLoginOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
       
        <DialogBody
          className="bg-[#1E2022] rounded-3xl border-dashed border-2 flex justify-center h-[500px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="md:w-max w-full flex items-center">
            <LoginMain page="zenClub" onSuccess={()=> handleLoginOpen(null)} redirectTo={()=>handleOpenPlans("lg")} />
          </div>
   

</DialogBody>
</Dialog>
<Dialog
        className="bg-[#1E2022] rounded-3xl "
        open={successDialog === "lg"}
        size={successDialog || "md"}
        handler={handleSuccessOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogBody
          className="bg-[#1E2022] rounded-3xl border-dashed border-2  "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="block md:py-8">
           <div className="flex justify-center">
           <img className=""
            src="/svg/zenclub.svg"
            alt="custom image"
          />
           </div>
                <h1 className="md:px-6 px-1 md:text-[35px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] flex justify-center text-transparent bg-clip-text">
                <span className="font-semibold">Congratulations!</span> You are now a Zen club member          </h1>
                
         <div className="flex justify-center">
         <Button
              onClick={()=>router.push("/")}
              className=" bg-[#D2BBFF] rounded-full py-3 px-4 w-72 text-sm text-black font-medium flex justify-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
             EXPLORE
            </Button>
         </div>
          </div>
          
        </DialogBody>
      </Dialog>
      <Dialog
        className="bg-[#1E2022] rounded-3xl "
        open={alreadyMemberDialog === "lg"}
        size={alreadyMemberDialog || "md"}
        handler={handleAlreadyMember}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogBody
          className="bg-[#1E2022] rounded-3xl border-dashed border-2  "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="block md:py-8">
            <div className="flex justify-center">
              <img
                className=""
                src="/svg/zenclub.svg"
                alt="custom image"
                width={300}
                height={134}
              />
            </div>
            <div className="bg-gradient-to-r md:rounded-2xl rounded-md py-0.5 my-8 from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] md:w-[802px] flex justify-center mx-auto">
              <div className="bg-[#333538] md:rounded-2xl md:w-[800px] rounded-md md:mx-0 mx-0.5  ">
                <h1 className="md:px-6 px-11 py-3 md:text-[35px] text-[15px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] text-transparent bg-clip-text md:flex justify-center">
                   You are already a club member{" "}
                </h1>
              </div>
            </div>
            <hr className="h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] border-0"></hr>

            <div className="flex justify-center py-5">
              <Button
                onClick={() =>router.push("/")}
                className=" bg-[#D2BBFF] rounded-full py-3 px-4 w-72 text-sm text-black font-medium flex justify-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                EXPLORE
              </Button>
            </div>
          </div>
          
        </DialogBody>
      </Dialog>
    </div>
  );
}
export default ZenClub;

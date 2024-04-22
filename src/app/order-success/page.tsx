"use client";
import Link from "next/link";

import Image from "next/image";
import { useCart } from "@/src/providers/cart_context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCheckoutDetails } from "@/src/providers/api_provider";
import { CheckoutModel } from "@/src/providers/models/checkout_model";
import { useSiteData } from "@/src/providers/site_data_context";

function OrderSuccess({ params }: { params: { order_id: string } }) {
    const { success, userDetail} = useCart();
    const router = useRouter();

    useEffect(() => {

        if(success.can_upgrade==null && success.commission_earned==undefined && success.plan==null && success.user_name==null){
           // router.push("/orders");
        }
    },);

  const { isMicroSite } = useSiteData();

  return (
    <div className=" relative flex flex-col  bg-[#6A4FA3]  px-5 py-5 sm:p-14 justify-center align-middle">
      <div className=" items-center flex flex-col justify-items-center pt-3 pb-8">
        <div className="absolute top-50 left-50 z-[1000] ">
          <Image
            src="/gif/success.gif"
            alt="Success Image"
            width={200}
            height={200}
          ></Image>
        </div>
        <ul className="w-fit flex items-center justify-items-center flex-col list-none mt-10">
          <li className="text-center text-5xl sm:text-6xl font-normal text-white w-fit">
            Woohoo!
          </li>
          <li className="text-center text-xl  font-normal text-[#8D9199] sm:text-white  w-fit sm:px-20">
            Your order has been placed and shipping confirmation is
          </li>
          <li className="text-center text-xl  font-normal text-[#8D9199] sm:text-white  w-fit sm:px-20">
            coming soon.
          </li>
        </ul>
      </div>

      {/*if user got membership in current order */}
      <div className="block sm:hidden h-1 bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] "></div>
      {success?.can_upgrade && success?.plan && (
        <div className="flex flex-row justify-center align-middle mt-10 sm:p-5 mb-10">
          <div className="w-full justify-self-center  sm:w-1/2  rounded-xl bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] p-px  ">
            <div className="h-full w-full rounded-xl bg-[#1E2022]">
              <div className="pb-1 mb-1">
                <div className="flex flex-col py-3 sm:py-5">
                  <div className="group relative text-sm sm:text-xl font-semibold bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent mx-3 sm:mx-5 mb-0 w-fit">
                    ZEN CLUB
                    <span className="absolute inset-x-0 -bottom-0 h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] "></span>
                  </div>
                  <div className="group relative   text-[6px] sm:text-[8px] font-medium tracking-[3px] sm:tracking-[5px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent mx-3 sm:mx-5 mt-1 w-fit">
                    MEMBERSHIP
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] "></span>
                  </div>
                </div>
              </div>
              <div className="block sm:hidden bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993]  h-px w-full"></div>
              <div className="hidden sm:block bg-[#43474E] h-px w-full"></div>
              {success?.commission_earned && (
                <>
                  <ul className="list-none sm:text-base text-xs font-medium sm:p-5 p-3 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent">
                    <li className="mb-4 sm:mb-0">
                      Congratulations {userDetail?.first_name}!
                    </li>
                    <li className="mb-4 sm:mb-0">
                      You are now a Club member & you have saved ₹
                      {success?.commission_earned} on this purchase.
                    </li>
                    <li>
                      Continue shopping and save upto 18% on all of your
                      purchases.{" "}
                    </li>
                  </ul>
                  <div className="hidden sm:block bg-[#43474E] h-px w-full"></div>
                </>
              )}
              <div className="flex flex-row  align-middle justify-center p-5">
                <Link href={`/orders/`}>
                  <button className="justify-self-center w-fit text-white bg-[#6A4FA3] sm:bg-[#D2BBFF]  sm:text-[#3B1D71] font-medium py-2  uppercase rounded-full text-sm px-6 sm:px-5 ">
                    CONTINUE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*if user already have membership before */}
      {!success?.can_upgrade && !success?.plan && !isMicroSite && (
        <div className="flex flex-row justify-center align-middle mt-10 sm:p-5 mb-10">
          <div className="w-full justify-self-center  sm:w-1/2  rounded-xl bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] p-px  ">
            <div className="h-full w-full rounded-xl bg-[#1E2022]">
              <div className="pb-1 mb-1">
                <div className="flex flex-col py-3 sm:py-5">
                  <div className="group relative text-sm sm:text-xl font-semibold bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent mx-3 sm:mx-5 mb-0 w-fit">
                    ZEN CLUB
                    <span className="absolute inset-x-0 -bottom-0 h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] "></span>
                  </div>
                  <div className="group relative   text-[6px] sm:text-[8px] font-medium tracking-[3px] sm:tracking-[5px] bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent mx-3 sm:mx-5 mt-1 w-fit">
                    MEMBERSHIP
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993] "></span>
                  </div>
                </div>
              </div>
              <div className="block sm:hidden bg-gradient-to-r from-[#E9DB9A] via-[#846E22] to-[#FFE993]  h-px w-full"></div>
              <div className="hidden sm:block bg-[#43474E] h-px w-full"></div>
              {success?.commission_earned && (
                <>
                  {" "}
                  <ul className="list-none sm:text-base text-xs font-medium sm:p-5 p-3 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] via-[#FEF2A0] to-[#CA9A2E] bg-clip-text text-transparent">
                    <li className="mb-4 sm:mb-0">
                      Congratulations {userDetail?.first_name} !, as a Club Member
                      you have saved ₹{success?.commission_earned} on this
                      purchase.
                    </li>
                  </ul>
                  <div className="hidden sm:block bg-[#43474E] h-px w-full"></div>
                </>
              )}

              <div className="flex flex-row  align-middle justify-center p-5">
                <Link href={`/orders/`}>
                  <button className="justify-self-center w-fit text-white bg-[#6A4FA3] sm:bg-[#D2BBFF]  sm:text-[#3B1D71] font-medium py-2  uppercase rounded-full text-sm px-6 sm:px-5 ">
                    CONTINUE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMicroSite && (
        <div className="flex flex-row  align-middle justify-center p-5">
          <Link href={`/orders/`}>
            <button className="justify-self-center w-fit text-white bg-[#D2BBFF] sm:bg-[#D2BBFF]  sm:text-[#3B1D71] font-medium py-2  uppercase rounded-full text-sm px-6 sm:px-5 ">
              CONTINUE
            </button>
          </Link>
        </div>
      )}

      {/*if user dont have membership */}
      {success?.can_upgrade && !success?.plan && (
        <div className="flex justify-center align-middle mb-10">
          <div className="flex flex-col justify-items-center items-center p-5">
            <div className="text-center text-xl  font-normal text-[#8D9199] sm:text-white  w-fit sm:px-20 w-fit">
              Thank you and please continue shopping with us.
            </div>
            <Link href={`/orders/`} className="w-fit mt-3">
              <button className="justify-self-center w-fit text-white bg-[#6A4FA3] sm:bg-[#D2BBFF]  sm:text-[#3B1D71] font-medium py-2  uppercase rounded-full text-sm px-6 sm:px-5 ">
                CONTINUE
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;

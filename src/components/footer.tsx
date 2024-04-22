"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSiteData } from "../providers/site_data_context";
import { Divider } from "@mui/material";
import Image from "next/image";
import { router } from "next/client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";import LoginMain from "./login";
import { useCart } from "../providers/cart_context";
function FooterSection() {
  const [showHelpDropDown, setHelpDropDown] = useState(false);
  const [showSellerDropDown, setSellerDropDown] = useState(false);
  const [showZoozleDropDown, setZoozleDropDown] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { isMicroSite, siteName } = useSiteData();
  const router = useRouter();
  const handleOpen = () => setOpen(!open);
  const [isMobile, setIsMobile] = useState(false);
  const {isLoggedIn} = useCart();
 
  return (
    <footer className=" text-gray-600 body-font pt-0 md:pt-14 " id="footer">
      <Divider />
      <div className="bg-[#F9F9FC]">
        {isMicroSite && (
          <div className="bg-[#F9F9FC] w-full h-full mb-4 sm:mb-0 pb-4 sm:pb-0">
            <p className="flex justify-center text-[#1e2022] text-[21px] font-semibold pt-4">
              {siteName}
            </p>
            <p className="flex justify-center px-2 pb-10 text-[#677788] text-[14px] pt-1 items-center">
              <span className="text-[#677788] text-[14px] pt-px ">Powered by</span>
              <Image
                src="/svg/zoozle_logo.svg"
                alt="Zoozle Logo"
                className="px-2 w-[70px] "
                width={20}
                height={20}
              />
            </p>
          </div>
        )}
        {!isMicroSite && (
          <div>
            <div className="container px-5 py-10 mx-auto md:flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col justify-between  ">
              <div className="md:flex  md:justify-between md:w-full">
                <div className="container py-10 w-100 md:mr-14 md:mx-0 md:text-left">
                  <p className="flex title-font font-medium items-center md:justify-start  text-gray-900">
                    <span className="text-black font-bold">
                      Club Membership Benefits
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-black font-normal">
                    Enjoy Member - only features
                  </p>
                  <p className="mt-2 text-sm text-black font-normal">
                    Save upto 18% on all your purchases{" "}
                  </p>{" "}
                  <p className="mt-2 text-sm text-black font-normal">
                    Ability to become a reseller of 4000+ Zoozle’s products and
                    earn commission on every sale.{" "}
                  </p>
                  <button onClick={() => router.push("/zen-club")} className="mt-5 md:mb-0 rounded-full px-6 py-3 text-xs block bg-[#6A4FA3] text-white">
                    {" "}
                    <i className="fas fa-th-large"></i>
                    JOIN THE CLUB{" "}
                  </button>
                </div>
                <div className="md:hidden visible">
                  <div className="block w-64">
                    <span className="text-black font-bold">App</span>
                    <p className="mt-2 text-sm text-black font-normal">
                      Download the ZEN App for the best shopping experience
                    </p>
                  </div>

                  <div className="flex">
                    <Link href="https://apps.apple.com/in/app/zen-club/id1666812551">
                      <button
                        type="submit"
                        className="mr-2 flex ring-1 ring-[#73777F] mt-4 mb-5 rounded-full px-8 py-3 text-xs font-medium text-[#6A4FA3]"
                      >
                        <svg
                          className="mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 2 24 24"
                          color="black"
                        >
                          <path
                            fill="currentColor"
                            d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                          />
                        </svg>
                        APP STORE{" "}
                      </button>
                    </Link>
                    <Link href="https://play.google.com/store/apps/details?id=in.zoozle.entrepreneur">
                      <button
                        type="submit"
                        className="flex ring-1 ring-[#73777F] mt-4 mb-5 rounded-full px-8 py-3 text-xs mr-2 font-medium  text-[#6A4FA3]"
                      >
                        <svg
                          className="mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 2 24 24"
                          color="black"
                        >
                          <path
                            fill="currentColor"
                            d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32l-2.5-2.5l2.5-2.5zM6.05 2.66l10.76 6.22l-2.27 2.27z"
                          />
                        </svg>
                        PLAY STORE
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="container py-10">
                  <div className="[&_svg]:open:-rotate-180">
                    <div className="cursor-pointer list-none  gap-4">
                      <div
                        className="flex justify-between"
                        onClick={() => setZoozleDropDown(!showZoozleDropDown)}
                      >
                        <div className="text-black font-bold">Zoozle</div>
                        <div>
                          <Image src="/svg/footer_arrow.svg" alt="Arrow button" width={20} height={20} className="rotate-0 transform transition-all duration-300 md:hidden visible"></Image>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`md:block ${showZoozleDropDown ? "block" : "hidden"
                        } mt-2`}
                    >
                      {!isLoggedIn &&(
                        <p onClick={handleOpen} className="mt-2 text-sm text-black font-normal cursor-pointer">Log in</p>
                      )}
                      
                      <Link href="/about" target="blank">
                        {" "}
                        <p className="mt-2 text-sm text-black font-normal">About</p>
                      </Link>{" "}
                      <Link href="/faq" target="_blank">
                        <p className="mt-2 text-sm text-black font-normal">FAQ’s</p>
                      </Link>
                      <Link href="/buyer-terms-and-conditions" target="blank">
                        <p className="mt-2 text-sm text-black font-normal">
                          Buyer Terms & Conditions
                        </p>
                      </Link>
                      <Link href="/shipping-policy" target="blank">
                        <p className="mt-2 text-sm text-black font-normal">
                          Shipping Policy
                        </p>
                      </Link>
                    </div>{" "}
                  </div>
                </div>
                <hr className="md:hidden visible bg-[#C3C6CF] h-px"></hr>

                <div className="container py-10">
                  <div className="[&_svg]:open:-rotate-180">
                    <summary className="cursor-pointer list-none  gap-4">
                      <div
                        className="flex justify-between"
                        onClick={() => setSellerDropDown(!showSellerDropDown)}
                      >
                        <div className="text-black font-bold">For Seller</div>
                        <div>
                          <Image src="/svg/footer_arrow.svg" alt="Arrow button" width={20} height={20} className="rotate-0 transform transition-all duration-300 md:hidden visible"></Image>
                        </div>
                      </div>
                    </summary>
                    <div
                      className={`md:block ${showSellerDropDown ? "block" : "hidden"
                        } mt-2`}
                    >
                      {/* <Link href="">
                        <p className="mt-2 text-sm text-black font-normal">
                          Join now
                        </p>
                      </Link> */}
                      <Link href="/seller-terms-and-conditions" target="blank">
                        <p className="mt-2 text-sm text-black font-normal">
                          Seller Terms & Conditions
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr className="md:hidden visible bg-[#C3C6CF] h-px"></hr>

                <div className="container py-10">
                  <div className="[&_svg]:open:-rotate-180">
                    <div className="cursor-pointer list-none  gap-4">
                      <div
                        className="flex justify-between"
                        onClick={() => setHelpDropDown(!showHelpDropDown)}
                      >
                        <div className="text-black font-bold">Help</div>

                        <div>
                          <Image src="/svg/footer_arrow.svg" alt="Arrow button" width={20} height={20} className="rotate-0 transform transition-all duration-300 md:hidden visible"></Image>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`md:block  ${showHelpDropDown ? "block" : "hidden"
                        } mt-2`}
                    >
                      <div className="mt-2">
                        <Link
                          href="tel:+918045684305"
                          className="mt-2 text-sm text-black font-normal block"
                        >
                          Call: +91 8045684305
                        </Link>

                        <Link
                          href="mailto:letstalk@zoozle.in"
                          className="mt-2 text-sm text-black font-normal"
                        >
                          Email: letstalk@zoozle.in
                        </Link>
                        <br />
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <hr className="md:hidden visible bg-[#C3C6CF] h-px"></hr>
              </div>
            </div>
            <div className="md:flex md:justify-between block bg-[#F9F9FC] container  mx-auto sm:pb-0">
              <div className="px-5 md:visible">
                <div className="md:block md:w-64 md:visible hidden">
                  <span className="text-black font-bold">App</span>
                  <p className="mt-2 text-sm text-black font-normal">
                    Download the ZEN App for the best shopping experience
                  </p>
                </div>

                <div className="md:flex md:visible hidden">
                  <Link href="https://apps.apple.com/in/app/zen-club/id1666812551">
                    <button
                      type="submit"
                      className="mr-2 flex ring-1 ring-[#73777F] mt-4 mb-5 rounded-full px-8 py-3 text-xs font-medium text-[#6A4FA3]"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 2 24 24"
                        color="black"
                      >
                        <path
                          fill="currentColor"
                          d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                        />
                      </svg>
                      APP STORE{" "}
                    </button>
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=in.zoozle.entrepreneur">
                    <button
                      type="submit"
                      className="flex ring-1 ring-[#73777F] mt-4 mb-5 rounded-full px-8 py-3 text-xs mr-2 font-medium  text-[#6A4FA3]"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 2 24 24"
                        color="black"
                      >
                        <path
                          fill="currentColor"
                          d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32l-2.5-2.5l2.5-2.5zM6.05 2.66l10.76 6.22l-2.27 2.27z"
                        />
                      </svg>
                      PLAY STORE
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex md:mt-24 md:mr-6 md:mx-4 px-3">
                <Link href="https://www.facebook.com/zoozle.in/">
                  {" "}
                  <svg
                    className="ring-1 rounded-full ring-[#73777F] mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="-3 -4 30 30"
                    color="black"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                    />
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/zoozle_in/">
                  <svg
                    className="ring-1 rounded-full ring-[#73777F] mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="-3 -4 30 30"
                    color="black"
                  >
                    <path
                      fill="currentColor"
                      d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                    />
                  </svg>
                </Link>

                <Link href="https://www.youtube.com/channel/UCJqeIcDJNDsXEfqlGYaz7sQ">
                  {" "}
                  <svg
                    className="ring-1 rounded-full ring-[#73777F] mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="-3 -4 30 30"
                    color="black"
                  >
                    <path
                      fill="currentColor"
                      d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <hr className="md:flex hidden"></hr>

            <div className="container  flex  flex-col sm:flex-row  md:px-0 px-5 md:items-center bg-[#F9F9FC] mx-auto pt-2 pb-10 mb-10 sm:mb-0 sm:py-6">
              <p className="py-2  text-black text-xs md:text-center sm:text-left">
                © ZOOZLE TECH PRIVATE LIMITED 2023. All rights reserved.
              </p>
              <span className="md:inline-flex sm:ml-auto sm:mt-0 md:justify-center sm:justify-start text-black text-sm mr-16 mb-12 sm:mb-0">
                <Link href="/privacy-policy">
                  <p> Privacy policy</p>
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
      <Dialog
                  size={isMobile ? "xxl" : "xs"}
                  open={open}
                  handler={handleOpen}
                  placeholder
                  onPointerEnterCapture
                  onPointerLeaveCapture
                >
                 
                  <DialogBody
                    className="shadow-md"
                    placeholder
                    onPointerEnterCapture
                    onPointerLeaveCapture
                  >
                    <div>
                      <LoginMain onClose={handleOpen} />
                    </div>
                  </DialogBody>
                </Dialog>

    </footer>
  );
}

export default FooterSection;

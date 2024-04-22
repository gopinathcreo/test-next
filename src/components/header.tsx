"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchBarWithResults from "./search_bar";
import CategoryMenu from "./category_menu";
import { fetchCategories, logoutUser } from "@/src/providers/api_provider";
import CartBadge from "./cart_badge";
import { Divider } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { CategoryModel } from "@/src/providers/models/category";
import { useCart } from "../providers/cart_context";
import { useSiteData } from "../providers/site_data_context";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useMediaQuery } from "@mui/material";
import LoginMain from "./login";
import LoginForm from "./login_form";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../providers/firebase_provider";
import { LocalStorageProvider } from "../providers/local_storage_provider";
import { useRouter } from "next/navigation";

const Image = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => <img src={src} alt={alt} loading="lazy" className={className} />;

const HeaderBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<CategoryModel | undefined>();
  const { isLoggedIn, cartItemCount } = useCart();
  const { siteLogo, siteName, isMicroSite } = useSiteData();
  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
    fetchCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);
  const [showHeader, setShowHeader] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showZenClub, setShowZenClub] = useState(false);
  const pathname = usePathname();
  let auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowHeader(pathname != "/zen-club");
    setShowZenClub(pathname === "/");
    console.log(pathname, isMobile);
    if (pathname.startsWith("/product") && isMobile) {
      setShowCategories(false);
    } else if (pathname === "/checkout") {
      setShowCategories(false);
    } else if (pathname.startsWith("/collections") && isMobile) {
      setShowCategories(false);
    }  else if (pathname.startsWith("/seller") && isMobile) {
      setShowCategories(false);
    } else if (pathname.startsWith("/orders") ) {
      setShowCategories(false);
    } else if (
      pathname == "/privacy-policy" ||
      pathname == "/about" ||
      pathname == "/seller-terms-and-conditions" ||
      pathname == "/buyer-terms-and-conditions" ||
      pathname == "/end-user-license-agreement" ||
      pathname == "/seller-terms-and-conditions" ||
      pathname == "/nocart" ||
      pathname == "/faq" ||
      pathname == "/shipping-policy" ||
      pathname == "/zen-club-membership-agreement" ||
      pathname == "/order-success" 
  

    ) {
      setShowCategories(false);
    } else {
      setShowCategories(true);
    }
  }, [pathname, isMobile]);

  const logOut = async (event: any) => {
    setIsLoading(true);
    signOut(auth);
    await logoutUser();
    LocalStorageProvider.deleteToken();
    LocalStorageProvider.deleteCheckout();
    setIsLoading(false);
    if (pathname === "/") {
      location.reload();
    } else {
      location.href = "/";
    }
  };

  return (
    showHeader && (
      <div className="box-border relative sticky  top-0 z-50 flex flex-col w-full shrink-0 max-sm:w-full">
        {!isLoggedIn && !isMicroSite && showZenClub && (
          <Link href={"/zen-club"} className="bg-[url(/svg/black-bg.svg)] h-[34px] relative bg-no-repeat bg-cover flex items-center justify-center cursor-pointer">
            <div >
              <div className=" px-4  w-full flex justify-items-center">
                <h1 className="px-2 bg-gradient-to-r from-[#B57F12] via-[#E2BF59] to-[#FEF2A0] inline-block text-transparent bg-clip-text">
                  Save upto 18% on all your purchases
                </h1>
                <Image
                  src="/svg/right-arrow.svg"
                  alt="arrow"
                  className=""
                ></Image>
              </div>
            </div>
          </Link>
        )}
        <div
          className="xl:hidden flex-col bg-white border-b border-solid border-b-[color:var(--M3-sys-light-inverse-on-surface,#F0F0F4)] w-full max-md:flex max-sm:flex max-sm:w-full">
          <div className="flex flex-col w-full px-2 pt-6 ">
            <div className="flex justify-between w-full gap-5 px-3">
              {!isMicroSite && (
                <div className="my-auto aspect-[4.35] fill-blue-900 w-[77px]">
                  <Link href="/">
                    <Image
                      src="/svg/zoozle_logo.svg"
                      alt=""
                      className={""}
                    />
                  </Link>
                </div>
              )}
              {isMicroSite && (
                <div className="flex  items-center">
                  {siteLogo != "" && (
                    <div>
                      <div className="rounded-full">
                        <Link href="/">
                          <Image
                            className="w-[40px] h-[40px] rounded-full text-[#6a4fa3]"
                            src={siteLogo ?? ""}
                            alt="Rounded avatar"
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                  {siteLogo == "" && (
                    <Link href={"/"}>
                      <div
                        className="rounded-full bg-[#377dff1a] w-[40px] h-[40px] flex justify-center items-center">
                        <p className=" text-[#6a4fa3] font-semibold">
                          {siteName.substring(0, 1).toUpperCase()}
                        </p>
                      </div></Link>
                  )}

                  <Link href={"/"}>
                    <h2 className="text-[#6a4fa3] text-[16px] ml-2">
                      {siteName ?? ""}
                    </h2>
                  </Link>
                </div>
              )}

              <div className="flex gap-4">
                {!isLoggedIn && (
                  <div
                    className="relative w-6 aspect-square"
                    onClick={handleOpen}
                  >
                    <Image
                      src="/svg/before-login-profile-icon.svg"
                      alt=""
                      className={""}
                    />
                  </div>
                )}
                {isLoggedIn && (
                  <Menu>
                    <MenuHandler>
                      <div>
                        <Image
                          src="/svg/profile-icon.svg"
                          alt=""
                          className={"cursor-pointer"}
                        />
                      </div>
                    </MenuHandler>
                    <MenuList
                      className="shadow-md"
                      placeholder
                      onPointerEnterCapture
                      onPointerLeaveCapture
                    >
                      <div className="flex justify-center outline-none ">
                        <div className="block">
                          <Link href="/orders">
                            <button className="block px-3 py-4">
                              My orders
                            </button>
                          </Link>

                          <Button
                            onClick={logOut}
                            className=" py-3 px-4 bg-[#6a4fa3]  text-white text-sm !font-normal "
                            placeholder=""
                            onPointerEnterCapture
                            onPointerLeaveCapture
                          >
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
                              "Log Out"
                            )}
                          </Button>
                        </div>
                      </div>
                    </MenuList>
                  </Menu>
                )}
                <Link href={cartItemCount > 0 ? "/checkout" : "/nocart"}>
                  <div className="flex gap-0.5 justify-between items-center">
                    <div className="relative w-6 aspect-square">
                      <Image
                        src="/svg/cart-icon.svg"
                        alt=""
                        className={""}
                      />
                    </div>
                    <CartBadge />
                  </div>
                </Link>
                {/* {!isLoggedIn && (
                  <div className="relative w-6 aspect-square">
                    <Image
                      src="/svg/become-seller.svg"
                      alt=""
                      className={""}
                    />
                  </div>
                )} */}
              </div>
            </div>

            <SearchBarWithResults />
          </div>
        </div>
        <div className=" hidden xl:flex container mx-auto justify-center items-center self-stretch  w-full font-medium whitespace-nowrap bg-white  max-md:flex max-md:px-5 max-md:max-w-full max-sm:hidden max-sm:w-full">
          <div className="flex flex-row justify-center w-full gap-5 grow max-md:flex-wrap max-md:max-w-full">
            {!isMicroSite && (
              <div className="self-stretch my-auto max-w-full aspect-[4.17] w-[135px] relative">
                <Link href="/">
                  <Image
                    src="/svg/zoozle_logo.svg"
                    alt=""
                    className={""}
                  />
                </Link>
              </div>
            )}
            {isMicroSite && (
              <div className="flex  items-center">
                {siteLogo != "" && (
                  <div>
                    <div className="rounded-full">
                      <Link href="/">
                        <Image
                          className="w-[50px] h-[50px] rounded-full text-[#6a4fa3]"
                          src={siteLogo ?? ""}
                          alt="Rounded avatar"
                        />
                      </Link>
                    </div>
                  </div>
                )}
                {siteLogo == "" && (
                  <Link href={"/"}>
                    <div className="rounded-full bg-[#377dff1a] w-[50px] h-[50px] flex justify-center items-center">
                      <p className=" text-[#6a4fa3] font-semibold">
                        {siteName.substring(0, 1).toUpperCase()}
                      </p>
                    </div>
                  </Link>
                )}
                <Link href={"/"}>
                  <h2 className="text-[#677788] text-[20px] ml-2">
                    {siteName ?? ""}
                  </h2>
                </Link>
              </div>
            )}

            <SearchBarWithResults />
            <div className="flex self-stretch justify-between gap-5 my-auto text-sm leading-5 tracking-normal text-black">
              <div className="flex gap-0.5 justify-between text-center">
                {!isLoggedIn && (
                  <div className="flex cursor-pointer" onClick={handleOpen}>
                    <div className="relative w-6 aspect-square">
                      <Image
                        src="/svg/before-login-profile-icon.svg"
                        alt=""
                        className={""}
                      />
                    </div>
                    <div className="my-auto grow">Login</div>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="flex">
                    <Menu>
                      <MenuHandler>
                        <div>
                          <Image
                            src="/svg/profile-icon.svg"
                            alt=""
                            className={"cursor-pointer"}
                          />
                        </div>
                      </MenuHandler>
                      <MenuList
                        className="shadow-md"
                        placeholder
                        onPointerEnterCapture
                        onPointerLeaveCapture
                      >
                        <div className="flex justify-center outline-none ">
                          <div className="block">
                            <Link href="/orders">
                              <button className="block px-3 py-4">
                                My orders
                              </button>
                            </Link>

                            <Button
                              onClick={logOut}
                              className=" py-3 px-4 bg-[#6a4fa3]  text-white text-sm !font-normal "
                              placeholder=""
                              onPointerEnterCapture
                              onPointerLeaveCapture
                            >
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
                                "Log Out"
                              )}
                            </Button>
                          </div>
                        </div>
                      </MenuList>
                    </Menu>{" "}
                  </div>
                )}

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
              </div>
              <Link href={cartItemCount > 0 ? "/checkout" : "/nocart"}>
                <div className="flex gap-0.5 justify-between items-center">
                  <div className="relative w-6 aspect-square">
                    <Image
                      src="/svg/cart-icon.svg"
                      alt=""
                      className={""}
                    />
                  </div>
                  <div className="my-auto grow">Cart</div>
                  <CartBadge />
                </div>
              </Link>

              {/* {!isLoggedIn && (
                <div className="flex gap-0.5 justify-between text-center">
                  <div className="relative w-6 aspect-square">
                    <Image
                      src="/svg/become-seller.svg"
                      alt=""
                      className={""}
                    />
                  </div>
                  <div className="my-auto grow">Become a Seller</div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          {categories != undefined && showCategories && (
            <CategoryMenu categories={categories?.categories} />
          )}
        </div>
        <div className="max-md:max-w-full max-sm:hidden max-sm:w-full bg-[#F0F0F4]  ">
          <Divider sx={{ borderBottomWidth: 0.5 }} />
        </div>
      </div>
    )
  );
};

export default HeaderBar;

//!isLoggedIn &&

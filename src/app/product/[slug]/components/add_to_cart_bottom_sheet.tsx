"use client";
import { ProductModel } from "@/src/providers/models/product_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Drawer } from "@mui/material";
import { useCart } from "@/src/providers/cart_context";
import { useRouter } from "next/navigation";
import { addToCheckout } from "@/src/providers/api_provider";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSiteData } from "@/src/providers/site_data_context";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import * as React from 'react';
import { useContext } from "react";
import { ProductContext, ProductContextType } from "./product_page";

export function AddToCartBottomSheet({ product }: { product: ProductModel }) {
  let productContextType: ProductContextType | undefined = useContext(ProductContext);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { checkout, addToCart: addToCartCtx, isLoadingCheckout } = useCart();
  let [isAddingToCart, setIsAddingToCart] = useState(false);
  let [canUpgradeToPro, setCanUpgradeToPro] = useState<boolean|null|undefined>();
  const router = useRouter()
  const { isMicroSite } = useSiteData();
  const { isLoggedIn } = useCart()
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  interface State extends SnackbarOrigin {
    open: boolean;
  }
  useEffect(() => {
    setIsAddingToCart(isLoadingCheckout);

  }, [isLoadingCheckout]);
  const action = (
    <>   <div className="flex justify-items-center items-center rounded-2xl mx-2">
      <div className='flex justify-items-center items-center  mx-1 my-1'>
        <div className='w-1/2  rounded-full'>
          <div className='w-[60px] h-full'>
            <Image className='rounded-xl' src={getImageUrl(product?.variant?.images?.preview ?? product?.images?.preview)} alt="Product Image" width={1000} height={1000}></Image>
          </div>
        </div>
        <div className='px-3 whitespace-nowrap'>Added to cart</div>
      </div>
      <div className="ms-3 p-2" onClick={handleClose}>
        <Image
          src="/svg/close_icon.svg"
          alt="Close icon"
          className="cursor-pointer"
          width={20}
          height={20}
        ></Image>
      </div>
    </div>
    </>


  );

  async function addToCart() {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    let checkoutResponse = await addToCheckout(
      productContextType?.productQuantity ?? 1, // quantity
      product.variant.id, // variant_id
      product.variant.stock.id, // stock_id
      checkout
    );
    if (checkoutResponse.status) {
      const cartItems = checkoutResponse.data?.lines?.length ?? 0;
      addToCartCtx(checkoutResponse.data!, cartItems);
    }

    setCanUpgradeToPro(checkoutResponse?.data?.can_upgrade_to_pro??true)
    setIsAddingToCart(false);
    setShowBottomSheet(!showBottomSheet)
  }

  function redirectToCheckout() {
    router.push("/checkout");
  }

  return (
    <div className="container fixed w-[100%] bottom-0 bg-white shadow-2xl border-[1px] border-t-black border-l-black border-r-black backdrop-blur-[0.59] rounded-t-2xl overflow-hidden z-50 ">
      {!isLoggedIn && (Number(product?.variant?.stock?.reseller_commission) > 0) && !isMicroSite &&
        <div className=" font-medium text-sm text-center bg-[#FFD9DC] py-1 mb-2 ">Save ₹{Math.floor(+product?.variant?.stock?.reseller_commission)} with free membership on this product.</div>}
      {isLoggedIn && !isMicroSite && (Number(product?.variant?.stock?.reseller_commission) > 0) &&
        <div className=" font-medium text-sm text-center bg-[#008f17] py-1 mb-2 text-white">Save ₹{Math.floor(+product?.variant?.stock?.reseller_commission)} with Zen Club Membership on this product.</div>
      }

      <div className="flex items-center justify-between px-4 py-1">{/* border-t-[0.5px] border-black */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          action={action}
        />
        <div>
          {/*save line */}
          {!isMicroSite &&
            <div className="flex">
              <img
                className="w-[131px]"
                src="/svg/member-price.svg"
                alt="member-price"
              />
              <span className="ml-2 text-black">
                ₹
                {Math.ceil(Number(+product?.variant?.stock?.price -
                  +product?.variant?.stock?.reseller_commission))}
              </span>
            </div>}

          <div className="flex items-baseline space-x-2 my-3 font-medium ">
            <span className="text-[#1a1c1e] ">
              ₹{Math.ceil(Number(product?.variant?.stock?.price))}
            </span>
            {+product?.variant?.stock?.price < +product?.variant?.max_price && (Math.floor(+(((+product?.variant?.max_price - +product?.variant?.stock?.price) / +product?.variant?.max_price) * 100)) > 3) &&
              <span className="line-through text-[#43474e]">
                ₹{Math.ceil(+product?.variant?.max_price)}
              </span>
            }
            {(Math.floor(((+product?.variant?.max_price - +product?.variant?.stock?.price) / +product?.variant?.max_price) * 100)) > 3 &&
              <span className="text-[#904d00] font-normal">
                -
                {Math.floor(((+product?.variant?.max_price - +product?.variant?.stock?.price) / +product?.variant?.max_price) * 100)}
                %
              </span>
            }
          </div>
        </div>

        {checkout?.lines?.find(
          (line) => line.variant === product.variant.id
        ) ?
          <button
            onClick={() => redirectToCheckout()}
            className="bg-[#6a4fa3] w-fit text-white font-normal py-2 px-4 rounded-full uppercase hover:shadow-md text-sm"
          >
            Go to cart
          </button> :
          <button
            onClick={() => addToCart()}
            className="bg-[#6a4fa3] w-fit text-white font-normal py-2 px-4 rounded-full uppercase hover:shadow-md text-sm"
          >
            {isAddingToCart ? (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              "Add to cart"
            )}
          </button>}
        <Drawer
          className="rounded-t-2xl"
          anchor="bottom"
          open={showBottomSheet}
          onClose={() => setShowBottomSheet(!showBottomSheet)}
        >
          {addToCartPopUp(setShowBottomSheet, showBottomSheet, product, router, isMicroSite, canUpgradeToPro, isLoggedIn)}
        </Drawer>
      </div>
    </div>
  );
}

function Separator({ color = "black", height = 1 }) {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: height,
        border: "none",
      }}
    />
  );
}

function addToCartPopUp(
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>,
  showBottomSheet: boolean,
  product: ProductModel,
  router: AppRouterInstance,
  isItMicrosite: boolean,
  canUpgradeToPro: boolean |null |undefined,
  isLoggedIn: boolean
): React.ReactNode {
  function redirectToCheckout() {
    router.push("/checkout");
  }

  return (
    <div className=" w-[100%] bottom-0 bg-white  rounded-t-2xl py-4 justify-middle">
      <div className="flex flex-grow justify-between text-black mt-2 mb-3 px-2">
        <p>Product added to cart</p>
        <XMarkIcon
          strokeWidth={2.5}
          className="size-6 text-[24px] font-normal"
          onClick={() => setShowBottomSheet(!showBottomSheet)}
        ></XMarkIcon>
      </div>
      <Separator color="black" />
      <div className="flex flex-row space-x-1 mb-2 px-2 mt-2 ">
        <div className="w-1/3  rounded-xl h-[115px] overflow-hidden object-cover ">
          <Image
            className="w-[131px] "
            src={getImageUrl(product?.variant?.images?.preview)}
            width={500}
            height={500}
            alt="Product Image"
          />
        </div>
        <div className="w-2/3 px-3">
          <p className="text-sm font-medium mb-4">{product?.variant?.name}</p>
          <p className="text-base mb-1 ">
            Selling Price: ₹{Math.ceil(Number(product?.variant?.stock?.price))}{" "}
            {product?.variant?.stock?.price < product?.variant?.max_price &&
              <del>₹{Math.ceil(Number(product?.variant?.max_price))}</del>

            }

          </p>
          {!isItMicrosite && (
            <p className="text-base flex flex-row ">
              <img
                className="w-[131px]"
                src="/svg/member-price.svg"
                alt="member-price"
              />
              <span>
                ₹
                {Math.ceil(Number(+product?.variant?.stock?.price -
                  +product?.variant?.stock?.reseller_commission))}
              </span>
            </p>
          )}

        </div>
      </div>
      {!isItMicrosite && !isLoggedIn && (Number(product?.variant?.stock?.reseller_commission) > 0) && (
        <div className="text-sm font-medium bg-[#008f17] text-white align-middle justify-center text-center p-1">
          You saved ₹{Math.floor(Number(+product?.variant?.stock?.reseller_commission))} with free
          membership
        </div>
      )}
      {!isItMicrosite && isLoggedIn && (Number(product?.variant?.stock?.reseller_commission) > 0) && <>
        {canUpgradeToPro &&
          <div className="text-sm font-medium bg-[#008f17] text-white align-middle justify-center text-center p-1">
            You saved ₹{Math.floor(Number(+product?.variant?.stock?.reseller_commission))} with Free Membership
          </div>}
        {!canUpgradeToPro &&
          <div className="text-sm font-medium bg-[#008f17] text-white align-middle justify-center text-center p-1">
            You saved ₹{Math.floor(Number(+product?.variant?.stock?.reseller_commission))} with Zen Club Membership
          </div>
        }
      </>
      }
      {isItMicrosite &&   <Separator color="black" />}
      <div className="mt-3  flex flex-row align-middle  justify-between">
        <div className="w-1/2 flex align-middle justify-center ">
          <button onClick={() => setShowBottomSheet(false)} className="font-medium text-sm  text-[#6a4fa3] mt-2">
            CONTINUE SHOPPING
          </button>
        </div>
        <div className="w-1/2 flex justify-center align-middle">
          <button onClick={() => redirectToCheckout()} className="bg-[#6a4fa3] w-fit text-white font-normal py-2 px-4 rounded-full uppercase hover:shadow-md text-sm">
            GO TO CART
          </button>
        </div>
      </div>
    </div>
  );
}







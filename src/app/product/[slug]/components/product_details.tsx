"use client";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  ProductModel,
  WarehouseStock,
} from "@/src/providers/models/product_model";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { addToCheckout, createCheckout } from "@/src/providers/api_provider";
import { useCart } from "@/src/providers/cart_context";
import { useRouter } from "next/navigation";
import { useSiteData } from "@/src/providers/site_data_context";
import * as React from "react";
import { getImageUrl } from "@/src/utils/firebase_utils";
import { RWebShare } from "react-web-share";
import { pincodeCheck } from "@/src/providers/api_provider";
import { ProductContext, ProductContextType } from "./product_page";
import Rating from "@mui/material/Rating";
import { ReviewModel } from "@/src/providers/models/review_model";
import { fetchReviews } from "@/src/providers/api_provider";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";

export function ProductDetailsMobile({ product }: { product: ProductModel }) {
  const { checkout, addToCart: addToCartCtx, setCurrentStep } = useCart();
  let productContextType: ProductContextType | undefined =
    useContext(ProductContext);
  let [isBuyingNow, setIsBuyingNow] = useState(false);
  const router = useRouter();
  const { isMicroSite } = useSiteData();
  let highestQuantity: number;
  const [pincode, setPincode] = useState<string | undefined>();
  const [deliveryDateApiLoad, setDeliveryDateApiLoad] = useState<boolean>();
  const [deliveryDate, setDeliveryDate] = useState<string | undefined>("");
  const [deliveryErrorMsg, setDeliveryErrorMsg] = useState<string | undefined>(
    ""
  );
  const [showExceedError, setShowExceedError] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    // Regular expression to check for digits only
    const isNumeric = /^\d+$/.test(value);
    if (value == "") {
      setDeliveryDate("");
      setDeliveryErrorMsg("");
    }
    if (!isNumeric && value !== "") {
      setError("Please enter only numbers.");
    } else if (value.length > 6) {
      setError("Pincode should not exceed 6 digits.");
    } else {
      setPincode(value);
      setError("");
    }
  };
  const [url, setUrl] = useState("");
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  interface State extends SnackbarOrigin {
    open: boolean;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
    product.discount = 0;

    if (
      +product?.variant?.max_price &&
      +product?.variant?.stock?.price < +product?.variant?.max_price
    ) {
      product.discount = +(
        +product?.variant?.max_price - +product?.variant?.stock?.price
      ).toFixed(2);
    }
  }, []);

  {
    /*find max quantity */
  }
  function findMaxQuantityValue(
    product: ProductModel,
    array: WarehouseStock[]
  ) {
    highestQuantity = -Infinity;
    for (const obj of array) {
      if (obj.quantity > highestQuantity) {
        highestQuantity = obj.quantity;
      }
      return highestQuantity;
    }
  }

  {
    /*decrease quantity */
  }
  function decreaseQuantity() {
    if ((productContextType?.productQuantity ?? 0) > 1) {
      productContextType?.setProductQuantity(
        productContextType!.productQuantity - 1
      );
    }
    if (
      (productContextType?.productQuantity ?? 0) >
      (product?.variant?.stock?.quantity ?? 0)
    ) {
      setShowExceedError(true);
      setTimeout(() => {
        setShowExceedError(false);
      }, 2000);
    } else {
      setShowExceedError(false);
    }
  }

  {
    /*increase quantity */
  }
  function increaseQuantity() {
    if (
      (productContextType?.productQuantity ?? 0) <
      (product?.variant?.stock?.quantity ?? 0)
    ) {
      productContextType!.setProductQuantity(
        productContextType!.productQuantity + 1
      );
    } else {
      setShowExceedError(true);
    }
  }
  {
    /*pincode check*/
  }
  async function deliveryPincodeCheck() {
    let stock = product?.variant["stock"].id;
    setDeliveryDateApiLoad(true);
    let pincodeResponse = await pincodeCheck(pincode, stock);
    if (pincodeResponse?.status == true) {
      setDeliveryErrorMsg("");
      setDeliveryDate(pincodeResponse?.data?.edd_display);
      setDeliveryDateApiLoad(false);
    } else {
      setDeliveryDate("");
      setDeliveryErrorMsg(pincodeResponse?.response?.error);
      setDeliveryDateApiLoad(false);
    }
  }

  async function buyNow(product: ProductModel) {
    setIsBuyingNow(true);
    let checkoutResponse = await createCheckout(
      productContextType?.productQuantity ?? 1, // quantity
      product.variant.id, // variant_id
      product.variant.stock.id // stock_id
    );
    if (checkoutResponse.status) {
      if (LocalStorageProvider.isLoggedIn()) setCurrentStep(2);
      const cartItems = checkoutResponse.data?.lines?.length ?? 0;
      addToCartCtx(checkoutResponse.data!, cartItems);
    }
    setIsBuyingNow(false);
    router.push("/checkout");
  }

  return (
    <>
      <div className="flex items-baseline space-x-2 my-3 font-medium ">
        <span className="text-[#1a1c1e]">
          ₹{Math.ceil(Number(product?.variant?.stock?.price))}
        </span>
        {Math.floor(
          +(
            ((+product?.variant.max_price - +product.variant.stock.price) /
              +product.variant.max_price) *
            100
          )
        ) > 3 &&
          +product?.variant?.stock?.price < +product?.variant?.max_price && (
            <span className="line-through text-[#43474e]">
              ₹{Math.ceil(Number(product?.variant?.max_price))}
            </span>
          )}

        {Math.floor(
          +(
            ((+product?.variant.max_price - +product.variant.stock.price) /
              +product.variant.max_price) *
            100
          )
        ) > 3 && (
          <span className="text-[#904d00] font-normal">
            -
            {Math.floor(
              ((+product?.variant.max_price - +product.variant.stock.price) /
                +product.variant.max_price) *
                100
            )}
            %
          </span>
        )}
      </div>
      {!isMicroSite && (
        <div className="shadow-[0_1px_3px_1px_#00000026,0_1px_2px_#0000004d] rounded-xl p-2 px-3">
          <div className="flex">
            <Image
              className="w-[158px]"
              src="/svg/member-price.svg"
              alt="member-price"
              width={97}
              height={16}
            />
            <span className="text-[22px] ml-4 text-black">
              ₹
              {Math.ceil(
                +product.variant?.stock?.price -
                  +product.variant?.stock?.reseller_commission
              )}
            </span>
          </div>
          <ul className="text-sm my-3">
            <li className="flex gap-2">
              <Image
                src="/svg/bullet_point.svg"
                alt="Bullet point"
                width={6}
                height={6}
              ></Image>
              <span className="text-[#bd0041] font-bold">Free membership</span>{" "}
              with your first purchase.
            </li>
            {product?.variant?.stock?.reseller_commission && !isMicroSite && (
              <li className="flex gap-2">
                <Image
                  src="/svg/bullet_point.svg"
                  alt="Bullet point"
                  width={6}
                  height={6}
                ></Image>
                Save ₹
                {Math.floor(+product?.variant?.stock?.reseller_commission)} on
                this product.
              </li>
            )}
            <li className="flex gap-2">
              <Image
                src="/svg/bullet_point.svg"
                alt="Bullet point"
                width={6}
                height={6}
              ></Image>
              Unlock member price for all products for 15 days.
            </li>
          </ul>
        </div>
      )}
      <hr className="my-4" />
      {product.attributes?.map((attribute) => (
        <div className="my-4  border-b-[1px] pb-4" key={attribute.id}>
          <span className="block mb-2 font-medium text-black">
            {attribute?.attribute_name}
          </span>
          <div className="bg-white"></div>
          <div className="grid grid-cols-3 gap-4 justify-between">
            {attribute.values?.map((value) =>
              product.variant?.private_metadata[attribute.attribute_slug] !=
              value.slug ? (
                <Link
                  href={{
                    pathname: `/product/${product.slug}`,
                    query: { v: value?.variants[0].id },
                  }}
                  replace
                  key={value.slug}
                >
                  <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] ">
                    {value.name}
                  </div>
                </Link>
              ) : (
                <div
                  className="text-center py-1 px-2 justify-center items-center flex text-sm font-medium rounded-lg bg-[#ffdcc3]"
                  key={value.slug}
                >
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75012 8.12738L1.62262 4.99988L0.557617 6.05738L4.75012 10.2499L13.7501 1.24988L12.6926 0.192383L4.75012 8.12738Z"
                      fill="#2F1500"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium pl-2 ">
                    {value.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
      {/* <hr className="my-4" /> */}
      {/*mobile quantity */}
      <div className="my-4 flex justify-between items-center w-full md:w-1/2 font-medium">
        <span>Quantity</span>

        <div className="flex justify-between items-center">
          <div
            className="flex items-center mx-2 cursor-pointer"
            onClick={decreaseQuantity}
          >
            <Image
              src="/svg/quantity_subtract.svg"
              alt="Minus icon"
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="flex items-center mx-2 ">
            <span>{productContextType?.productQuantity}</span>
          </div>
          <div
            className="flex items-center mx-2 cursor-pointer"
            onClick={increaseQuantity}
          >
            <Image
              src="/svg/quantity_add.svg"
              alt="Plus icon"
              width={20}
              height={20}
            ></Image>
          </div>
        </div>
      </div>
      {showExceedError && (
        <div className="my-4 flex justify-between items-center w-full md:w-1/2 text-red-700">
          <span>required quantity not available in stock</span>
        </div>
      )}
      <hr className="my-4" />

      {/*if not out of stock */}

      {product?.variant?.stock?.available_stock && (
        <>
          <div className="my-4 flex justify-between items-center gap-4">
            <button
              onClick={() => buyNow(product)}
              className="text-[#6a4fa3] bg-transparent grow font-semibold py-2 px-4 border border-black uppercase rounded-full hover:bg-[#edebf5]"
            >
              {isBuyingNow ? (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Buy Now"
              )}
            </button>
          </div>
          <hr className="my-4" />

          <div className="my-4 flex items-center gap-3">
            <span className="uppercase font-medium flex">
              Delivery Details{" "}
              <Image
                src="/svg/delivery_details_icon.svg"
                alt="Delivery details icon"
                width={20}
                height={20}
                className="mx-2"
              ></Image>
            </span>
          </div>
          <div className="my-4 py-1 px-2 border border-[#73777F] rounded-lg shadow bg-[#DFE2EB]">
            <div className="flex items-center ">
              <input
                onChange={handleChange}
                type="number"
                placeholder="Enter delivery pincode"
                className="w-3/4 bg-transparent py-1 px-4 rounded-lg focus:outline-none focus:shadow-[0_0_1rem_#8c98a440] border-gray-300 bg-white"
                maxLength={6}
                onKeyDown={(e) => {
                  if (e.key === "Enter") deliveryPincodeCheck();
                }}
              />
              <button
                className="text-[#6a4fa3] w-1/4 bg-transparent outline-0  text-sm py-2  hover:bg-[#377dff1a] hover:rounded-full"
                onClick={deliveryPincodeCheck}
              >
                {deliveryDateApiLoad && (
                  <div
                    className="me-1 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                )}
                CHECK
              </button>
            </div>
          </div>
          <hr className="my-4" />
          {deliveryDate && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className="uppercase font-medium flex">
                  Delivery by {deliveryDate}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
          {error && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className=" font-medium flex text-red-700 error">
                  {error}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
          {/*delivery error msg*/}
          {(deliveryErrorMsg?.length ?? 0) > 1 && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className=" font-medium flex text-red-700 delivery">
                  {deliveryErrorMsg}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
        </>
      )}

      {!product?.variant?.stock?.available_stock && (
        <>
          <p className="text-2xl font-semibold text-black my-1">Out of Stock</p>
          <hr className="my-4" />
        </>
      )}

      <div className="my-4 flex items-center">
        <span className="uppercase font-medium">seller</span>
        <span className="align-text-bottom">:</span>
        <Link href={`/seller/${product?.variant?.stock?.company_slug}`}>
          <span className="text-[#904d00] ml-2">
            {" "}
            {product?.variant?.stock?.company_name}
          </span>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="my-4 flex items-center">
        <span className=" font-medium">SHARE</span>
        <span className="align-text-bottom">:</span>
        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: url,
            title: "Share this product",
          }}
        >
          <Image
            src="/svg/share_icon.svg"
            alt="Share icon"
            width={20}
            height={20}
            className="p-px mx-2 cursor-pointer"
          ></Image>
        </RWebShare>
      </div>
      <hr className="mt-4 mb-1" />
    </>
  );
}

export function ProductDetailsWeb({
  product,
  reviewDataCount,
  avgProductRating,
}: {
  product: ProductModel;
  reviewDataCount: number | undefined;
  avgProductRating: number;
}) {
  const { checkout, addToCart: addToCartCtx, setCurrentStep } = useCart();
  const [toast, setToast] = useState(false);
  let [isAddingToCart, setIsAddingToCart] = useState(false);
  let [isBuyingNow, setIsBuyingNow] = useState(false);
  const router = useRouter();
  const { isMicroSite } = useSiteData();
  const { isLoggedIn } = useCart();
  const [productQuantity, setProductQuantity] = useState(1);
  let highestQuantity: number;
  const [showExceedError, setShowExceedError] = useState(false);
  const [pincode, setPincode] = useState<string | undefined>();
  const [deliveryDateApiLoad, setDeliveryDateApiLoad] = useState<boolean>();
  const [deliveryDate, setDeliveryDate] = useState<string | undefined>("");
  const [deliveryErrorMsg, setDeliveryErrorMsg] = useState<
    string | undefined
  >();
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    // Regular expression to check for digits only
    const isNumeric = /^\d+$/.test(value);
    if (value == "") {
      setDeliveryDate("");
      setDeliveryErrorMsg("");
    }
    if (!isNumeric && value !== "") {
      setError("Please enter only numbers.");
    } else if (value.length > 6) {
      setError("Pincode should not exceed 6 digits.");
    } else {
      setPincode(value);
      setError("");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
    product.discount = 0;
    product.discount_rate = 0;

    if (
      +product?.variant?.max_price &&
      +product?.variant?.stock?.price < +product?.variant?.max_price
    ) {
      product.discount = +(
        +product?.variant?.max_price - +product?.variant?.stock?.price
      ).toFixed(2);
      if (product.discount) {
        product.discount_rate = Number(
          ((+product.discount / +product?.variant?.max_price) * 100).toFixed(0)
        );
      }
    }
  }, []);

  {
    /*find max quantity */
  }
  function findMaxQuantityValue(
    product: ProductModel,
    array: WarehouseStock[]
  ) {
    highestQuantity = -Infinity;
    for (const obj of array) {
      if (obj.quantity > highestQuantity) {
        highestQuantity = obj.quantity;
      }

      return highestQuantity;
    }
  }

  {
    /*decrease quantity */
  }
  function decreaseQuantity() {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
    if (productQuantity > (product?.variant?.stock?.quantity ?? 0)) {
      setShowExceedError(true);
    } else {
      setShowExceedError(false);
    }
  }

  {
    /*increase quantity */
  }
  function increaseQuantity() {
    if (productQuantity < (product?.variant?.stock?.quantity ?? 0)) {
      setProductQuantity(productQuantity + 1);
    } else {
      setShowExceedError(true);
      setTimeout(() => {
        setShowExceedError(false);
      }, 2000);
    }
  }

  {
    /*toast msg */
  }
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };
  const handleClose = (e: any) => {
    e.stopPropagation();
    setState({ ...state, open: false });
  };
  interface State extends SnackbarOrigin {
    open: boolean;
  }
  {
    /*pincode check*/
  }
  async function deliveryPincodeCheck() {
    let stock = product?.variant["stock"].id;
    setDeliveryDateApiLoad(true);
    let pincodeResponse = await pincodeCheck(pincode, stock);
    if (pincodeResponse.status == true) {
      setDeliveryErrorMsg("");
      setDeliveryDate(pincodeResponse?.data?.edd_display);
      setDeliveryDateApiLoad(false);
    } else {
      setDeliveryDate("");
      setDeliveryErrorMsg(pincodeResponse?.response?.error);
      setDeliveryDateApiLoad(false);
    }
  }

  async function addToCart(product: ProductModel, newState: SnackbarOrigin) {
    setIsAddingToCart(true);
    setToast(true);
    setState({ ...newState, open: true });
    setTimeout(() => {
      setToast(false);
    }, 6000);
    let checkoutResponse = await addToCheckout(
      productQuantity, // quantity
      product.variant.id, // variant_id
      product.variant.stock.id, // stock_id
      checkout
    );
    if (checkoutResponse.status) {
      const cartItems = checkoutResponse.data?.lines?.length ?? 0;
      addToCartCtx(checkoutResponse.data!, cartItems);
    }
    setIsAddingToCart(false);
  }

  async function buyNow(product: ProductModel) {
    setIsBuyingNow(true);
    let checkoutResponse = await createCheckout(
      productQuantity, // quantity
      product.variant.id, // variant_id
      product.variant.stock.id // stock_id
    );
    if (checkoutResponse.status) {
      if (LocalStorageProvider.isLoggedIn()) setCurrentStep(2);
      const cartItems = checkoutResponse.data?.lines?.length ?? 0;
      addToCartCtx(checkoutResponse.data!, cartItems);
    }
    setIsBuyingNow(false);
    router.push("/checkout");
  }

  function redirectToCheckout() {
    router.push("/checkout");
  }
  const action = (
    <>
      <div
        className="flex justify-items-center items-center rounded-2xl mx-2 w-full h-[70px] cursor-pointer"
        onClick={() => redirectToCheckout()}
      >
        <div className="flex flex-row justify-items-center items-center p-2 h-full ">
          <div className="w-1/2  rounded-full h-full flex flex-col">
            <div className="w-20 h-full">
              <Image
                className="rounded-xl h-full object-contain bg-contain "
                src={getImageUrl(
                  product?.variant?.images?.preview ?? product?.images?.preview
                )}
                alt="Product Image"
                width={1000}
                height={1000}
              ></Image>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2 my-1">
            <div className="px-3 whitespace-nowrap text-sm">Added to cart</div>
            <div className="bg-[#6a4fa3]   text-white font-normal py-1 px-4 rounded-full   hover:shadow-md hidden md:block  text-xs cursor-pointer">
              Go to Cart
            </div>
          </div>
        </div>
        <div className="ms-1 py-2 self-start " onClick={handleClose}>
          <Image
            src="/svg/close_icon.svg"
            alt="Close icon"
            className="cursor-pointer "
            width={20}
            height={20}
          ></Image>
        </div>
      </div>
    </>
  );

  return (
    <>
      <h2 className="text-2xl text-wrap">{product.name}</h2>
      {avgProductRating > 0 && (
        <>
          <a href="#reviewSection">
            <div className="flex mt-4 w-fit items-center px-4 py-2 border rounded-lg bg-white shadow">
              <span className="font-bold text-lg mr-2">
                {avgProductRating.toFixed(1)}
              </span>
              <Rating
                name="read-only"
                value={avgProductRating}
                precision={0.5}
                readOnly
              />
              <span className="h-6 border-l border-gray-300 mx-3 py-1"></span>
              {Number(reviewDataCount) > 0 && (
                <span className="text-sm text-gray-600">
                  {reviewDataCount} Reviews
                </span>
              )}
            </div>
          </a>
        </>
      )}

      {/* </> */}

      <hr className="my-4" />
      <div className="flex items-center space-x-2 my-3">
        <span className="text-3xl text-[#1A1C1E] font-normal">
          ₹{Math.ceil(Number(product.variant.stock.price))}
        </span>
        {+product?.variant?.stock?.price < +product?.variant.max_price &&
          Math.floor(
            +(
              ((+product?.variant.max_price - +product.variant.stock.price) /
                +product.variant.max_price) *
              100
            )
          ) > 3 && (
            <span className="text-sm text-[#43474E] line-through font-medium">
              ₹{Math.ceil(Number(product.variant.max_price))}
            </span>
          )}
        {Math.floor(
          +(
            ((+product?.variant.max_price - +product.variant.stock.price) /
              +product.variant.max_price) *
            100
          )
        ) > 3 && (
          <span className="text-3xl text-[#904D00] font-normal">
            -
            {Math.floor(
              ((+product?.variant.max_price - +product.variant.stock.price) /
                +product.variant.max_price) *
                100
            )}
            %
          </span>
        )}
      </div>

      {toast && (
        <>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            action={action}
          />
        </>
      )}

      {!isMicroSite && (
        <div className="flex">
          <Image
            className="w-[158px]"
            src="/svg/member-price.svg"
            alt="member-price"
            width={97}
            height={16}
          />
          <span className="text-3xl ml-4 text-black">
            ₹
            {Math.ceil(
              +product.variant?.stock?.price -
                +product.variant?.stock?.reseller_commission
            )}
          </span>
        </div>
      )}

      {!isMicroSite && (
        <ul className="text-[22px] my-3 ms-4">
          <li className="flex gap-2">
            <Image
              src="/svg/bullet_point.svg"
              alt="Bullet point"
              width={10}
              height={10}
            ></Image>
            <span className="text-[#bd0041] font-bold">Free membership</span>{" "}
            with your first purchase.
          </li>
          {product.variant?.stock?.reseller_commission && !isMicroSite && (
            <li className="flex gap-2">
              <Image
                src="/svg/bullet_point.svg"
                alt="Bullet point"
                width={10}
                height={10}
              ></Image>
              Save ₹{Math.floor(+product.variant?.stock?.reseller_commission)}{" "}
              on this product.
            </li>
          )}
          <li className="flex gap-2">
            <Image
              src="/svg/bullet_point.svg"
              alt="Bullet point"
              width={10}
              height={10}
            ></Image>
            Unlock member price for all products for 15 days.
          </li>
        </ul>
      )}

      <hr className="my-4" />
      {product.attributes?.map((attribute) => (
        <div
          className="my-4  border-b-[1px] pb-4"
          key={attribute.attribute_name}
        >
          <span className="block mb-2 font-medium text-black">
            {attribute?.attribute_name}
          </span>
          <div className="bg-white"></div>
          <div className="grid grid-cols-3 gap-4 justify-between">
            {attribute.values?.map((value) =>
              // if attribute is color then show color else show value
              product.variant?.private_metadata[attribute.attribute_slug] !=
              value.slug ? (
                // <Link href={`/product/${product.slug}?v=${value?.variants[0]?.id}`}>
                <Link
                  href={{
                    pathname: `/product/${product.slug}`,
                    query: { v: value?.variants[0].id },
                  }}
                  replace
                  key={value.slug}
                >
                  <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] ">
                    {value.name}
                  </div>
                </Link>
              ) : (
                <div
                  className="text-center py-1 px-2 justify-center items-center flex text-sm font-medium rounded-lg bg-[#ffdcc3]"
                  key={value.slug}
                >
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75012 8.12738L1.62262 4.99988L0.557617 6.05738L4.75012 10.2499L13.7501 1.24988L12.6926 0.192383L4.75012 8.12738Z"
                      fill="#2F1500"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium pl-2 ">
                    {value.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
      {/* <hr className="my-4" /> */}
      {/*desktop quantity */}
      <div className="my-4 flex justify-between items-center w-full md:w-1/2 font-medium">
        <span>Quantity</span>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center mx-2 cursor-pointer "
            onClick={decreaseQuantity}
          >
            <Image
              src="/svg/quantity_subtract.svg"
              alt="Minus icon"
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="flex items-center mx-2">
            <span>{productQuantity}</span>
          </div>
          <div
            className="flex items-center mx-2 cursor-pointer"
            onClick={increaseQuantity}
          >
            <Image
              src="/svg/quantity_add.svg"
              alt="Plus icon"
              width={20}
              height={20}
            ></Image>
          </div>
        </div>
      </div>
      {/* <div className="my-4 flex justify-between items-center w-full md:w-1/2">
        <span>Quantity</span>
        <div className="flex justify-between items-center">
          <div className="flex items-center mx-2" onClick={decreaseQuantity}>
            <Image src="/svg/quantity_subtract.svg" alt="Minus icon" width={20} height={20}></Image>
          </div>
          <div className="flex items-center mx-2">
            <span>{productQuantity}</span>
          </div>
          <div className="flex items-center mx-2" onClick={increaseQuantity}>
            <Image src="/svg/quantity_add.svg" alt="Plus icon" width={20} height={20}></Image>
          </div>
        </div>

      </div> */}
      {showExceedError && (
        <div className="my-4 flex justify-between items-center w-full md:w-1/2 text-red-700">
          <span>required quantity not available in stock</span>
          {/* <div className="flex justify-between items-center">
           <div className="flex items-center mx-2" onClick={decreaseQuantity}>
             <Image src="/svg/quantity_subtract.svg" alt="Minus icon" width={20} height={20}></Image>
           </div>
           <div className="flex items-center mx-2">
             <span>{productQuantity}</span>
           </div>
           <div className="flex items-center mx-2" onClick={increaseQuantity}>
             <Image src="/svg/quantity_add.svg" alt="Plus icon" width={20} height={20}></Image>
           </div>
         </div> */}
        </div>
      )}
      <hr className="my-4" />

      {/*if product is not out of stock */}
      {product?.variant?.stock?.available_stock && (
        <>
          <div className="my-4 flex flex-col ms-1 ">
            {!isMicroSite &&
              !isLoggedIn &&
              product?.variant?.stock?.reseller_commission && (
                <div className="text-[#BD0041] font-medium text-sm">
                  Save ₹
                  {Math.floor(+product?.variant?.stock?.reseller_commission)}{" "}
                  with free membership on this product.
                </div>
              )}
            <div className="justify-between items-center gap-4 flex my-2">
              {checkout?.lines?.find(
                (line) => line.variant === product.variant.id
              ) ? (
                <button
                  onClick={() => redirectToCheckout()}
                  className="bg-[#6a4fa3] grow text-white font-bold py-2 px-4 rounded-full uppercase hover:shadow-md hidden md:block"
                >
                  Go to cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    addToCart(product, { vertical: "top", horizontal: "right" })
                  }
                  className="bg-[#6a4fa3] grow text-white font-bold py-2 px-4 rounded-full uppercase hover:shadow-md hidden md:block"
                >
                  {isAddingToCart ? (
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              )}
              <button
                onClick={() => buyNow(product)}
                className="text-[#6a4fa3] bg-transparent grow font-semibold py-2 px-4 border border-black uppercase rounded-full hover:bg-[#edebf5]"
              >
                {isBuyingNow ? (
                  <div
                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="my-4 flex items-center gap-3">
            <span className="uppercase font-medium flex">
              Delivery Details{" "}
              <Image
                src="/svg/delivery_details_icon.svg"
                alt="Delivery details icon"
                width={20}
                height={20}
                className="mx-2"
              ></Image>
            </span>
          </div>
          <div className="my-4 px-2 py-1  rounded-lg shadow bg-[#DFE2EB] border border-[#73777F] ">
            <div className="flex items-center">
              <input
                onChange={handleChange}
                maxLength={6}
                type="text"
                placeholder="Enter delivery pincode"
                className="w-5/6  py-1 px-4 rounded-lg focus:outline-none focus:shadow-[0_0_1rem_#8c98a440] border-gray-300 bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") deliveryPincodeCheck();
                }}
              />
              <button
                className="text-[#6a4fa3] W-1/6 bg-transparent outline-0 grow text-sm py-2 px-4  hover:bg-[#377dff1a] hover:rounded-full"
                onClick={deliveryPincodeCheck}
              >
                {deliveryDateApiLoad && (
                  <div
                    className="me-1 inline-block h-4 w-4  animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                )}
                CHECK
              </button>
            </div>
          </div>
          <hr className="my-4" />
          {deliveryDate && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className="uppercase font-medium flex">
                  Delivery by {deliveryDate}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
          {error && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className="font-medium flex text-red-700 error">
                  {error}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
          {/*delivery error msg*/}
          {(deliveryErrorMsg?.length ?? 0) > 1 && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className="font-medium flex text-red-700 delivery">
                  {deliveryErrorMsg}
                </span>
              </div>
              <hr className="my-4" />
            </>
          )}
        </>
      )}

      {!product?.variant?.stock?.available_stock && (
        <>
          <p className="text-5xl font-semibold text-black">Out of Stock</p>
          <hr className="my-4" />
        </>
      )}

      <div className="my-4 flex items-center">
        <span className="uppercase font-medium">seller</span>
        <span className="align-text-bottom">:</span>
        <Link href={`/seller/${product?.variant?.stock?.company_slug}`}>
          <span className="text-[#904d00] ml-2">
            {" "}
            {product?.variant?.stock?.company_name}
          </span>
        </Link>
      </div>
      <hr className="my-4" />

      <div className="my-4 flex items-center">
        <span className="uppercase font-medium">SHARE</span>
        <span className="align-text-bottom">:</span>
        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: url,
            title: "Share this product",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Image
            src="/svg/share_icon.svg"
            alt="Share icon"
            width={20}
            height={20}
            className="p-px mx-2 cursor-pointer"
          ></Image>
        </RWebShare>
      </div>

      <hr className="my-4" />
    </>
  );
}

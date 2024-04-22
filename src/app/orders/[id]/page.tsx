"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import OrderListPagination from "../page"
import { getOrderDetailPrivate, getOrderDetailPublic } from "@/src/providers/api_provider";
import { OrderDetailModel } from "@/src/providers/models/order_detail_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import TrackingOrderModal from "./components/tracking_order_modal";
import Skeleton from "./components/skeleton";
import { useCart } from "@/src/providers/cart_context";
import LoginMain from "@/src/components/login";
import Image from "next/image";

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

const statusArrayTillConfirmation = [
  "PLACED",
  "CONFIRMED",

];

const statusArrayAfterConfirmation = [
  "SHIPMENT_PLACED",
  "SHIPPED",
  "DELIVERED",
];

const statusArrayForReturnCancel = [
  "RTO",
  "DISPUTED",
  "SELLER_FULFILMENT",
  "LOST_IN_TRANSIT",
  "WEIGHT_DISCREPANCY",
  "CANCELLED",
];


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

const order_status = (status: string) => {
  switch (status) {
    case "PLACED":
      return "Order Placed";
    case "CONFIRMED":
      return "Order Confirmed";
    case "SHIPMENT_PLACED":
      return "Shipment Initiated";
    case "SHIPPED":
      return "Order Shipped";
    case "DELIVERED":
      return "Order Delivered";
    case "RTO":
      return "RTO";
    case "DISPUTED":
      return "Disputed";
    case "LOST_IN_TRANSIT":
      return "Lost in Transit";
    case "WEIGHT_DISCREPANCY":
      return "Weight Discrepancy";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Unknown status";
  }
};


function OrderDetails({ params }: { params: { id: string } }) {
  const { isLoggedIn } = useCart();
  const [orderDetail, setOrderDetail] = useState<OrderDetailModel>();
  const [orderDetailApiLoad, setOrderDetailApiLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {

    if (!isLoggedIn) {
      setOpen(true)
    }
    if (isLoggedIn) {
      getOrderDetailPrivate(params.id).then((data) => {
        setOrderDetail(data.data)
        setOrderDetailApiLoad(false);

        const trackArray = ["SHIPMENT_PLACED", "SHIPPED", "DELIVERED"];
      });
    } else {
      getOrderDetailPublic(params.id).then((data) => {
        
        setOrderDetail(data.data)
        setOrderDetailApiLoad(false);
        const trackArray = ["SHIPMENT_PLACED", "SHIPPED", "DELIVERED"];
      });
    }


  }, []);
  return (
    <>
      <div className="block sm:hidden px-3  mt-4">
        <Link href="/orders">
          <div className="flex font-base mb-2 items-center">
            <div className="  px:1 sm:px-2  ">
              <Image
                src="/svg/back_arrow.svg"
                alt=""
                className={""}
                width={16}
                height={16}
              ></Image>
            </div>
            <p className="sm:m-0 text-xs ">Back to Order List</p>
          </div>
        </Link>
        <Separator color="#79747E29" />
        <div>
          <div className="my-2">
            <p className=" text-base font-medium  ">ORDER STATUS</p>

          </div>

          {orderDetailApiLoad && <Skeleton></Skeleton>}
          {!orderDetailApiLoad &&
            <>
              {orderDetail?.lines.map((line, index) =>
                <div className="flex flex-col  justify-center mt-6 pb-2 border-b-2 border-[#79747E29]" key={index}>
                  <div className="mb-3">
                    <p className="text-xs font-normal  ">
                      {line?.variant_name}
                    </p>
                  </div>
                  <div className="w-full border rounded-3xl me-4 h-56 ">
                    <Image
                      width={1050}
                      height={1050}
                      src={getImageUrl(line.product_variant_images.preview)}
                      alt="line.variant_name"
                      className={"h-full w-full object-cover rounded-3xl"
                      }
                    />
                  </div>
                  <div className="my-3">
                    <Link href={`/product/${line.product_slug}`}>
                      <button className="w-full text-[#6a4fa3] bg-transparent grow font-normal py-2 border border-[#73777F] uppercase rounded-full hover:bg-[#edebf5]  text-sm">
                        BUY IT AGAIN
                      </button>
                    </Link>
                  </div>

                  <Separator color="#79747E29" />
                  <div className="flex flex-col justify-center align-middle  my-3">
                    {statusArrayTillConfirmation.includes(line.status) &&
                      <>
                        <div className="w-full h-9 sm:h-10 bg-[#FFD9DC] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex align-middle ">
                            <Image
                              width={20}
                              height={16}
                              src="/svg/ongoing_delivery.svg"
                              alt=""
                              className={"sm:p-1"}
                            />

                            <div className="text-sm sm:text-base p-1 ">{order_status(line?.status)}</div>
                          </div>
                        </div>
                        {line?.invoice?.length > 0 &&
                          <div className="mt-1">
                            <p className="text-xs text-[#73777F] ml-1">
                              Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}</span>
                            </p>
                          </div>}

                      </>
                    }



                    {statusArrayAfterConfirmation.includes(line.status) &&
                      <>
                        <div className="w-full h-11 sm:h-14 bg-[#008F17] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center w-1/2 ">
                            <Image
                              width={24}
                              height={16}
                              src="/svg/order_delivered.svg"
                              alt=""
                              className={"p-1"}
                            />
                            <div className="text-sm sm:text-base  text-white  p-1 whitespace-nowrap">
                            {order_status(line?.status)}
                            </div>
                          </div>
                          {line?.tracking?.tracking_url &&
                            <div className="bg-[#6a4fa3] flex items-center   text-white font-normal text-sm px-5 py-1 rounded-full my-1.5 hover:shadow-md  me-5 cursor-pointer">
                              <TrackingOrderModal data={line?.tracking}></TrackingOrderModal>
                            </div>}
                        </div>
                        {line?.invoice?.length > 0 &&
                          <>
                            <div className="mt-2">
                              <p className="text-xs text-[#73777F] ml-1">
                                Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-xs text-[#73777F] ml-1">
                                Delivered on: <span className="text-black">   {new Date(line?.delivered_on).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                          </>}
                      </>
                    }

                    {statusArrayForReturnCancel.includes(line.status) &&
                      <>
                        <div className="w-full h-9 sm:h-14 bg-[#bd0041] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center w-1/2 ">
                            <Image
                              width={40}
                              height={16}
                              src="/svg/white_close_icon.svg"
                              alt=""
                              className={"p-1"}
                            />
                            <div className="text-sm sm:text-base  text-white  p-1 whitespace-nowrap">
                            {order_status(line?.status)}
                            </div>
                          </div>
                          {line?.tracking?.tracking_url &&
                          <div className="bg-[#6a4fa3] flex items-center text-white font-normal text-sm px-5 py-1 rounded-full my-1.5 hover:shadow-md  me-5 cursor-pointer">
                            <TrackingOrderModal data={line?.tracking}></TrackingOrderModal>
                          </div>}
                        </div>
                        {line?.invoice?.length > 0 &&
                          <>
                            <div className="mt-1">
                              <p className="text-xs text-[#73777F] ml-1">
                                Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-xs text-[#73777F] ml-1">
                                Delivered on: <span className="text-black">   {new Date(line?.delivered_on).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                          </>}
                      </>
                    }



                  </div>


                  <Separator color="#79747E29" />
                  <Link href="https://support.zoozle.in/" target="blank" >
                    <div className="my-3  flex align-middle justify-between">
                      <p className="text-xs font-semibold">Support</p>
                      <Image
                        width={40}
                        height={10}
                        src="/svg/arrow_forward_24px.svg"
                        alt=""
                        className={"px-2 pe-3"}
                      ></Image>
                    </div>
                  </Link>
          
                </div>)}
            </>}

        </div>

      </div>
      <div className="hidden sm:block px-1 sm:px-16 mt-4">
        <Link href="/orders">
          <div className="flex font-base mb-2 items-center">
            <div className=" sm:p-1 px-2  ">
              <Image
                width={25}
                height={16}
                src="/svg/back_arrow.svg"
                alt=""
                className={""}
              ></Image>
            </div>
            <p className="text-xs sm:text-base">Back to Order List</p>
          </div>
        </Link>
        <Separator color="#79747E29" />
        <div>
          <div className="my-2">
            <p className=" text-base font-medium sm:text-2xl sm:font-normal">
              ORDER STATUS
            </p>
            {orderDetailApiLoad && <Skeleton></Skeleton>}
            {!orderDetailApiLoad &&
              <>
                {orderDetail?.lines.map((line, index) =>
                  <div className="flex align-middle justify-center h-[484px] mt-6 pb-6  border-b-2 border-[#79747E29]" key={index}>
                    <div className="w-1/2 border rounded-3xl bg-gray-200 me-4 ">
                      <Image
                        width={1050}
                        height={1050}
                        src={getImageUrl(line.product_variant_images.preview)}
                        alt=""
                        className={"h-full w-full object-cover rounded-3xl"}
                      />
                    </div>
                    <div className="w-1/2  px-2">
                      <div className="mb-3">
                        <p className="text-2xl font-normal">
                          {line?.variant_name}
                        </p>
                      </div>
                      <Separator color="#79747E29" />
                      {/* status array */}
                      {statusArrayTillConfirmation.includes(line.status) && <div className="flex flex-col justify-center align-middle  my-3">
                        <div className="w-full h-6 sm:h-14 bg-[#FFD9DC] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center w-1/2 mt-1">
                            <Image
                              width={40}
                              height={16}
                              src="/svg/ongoing_delivery.svg"
                              alt=""
                              className={"sm:p-2"}
                            />
                            <div className="text-xs sm:text-base  whitespace-nowrap ">
                              {order_status(line?.status)}
                            </div>
                          </div>
                        </div>
                        {line?.invoice?.length > 0 &&
                          <div className="mt-1">
                            <p className="text-base text-[#73777F]">
                              Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}</span>
                            </p>
                          </div>}
                      </div>}

                      {/* order delivered */}
                      {statusArrayAfterConfirmation.includes(line.status) && <div className="flex flex-col justify-center align-middle  my-3">

                        <div className="w-full h-6 sm:h-14 bg-[#008F17] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center w-1/2 mt-1">
                            <Image
                              width={40}
                              height={16}
                              src="/svg/order_delivered.svg"
                              alt=""
                              className={"sm:p-2"}
                            />
                            <div className="text-xs sm:text-base  text-white whitespace-nowrap ">
                              {order_status(line?.status)}
                            </div>
                          </div>
                          {line?.tracking?.tracking_url &&
                          <div className="bg-[#6a4fa3]   text-white font-normal py-2 px-5 rounded-full my-2  hover:shadow-md hidden md:flex items-center me-5 cursor-pointer">
                            <TrackingOrderModal data={line?.tracking}></TrackingOrderModal>
                          </div>}

                        </div>
                        {line?.invoice?.length > 0 &&
                          <>
                            <div className="mt-1">
                              <p className="text-base text-[#73777F]">
                                Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-base text-[#73777F]">
                                Delivered on: <span className="text-black">   {new Date(line?.delivered_on).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                          </>
                        }
                      </div>}
                      {statusArrayForReturnCancel.includes(line.status) && <div className="flex flex-col justify-center align-middle  my-3">

                        <div className="w-full h-6 sm:h-14 bg-[#bd0041] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center w-1/2 mt-1">
                            <Image
                              width={40}
                              height={16}
                              src="/svg/white_close_icon.svg"
                              alt=""
                              className={"sm:p-2"}
                            />
                            <div className="text-xs sm:text-base text-white  whitespace-nowrap">
                              {order_status(line?.status)}
                            </div>
                          </div>
                          {line?.tracking?.tracking_url &&
                          <div className="bg-[#6a4fa3]   text-white font-normal py-2 px-5 rounded-full my-2  hover:shadow-md hidden md:block me-5 cursor-pointer">
                            <TrackingOrderModal data={line?.tracking}></TrackingOrderModal>
                          </div>}

                        </div>
                        {line?.invoice?.length > 0 &&
                          <>
                            <div className="mt-1">
                              <p className="text-base text-[#73777F]">
                                Ordered on: <span className="text-black">   {new Date(line?.invoice[0]?.created).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                            <div className="mt-1">
                              <p className="text-base text-[#73777F]">
                                Delivered on: <span className="text-black">   {new Date(line?.delivered_on).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}</span>
                              </p>
                            </div>
                          </>
                        }
                      </div>}



                      <Separator color="#79747E29" />

                      <div className="my-3">
                        <Link href={`/product/${line.product_slug}`}>
                          <button className="w-2/3 text-[#6a4fa3] bg-transparent grow font-normal py-2 border border-[#73777F] uppercase rounded-full hover:bg-[#edebf5]  text-sm">
                            BUY IT AGAIN
                          </button>
                        </Link>

                      </div>
                      <Separator color="#79747E29" />
                      <Link href="https://support.zoozle.in/" target="blank" >
                        <div className="my-6 text-sm font-medium flex align-middle justify-between">
                          <p>Support</p>
                          <Image
                            width={45}
                            height={45}
                            src="/svg/arrow_forward_24px.svg"
                            alt=""
                            className={"pe-7"}
                          ></Image>
                        </div>
                      </Link>
                      <Separator color="#79747E29" />
                    </div>
                  </div>)}
              </>}
          </div>

        </div>

      </div>
    </>
  );
}

export default OrderDetails;



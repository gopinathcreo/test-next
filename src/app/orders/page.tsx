"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrderList } from "@/src/providers/api_provider";
import { OrderListModel } from "@/src/providers/models/orderlist_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import TablePagination from "@mui/material/TablePagination";
import OrderListPagination from "./components/order_pagination";
import Skeleton from "./components/skeleton";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";
import { useCart } from "@/src/providers/cart_context";
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
import LoginMain from "@/src/components/login";

let dataCount: number;

// const Image = ({
//   src,
//   alt,
//   className,
// }: {
//   src: string;
//   alt: string;
//   className: string;
// }) => <img src={src} alt={alt} loading="lazy" className={className} />;


function Orderlist() {
  

  const [statusArrayTillConfirmation] = useState([
      "OTP_VERIFICATION_PENDING",
      "PLACED",
      "ADDRESS_CONFIRMED",
      "CUSTOMER_CONFIRMED",
      "PARTIALLY_CONFIRMED",
      "CONFIRMED",
    ]);
  const [statusArrayAfterConfirmation] = useState([
    "SHIPMENT_PLACED",
    "PARTIALLY_SHIPMENT_PLACED",
    "PARTIALLY_SHIPPED",
    "SHIPPED",
    "PARTIALLY_DELIVERED",
    "DELIVERED",
    ]);
  const [statusArrayForReturnCancel] = useState([
    "PARTIALLY_RTO",
    "RTO",
    "CANCELLED",
  ]);

  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setClose(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [orderList, setOrderList] = useState<OrderListModel | undefined>();
  const [hasOrders, setHasOrders] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { isLoggedIn } = useCart();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderListApiLoad, setOrderListApiLoad] = useState(true);
  let productData;

  useEffect(() => {
    // setIsLoggedIn(LocalStorageProvider.isLoggedIn());
    if (!isLoggedIn) {
      setOpen(true)
    }


    getOrderList(page + 1, limit).then((data) => {
      setOrderList(data.data);

      const results = data.data?.results;
      dataCount = Number(data.data?.count);
      if (dataCount > 0) {
        setHasOrders(true)
      } else {
        setHasOrders(false)
      }

      productData = data.data;



      setOrderListApiLoad(false);

    });
  }, [isLoggedIn, page, limit]);

  const order_status = (status: string) => {
    switch (status) {
      case "OTP_VERIFICATION_PENDING":
        return "OTP Verification Pending";
      case "PLACED":
        return "Order Placed";
      case "ADDRESS_CONFIRMED":
        return "Address Confirmed";
      case "CUSTOMER_CONFIRMED":
        return "Customer Confirmed";
      case "PARTIALLY_CONFIRMED":
        return "Partially Confirmed";
      case "CONFIRMED":
        return "Order Confirmed";
      case "SHIPMENT_PLACED":
        return "Shipment Initiated";
      case "PARTIALLY_SHIPMENT_PLACED":
        return "Partially Shipment Placed";
      case "PARTIALLY_SHIPPED":
        return "Partially Shipped"
      case "SHIPPED":
        return "Order Shipped";
      case "PARTIALLY_DELIVERED":
        return "Partially Delivered";
      case "DELIVERED":
        return "Order Delivered";
      case "PARTIALLY_RTO":
        return "Partially RTO";
      case "RTO":
        return "RTO";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Unknown status";
    }
  };


  return (

    <div className=" px-3 sm:px-16">
      <div className="text-base font-medium  sm:text-2xl sm:text-normal  mt-6 mb-3">
        YOUR ORDERS
      </div>

      {!isLoggedIn &&
        <Dialog
          size={isMobile ? "xxl" : "xs"}
          open={open}
          handler={handleOpen}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
        
          <DialogBody
            className="shadow-md"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div>
              <LoginMain />
            </div>
          </DialogBody>
        </Dialog>}
      {!isLoggedIn && <Skeleton></Skeleton>}
      {isLoggedIn && orderListApiLoad && <Skeleton></Skeleton>}
      {isLoggedIn && !orderListApiLoad &&
        <>
          {hasOrders &&
            <div>
              {orderList?.results.map((result, index) => (
                <Link href={"/orders/" + result?.id} key={index}>
                  <div className="border rounded-2xl h-44 sm:h-64 align-middle justify-center flex flex-col my-2 " >

                    <div className=" px-2 sm:px-12 flex justify-center align-middle ">
                      <div className="w-1/4 h-32 sm:h-48 rounded-xl border border-[#C3C6CF] m-1">
                        <Image
                          src={getImageUrl(
                            result.lines[0].product_variant_images.preview
                          )}

                          alt="Product image"
                          width={1000}
                          height={16}
                          className={"rounded-xl h-full sm:h-full w-full  object-cover border border-[#C3C6CF]"}
                        />
                      </div>
                      <div className="w-3/4 h-32 sm:h-48 rounded-xl m-1 p-3 sm:p-8">
                        <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 ">
                          <p>{result?.lines[0].variant_name}</p>
                        </div>
                        {result.lines.length > 1 &&
                          <div className=" text-sm sm:text-lg text-black overflow-hidden mb-2 ">
                            <p>+{result?.lines.length}</p>
                          </div>}
                        <div className="text-xs sm:text-sm font-normal ">
                          <p className="mb-2">
                            <span className="text-[#73777F]">Ordered on: </span>
                            <span className="text-black">
                              {new Date(result?.created).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </p>
                          <p className="text-gray-500">#{result?.order_number}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center align-middle px-2 sm:px-12 mt-2">
                      {statusArrayTillConfirmation.includes(result?.lines[0].status) && (
                        <div className="w-full h-6 sm:h-8 bg-[#FFD9DC] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center justify-center">
                            <Image
                              src="/svg/ongoing_delivery.svg"
                              alt=""
                              width={25}
                              height={16}
                              className="sm:p-1 hidden sm:block"
                            />
                            <Image
                              src="/svg/ongoing_delivery.svg"
                              alt=""
                              width={16}
                              height={16}
                              className="sm:p-1 block sm:hidden "
                            />
                            <div className="text-xs sm:text-sm px-2 sm:pt-1 ">
                              {order_status(result?.lines[0].status)}
                            </div>
                          </div>

                          <div className=" p-1 sm:p-2 pe-5 ">
                            <Image

                              src="/svg/arrow_forward_24px.svg"
                              alt=""
                              width={16} height={16}
                              className={""}
                            ></Image>
                          </div>
                        </div>
                      )}
                      {statusArrayAfterConfirmation.includes(result?.lines[0].status) && (
                        <div className="w-full h-6 sm:h-8 bg-[#008F17] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center justify-center">
                            <Image
                              src="/svg/order_delivered.svg"
                              alt=""
                              className="sm:p-1 hidden sm:block"
                              width={25}
                              height={16}
                            />
                            <Image
                              src="/svg/order_delivered.svg"
                              alt=""
                              className="sm:p-1 block sm:hidden "
                              width={16}
                              height={16}
                            />
                            <div className="text-xs sm:text-sm px-2 text-white">
                              {order_status(result?.lines[0].status)}
                            </div>
                          </div>

                          <div className=" p-1 sm:p-2 pe-5 ">
                            <Image
                              src="/svg/arrow_forward_white_24px.svg"
                              alt=""
                              className={""}
                              width={16}
                              height={16}
                            ></Image>
                          </div>
                        </div>
                      )}
                      {statusArrayForReturnCancel.includes(result?.lines[0].status) && (
                        <div className="w-full h-6 sm:h-8 bg-[#bd0041] rounded-lg flex align-middle justify-between">
                          <div className="px-2 py-1 flex items-center justify-center">
                            <Image
                              src="/svg/white_close_icon.svg"
                              alt=""
                              className={"sm:p-1 p-1"}
                              width={23}
                              height={16}
                            />
                            <div className="text-xs sm:text-sm px-2 text-white">
                              {order_status(result?.lines[0].status)}
                            </div>
                          </div>

                          <div className=" p-1 sm:p-2 pe-5 ">
                            <Image
                              src="/svg/arrow_forward_white_24px.svg"
                              alt=""
                              className={""}
                              width={16}
                              height={16}
                            ></Image>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </Link>
              ))}

            </div>
          }
          {!hasOrders &&
            <div className="w-full">
              <div className="flex flex-col sm:flex-row   align-middle justify-center mt-6">
                <div className=" sm:w-1/2 flex flex-col align-middle justify-center">
                  <p className="text-center text-black font-normal text-lg sm:text-2xl">&quot;Discover your favorites, add to cart, and breeze through checkout with zoozle.</p>
                  <p className="text-center text-black font-normal text-lg sm:text-2xl"> Your must-haves are just a click away!&quot;</p></div>
                <div className="block sm:hidden w-full mt-4 ">
                  <Image src="/svg/ordersNotFoundMobile.svg" alt="No Orders Image" width={400} height={400}
                    className={""} />
                </div>
                <div className="hidden sm:block sm:w-1/2">
                  <Image src="/svg/ordersNotFound.svg" alt="No Orders Image" width={500} height={500}
                    className={""} />
                </div>
              </div>
            </div>
          }
        </>

      }

      {/* 
      {!hasOrders && isLoggedIn && <Skeleton></Skeleton>} */}
      {/* 
      {!hasOrders &&
        <>
          {isLoggedIn &&
   }
        </>} */}

      <OrderListPagination count={dataCount} page={page} setPage={setPage} limit={limit} setLimit={setLimit}></OrderListPagination>

    </div>




  );
}
export default Orderlist;


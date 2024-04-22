import Snackbar from "@/src/components/snackbar";
import {
  addToCheckout,
  fetchSellerCollectionProducts,
  updateCheckout,
} from "@/src/providers/api_provider";
import { useCart } from "@/src/providers/cart_context";
import { Line } from "@/src/providers/models/checkout_model";
import { ProductModel } from "@/src/providers/models/product_model";
import { SellerCollection } from "@/src/providers/models/seller_collection_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type SellerCollectionDialogProps = {
  seller: { name: string; slug: string };
  sellerDialogOpen: boolean;
  setSellerDialogOpen: (sellerDialogOpen: boolean) => void;
};

const SellerCollectionDialog = ({
  seller,
  sellerDialogOpen,
  setSellerDialogOpen,
}: SellerCollectionDialogProps) => {
  const { checkout, setCheckout } = useCart();
  const [collections, setCollection] = useState<SellerCollection[]>([]);
  const [addedCollection, setAddedCollection] = useState<SellerCollection>();
  const [apiLoad, setApiLoad] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let [updatingCollectionVariantId, setUpdatingCollectionId] =
    useState<Number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSellerCollection();
  }, [seller]);

  const fetchSellerCollection = async () => {
    if (seller.name) {
      setApiLoad(true);
      const data = await fetchSellerCollectionProducts(seller.slug);
      setApiLoad(false);
      setCollection(data);
    }
  };

  const addTocart = async (collection: SellerCollection) => {
    setIsAddingToCart(true);
    setUpdatingCollectionId(collection.variant?.id ?? null);
    if (checkout) {
      const product = checkout.lines?.find(
        (x: Line) => x.variant == collection.variant?.id
      );
      const updatedQuant = 1;
      console.log("test", collection.variant?.stock.id);
      if (product?.quantity) {
        product.quantity += updatedQuant;
        const updatedCheckout = {
          ...checkout,
          lines: checkout.lines?.map((item: Line) =>
            item.variant == collection.variant?.id ? product : item
          ),
        };
        const patchRes = await updateCheckout(updatedCheckout);
        if (patchRes.data) {
          setAddedCollection(collection);
          setOpenSnackbar(true);
          const cartItems = patchRes.data?.lines?.length ?? 0;
          setCheckout(patchRes.data);
        }
      } else {
        if (collection.variant) {
          let checkoutResponse = await addToCheckout(
            1,
            collection.variant?.id,
            collection.variant?.stock.id,
            checkout
          );
          if (checkoutResponse.status && checkoutResponse.data) {
            setAddedCollection(collection);
            setOpenSnackbar(true);
            const cartItems = checkoutResponse.data?.lines?.length ?? 0;
            setCheckout(checkoutResponse?.data);
          }
        }
      }
      setIsAddingToCart(false);
    }
  };

  const SnackbarAction = (
    <>
      <div className="flex justify-items-center items-center rounded-2xl mx-2">
        <div className="flex justify-items-center items-center  mx-3 my-1">
          <div className="w-1/2  rounded-full">
            <div className="w-[100px] h-full">
              <Image
                className="rounded-xl"
                src={getImageUrl(addedCollection?.image!)}
                alt="Product Image"
                width={100}
                height={100}
              ></Image>
            </div>
          </div>
          <div className="px-3 whitespace-nowrap">Added to cart</div>
        </div>
        <div
          className="ms-1 py-2 self-start "
          onClick={() => setOpenSnackbar(!openSnackbar)}
        >
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

  return (
    <>
      <Dialog
        open={sellerDialogOpen}
        handler={() => {
          setSellerDialogOpen(!sellerDialogOpen);
        }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {apiLoad && (
          <div className="">
            <div className="flex justify-between items-center h-10 mb-2 p-4">
              <p className="w-3/5 animate-pulse bg-gray-300 h-4"></p>
              <div className="size-[24px] rounded-full animate-pulse bg-gray-300"></div>
            </div>
            <div className="p-4 grid md:grid-cols-3">
              {Array(12)
                .fill(0)
                .map((el, index) => (
                  <div key={index} className="animate-pulse mb-4">
                    {" "}
                    <div className="pt-4 md:pt-0 px-4 md:bg-[#ffff] bg-[#fcfcff] flex gap-2 md:rounded md:overflow-hidden md:block">
                      <div className="flex-grow-[0.75] w-[100px] md:w-auto">
                        <div className="rounded-md bg-gray-300 md:mb-4 max-w-full max-h-40  h-40"></div>
                      </div>
                      <div className="pb-4">
                        <div className="h-4 bg-gray-300 rounded w-2/3 py-1 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-40"></div>
                      </div>
                    </div>
                    <div className="bg-gray-300 h-px w-full my-2"></div>
                  </div>
                ))}
              <div className="flex flex-col h-24"></div>
            </div>
          </div>
        )}
        {!apiLoad && (
          <div className="">
            <DialogHeader
              className="p-4 sticky z-10 bg-white flex justify-between items-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <h2 className="text-lg">{seller.name}</h2>
              <IoClose
                className="cursor-pointer"
                size={24}
                onClick={() => setSellerDialogOpen(!sellerDialogOpen)}
              ></IoClose>
            </DialogHeader>
            <DialogBody
              className="h-[80vh] overflow-y-scroll p-0 pb-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="md:p-4 pt-0 grid md:grid-cols-3 gap-8 text-black">
                {collections.map((collection: SellerCollection) => (
                  <div
                    className="flex md:flex-col gap-2 group"
                    key={collection.slug}
                  >
                    <Link href={`/product/${collection.slug}`}>
                      <div className="relative w-[100px] h-[165px] md:w-[178px] md:h-[200px] md:duration-300 md:group-hover:scale-110">
                        <Image
                          src={getImageUrl(
                            collection.images?.preview_500 ?? collection.image!
                          )}
                          alt={collection.name}
                          fill
                          objectFit="contain"
                        />
                      </div>
                      <div className="hidden md:flex md:h-12  items-center mt-2">
                        <span className="md:line-clamp-2">
                          {collection.name}
                        </span>
                      </div>
                    </Link>

                    <div className="md:flex md:flex-col md:gap-2">
                      <div className="flex md:hidden md:h-12  items-center mt-2">
                        <Link href={`/product/${collection.slug}`}>
                          <span className="md:line-clamp-2">
                            {collection.name}
                          </span>
                        </Link>
                      </div>
                      <div className="flex font-medium gap-1 items-center mt-2 md:mt-auto">
                        <span className=" text-[#1A1C1E] md:duration-300 md:group-hover:scale-110">
                          ₹{collection.selling_price}
                        </span>
                        {collection.max_price &&
                          collection.selling_price! < collection?.max_price && (
                            <span className="text-sm line-through">
                              ₹{collection.max_price}
                            </span>
                          )}
                        {collection.max_price &&
                          collection.selling_price! < collection?.max_price &&
                          collection.discount! > 3 && (
                            <span className="text-sm text-[#904D00]">
                              -{collection.discount}%
                            </span>
                          )}
                      </div>
                      {updatingCollectionVariantId &&
                      updatingCollectionVariantId == collection.variant?.id ? (
                        <Button
                          className="bg-[#F3F3F6] mt-4 md:mt-auto text-[#6a4fa3] w-[180px]  active:opacity-[1] focus:opacity-[1] rounded-full shadow-[0_1px_3px_1px_#00000026,0_1px_2px_#0000004d]"
                          placeholder=""
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          onClick={() => setSellerDialogOpen(!sellerDialogOpen)}
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
                            "Go to cart"
                          )}
                        </Button>
                      ) : (
                        <Button
                          className="bg-[#F3F3F6] mt-4 md:mt-auto text-[#6a4fa3] w-[180px]  active:opacity-[1] focus:opacity-[1] rounded-full shadow-[0_1px_3px_1px_#00000026,0_1px_2px_#0000004d]"
                          placeholder=""
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          onClick={() => addTocart(collection)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DialogBody>
          </div>
        )}
      </Dialog>
      <div className="hidden md:block">
        <Snackbar
          action={SnackbarAction}
          isOpen={openSnackbar}
          onClose={() => setOpenSnackbar(!openSnackbar)}
        />
      </div>
    </>
  );
};

export default SellerCollectionDialog;

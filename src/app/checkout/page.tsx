"use client";
import StepProgress from "@/src/components/step_progress";
import React, { useEffect, useState } from "react";
import AddressForm from "./components/address_form";
import CartItem from "./components/cart_item";
import AddressList from "./components/address_list";
import PriceSummary from "./components/price_summary";
import PaymentAndShippingInfo from "./components/payment_and_shipping_info";
import { useCart } from "@/src/providers/cart_context";
import { CheckoutModel, Line } from "@/src/providers/models/checkout_model";
import { Drawer as DrawerMT, Dialog as DialogMT, Divider } from "@mui/material";
import {
  fetchCheckoutDetails,
  getStateList,
  updateCheckout,
} from "@/src/providers/api_provider";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";
import ZenPlan from "./components/zen_plan";
import { useRouter } from "next/navigation";
import LoginMain from "@/src/components/login";
import SellerCollectionDialog from "./components/seller_collection_dialog";
import Address from "./components/address";
import CustomizeDialog from "./components/customize_dialog";
import CartItemList from "./components/cart_item_list";

let timeoutId: NodeJS.Timeout | null = null;

function debounce(callback: () => void, delay: number) {
  return function () {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, delay);
  };
}

function Checkout ({
                     searchParams,
                  }: {
  searchParams: { token: string };
}) {
  const {
    currentStep,
    cartItemCount,
    editAddress,
    addNewAddress,
    selectedPayment,
    selectedAddress,
    checkout,
    hasAddress,
    stateLists,
    success,
    isLoggedIn,
    setSelectedAddress,
    setCurrentStep,
    setHasAddress,
    setCheckout,
    setStateLists,
    setEditAddress,
    setAddNewAddress,
    setCustomizableProd,
    setCartItemCount,
    clearCart,
  } = useCart();

  const [openAddressBMSheet, setAddressBMSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAPILoad, setIsAPILoad] = useState<boolean>(false);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [sellerCompany, setSellerCompany] = useState<{
    name: string;
    slug: string;
  }>({ name: "", slug: "" });
  const [sellerDialogOpen, setSellerDilogOpen] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [planSelect, setPlanSelect] = useState("");
  const [deliverablePin, setDeliverablePin] = useState(false);
  const [finalAmountToPay, setFinalAmountToPay] = useState(0);
  const [zenClubCheckboxSelected, setZenClubCheckboxSelected] = useState(false);

  const router = useRouter();

  const getCheckoutData = debounce(() => {
    getCheckout(setCheckout);
  }, 500);

  function getCheckout(setCheckout: (checkout: CheckoutModel) => void) {
    fetchCheckoutDetails().then((response) => {
      if (response.status) {
        setCheckout(response.data!);

        setIsAPILoad(false);
      }
    });
  }

  useEffect(() => {
    if(searchParams?.token?.length > 0){
      if(LocalStorageProvider.getCheckout() == null) {
        LocalStorageProvider.setCheckout(searchParams.token);
      }
    }
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    if (LocalStorageProvider.isLoggedIn() && currentStep == 1) {
      setCurrentStep(2);
      getCheckoutData();
    }
    if (
      LocalStorageProvider.isLoggedIn() &&
      checkout?.shipping_address == null
    ) {
      setCurrentStep(2);
    }
    if (checkout == null) {
      setIsAPILoad(true);
      getCheckoutData();
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let list: { name: string; slug: string }[] = [];
    let customizableProd: Line[] = [];
    checkout?.lines?.forEach((line) => {
      if (
        list.findIndex(
          (seller) => seller.slug === line.stock_data?.company_slug
        ) == -1
      ) {
        list.push({
          name: line.stock_data?.company_name ?? "",
          slug: line.stock_data?.company_slug ?? "",
        });
      }
      if (line?.product_data?.is_customizable) {
        customizableProd.push(line);
      }
    });
    setSellers(list);
    setCustomizableProd(customizableProd);
    if (checkout != null) {
      if (LocalStorageProvider.isLoggedIn() && checkout.user == null) {
        setIsAPILoad(true);
        updateCheckout({ token: checkout?.token } as CheckoutModel).then(
          (response) => {
            if (response.status) {
              setCheckout(response.data!);
              setIsAPILoad(false);
            }
          }
        );
      }
    }
  }, [checkout, isLoggedIn]);

  useEffect(() => {
    const processCheckoutData = () => {
      if (checkout?.plan) {
        setIsPlan(true);
        setPlanSelect(checkout.plan.toString());
      } else {
        setIsPlan(false);
        if (checkout?.zen_club_plans?.length) {
          setPlanSelect(checkout.zen_club_plans[0].id.toString());
        }
      }

      if (checkout?.shipping_address?.id) {
        setHasAddress(true);
      }
    };

    if (currentStep == 2) {
      const fetchStateList = async () => {
        try {
          const data = await getStateList();
          setStateLists(data.data?.results || []);
        } catch (error) {
          console.error("Failed to fetch state list:", error);
        }
      };
      fetchStateList();
    }

    if (currentStep === 2 && checkout == null) {
      getCheckoutData();
      processCheckoutData();
    }
  }, [currentStep]);

  return (
    <main
      className={`${
        currentStep === 1 ? "max-w-3xl" : "max-w-6xl"
      } px-4 md:px-0 mx-auto pb-4`}
    >
      <StepProgress currentStep={currentStep} />

      {(currentStep === 1 || !isLoggedIn) && (
        <div className="flex md:px-4 flex-col-reverse md:grid md:grid-cols-2 gap-5 md:gap-2 mt-4">
          <LoginMain page="cartLogin" />
          <div className="gap-1 md:gap-2 overflow-auto flex md:flex-col max-h-[500px]">
            {checkout?.lines?.map((line, index) => (
              <CartItem line={line} key={line.id} />
            ))}
          </div>
        </div>
      )}
      {currentStep != 1 &&
        isLoggedIn &&
        (isAPILoad ? (
          <div className="px-4 mt-4 md:grid md:grid-cols-3 gap-2">
            <div className="bg-gray-300 animate-pulse h-[60vh] rounded-md"></div>
            <div className="bg-gray-300 animate-pulse h-[60vh] rounded-md"></div>
            <div className="bg-gray-300 animate-pulse h-[60vh] rounded-md"></div>
          </div>
        ) : (
          <>
            {/* Mobile */}
            {isMobile && (
              <div className="md:hidden">
                {(!hasAddress || editAddress || addNewAddress) && isMobile && (
                  <DialogMT
                    fullScreen
                    fullWidth
                    open={!hasAddress || editAddress || addNewAddress}
                    className="md:hidden"
                  >
                    <div className="flex flex-col size-full">
                      <p className="p-4 border-b ">
                        <MdOutlineArrowBack
                          color="black"
                          fontWeight={700}
                          size={24}
                          onClick={() => {
                            setEditAddress(false);
                            setAddNewAddress(false);
                            if (!hasAddress) {
                              history.back();
                            }
                          }}
                        />
                      </p>
                      <AddressForm
                        showAddress={() => {
                          setEditAddress(false);
                          setAddNewAddress(false);
                        }}
                      />
                    </div>
                  </DialogMT>
                )}
                {hasAddress && currentStep != 3 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col ">
                      <div className="flex items-start mt-1 p-1">
                        <IoLocationOutline size={24} />
                        {selectedAddress && (
                          <Address address={selectedAddress} />
                        )}
                        <button
                          className="rounded-full text-[#6A4FA3]"
                          onClick={() => setAddressBMSheet(true)}
                        >
                          Change
                        </button>
                      </div>
                      <div className="max-md:max-w-full max-sm:hidden max-sm:w-full bg-[#F0F0F4]  gap-0">
                        <Divider
                          flexItem={true}
                          sx={{ borderBottomWidth: 0.5 }}
                        />
                      </div>
                    </div>
                    <ZenPlan
                      isPlan
                      checkoutDetails={checkout ?? null}
                      onPlanChange={() => {}}
                      planSelect={planSelect}
                    />
                    {sellers.map((seller, index) => (
                      <CartItemList
                        key={`${seller.slug}${index}mobile`}
                        seller={seller}
                        device="mobile"
                        setSellerCompany={() => setSellerCompany(seller)}
                        setSellerDialogOpen={() =>
                          setSellerDilogOpen(!sellerDialogOpen)
                        }
                        sellerDialogOpen
                        checkout={checkout}
                        currentStep={currentStep}
                      />
                    ))}
                    <div className="gap-1 md:gap-4 flex md:flex-col">
                      <PriceSummary
                        key={`mobile${currentStep}`}
                        showPaymentOption={() => {
                          setCurrentStep(3);
                        }}
                      />
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="flex flex-col mt-2">
                    <ZenPlan
                      isPlan
                      checkoutDetails={checkout ?? null}
                      onPlanChange={() => {}}
                      planSelect={planSelect}
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="uppercase">Your orders</h2>
                      {sellers.map((seller, index) => (
                        <CartItemList
                          key={`${seller.slug}${index}mobile`}
                          seller={seller}
                          device="mobile"
                          setSellerCompany={() => setSellerCompany(seller)}
                          setSellerDialogOpen={() =>
                            setSellerDilogOpen(!sellerDialogOpen)
                          }
                          sellerDialogOpen
                          checkout={checkout}
                          currentStep={currentStep}
                        />
                      ))}
                      <PaymentAndShippingInfo
                        handleChangeAddress={() => {
                          setAddressBMSheet(true);
                          setCurrentStep(2);
                        }}
                      />{" "}
                      <PriceSummary key={`mobile${currentStep}`} />
                    </div>
                  </div>
                )}
                <DrawerMT
                  open={openAddressBMSheet}
                  anchor="bottom"
                  PaperProps={{ square: false }}
                  className="rounded-lg !h-fit"
                  onClose={() => setAddressBMSheet(!openAddressBMSheet)}
                >
                  <div className="flex flex-col w-full">
                    <p className="mx-8 uppercase text-sm font-medium py-4">
                      Address Selection
                    </p>
                    <hr className="mb-2 h-1"></hr>
                    <AddressList onDone={setAddressBMSheet} />
                  </div>
                </DrawerMT>
              </div>
            )}
            {/* Desktop */}
            <div className="hidden px-4 flex-col-reverse md:grid md:grid-cols-3 gap-2 md:gap-2 mt-4">
              <div className="gap-1 md:gap-1 flex md:flex-col">
                <ZenPlan
                  isPlan
                  checkoutDetails={checkout ?? null}
                  onPlanChange={() => {}}
                  planSelect={planSelect}
                />
                {sellers.map((seller, index) => (
                  <CartItemList
                    key={`${seller.slug}${index}desktop`}
                    seller={seller}
                    device="desktop"
                    setSellerCompany={() => setSellerCompany(seller)}
                    setSellerDialogOpen={() =>
                      setSellerDilogOpen(!sellerDialogOpen)
                    }
                    sellerDialogOpen
                    checkout={checkout}
                    currentStep={currentStep}
                  />
                ))}
              </div>
              <div className="gap-1 md:gap-4 rounded-lg shadow-[0_1px_3px_#0000004d,0_4px_8px_3px_#00000026] flex md:flex-col bg-[#f9f9fc] h-fit">
                {currentStep === 2 && (
                  <>
                    <div className="bg-[#eaddff] py-5 px-4 rounded-t-lg ">
                      {!selectedAddress ? (
                        <div className="text-sm font-medium text-[#2f1500] uppercase">
                          Contact details
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <IoLocationOutline size={24} />
                          {selectedAddress && (
                            <Address
                              address={selectedAddress}
                              showPhone={false}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    {hasAddress && !editAddress && !addNewAddress && (
                      <AddressList />
                    )}
                    {(!hasAddress || editAddress || addNewAddress) && (
                      <AddressForm
                        showAddress={() => {
                          setEditAddress(false);
                          setAddNewAddress(false);
                        }}
                      />
                    )}
                  </>
                )}
                {currentStep === 3 && <PaymentAndShippingInfo />}
              </div>
              <div className="gap-1 md:gap-4 bg-[#f9f9fc] rounded-lg shadow-[0_1px_3px_#0000004d,0_4px_8px_3px_#00000026] flex md:flex-col h-fit">
                <PriceSummary
                  key={`desktop${currentStep}`}
                  showPaymentOption={() => {
                    setCurrentStep(3);
                  }}
                />
              </div>
            </div>
            <CustomizeDialog />
            <SellerCollectionDialog
              seller={sellerCompany}
              sellerDialogOpen={sellerDialogOpen}
              setSellerDialogOpen={setSellerDilogOpen}
            />
          </>
        ))}
    </main>
  );
};

export default Checkout;

type Seller = {
  name: string;
  slug: string;
};

"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  AddressModel,
  CheckoutModel,
  Line,
  ProductData,
} from "./models/checkout_model";
import {
  editUserDetails,
  fetchAddressList,
  fetchCheckoutDetails,
  fetchUserDetails,
} from "@/src/providers/api_provider";
import { State } from "./models/states";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";
import { debounce } from "@mui/material";
import { UserDetail } from "./models/user_detail_model";

interface CartContextType {
  cartItemCount: number;
  currentStep: number;
  selectedAddress: AddressModel | null;
  hasAddress: boolean;
  paymentSuccess: boolean;
  checkout: CheckoutModel | null;
  addressList: AddressModel[] | null;
  stateLists: State[] | [];
  editAddress: boolean;
  addNewAddress: boolean;
  customizableprod: Line[];
  showCustomizeDialog: boolean;
  customizeCheckout: CheckoutModel | null;
  userDetail: UserDetail | null;
  setCustomizeCheckout: (customizeCheckout: CheckoutModel) => void;
  setShowCustomizeDialog: (showCustomizeDialog: boolean) => void;
  setCustomizableProd: (customizableprod: Line[]) => void;
  setAddressList: (addressList: AddressModel[]) => void;
  handleAddressEdit: (address: AddressModel) => void;
  setCurrentStep: (step: number) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  isLoadingCheckout: boolean;
  setSelectedAddress: (address: AddressModel | null) => void;
  setHasAddress: (hasAddress: boolean) => void;
  setCartItemCount: (cartItemCount: number) => void;
  setPaymentSuccess: (paymentSuccess: boolean) => void;
  setCheckout: (checkout: CheckoutModel | null) => void;
  addToCart: (checkout: CheckoutModel, itemsCount: number) => void;
  setStateLists: (stateLists: State[]) => void;
  setEditAddress: (editAddress: boolean) => void;
  setAddNewAddress: (editAddress: boolean) => void;
  getAddressList: () => void;
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  success: orderSuccess;
  setOrderSuccess: (success: orderSuccess) => void;
  clearCart: () => void;
  setUserDetail: (userDetail: UserDetail) => void;
}

//const hasAddress: Boolean = true;
const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

{
  /*orderSuccess */
}
interface orderSuccess {
  commission_earned: number | undefined;
  plan: number | undefined | null;
  can_upgrade: boolean | null | undefined;
  user_name: string | null | undefined;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<AddressModel | null>(
    null
  );
  const [hasAddress, setHasAddress] = useState<boolean>(true);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [checkout, setCheckout] = useState<CheckoutModel | null>(null);
  const [customizableprod, setCustomizableProd] = useState<Line[]>([]);
  const [addressList, setAddressList] = useState<AddressModel[] | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [stateLists, setStateLists] = useState<State[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [showCustomizeDialog, setShowCustomizeDialog] = useState(false);
  const [customizeCheckout, setCustomizeCheckout] =
    useState<CheckoutModel | null>(null);

  {
    /*orderSuccess */
  }
  const [success, setOrderSuccess] = useState<orderSuccess>({
    commission_earned: undefined,
    plan: null,
    can_upgrade: null,
    user_name: null,
  });

  const handleAddressEdit: (address: AddressModel) => void = (address) => {
    setSelectedAddress(address);
    setEditAddress(true);
  };

  const getCheckout = debounce(async () => {
    setIsLoadingCheckout(true);
    const response = await fetchCheckoutDetails();
    if (response.status) {
      setCheckout(response.data!);
    }
    setIsLoadingCheckout(false);
  }, 100);

  useEffect(() => {
    getCheckout();
    setIsLoggedIn(LocalStorageProvider.isLoggedIn());
    const getAddressList = async () => {
      if (LocalStorageProvider.isLoggedIn()) {
        const response = await fetchAddressList();
        if (response.status) {
          setAddressList(response.data!.results);
          if (response.data!.results.length > 0) {
            setSelectedAddress(
              response.data!.results?.find((address) => address.is_default) ??
                response.data!.results[0]
            );
            setHasAddress(true);

            {
              /*  get and set user details */
            }
            const userDetails = await fetchUserDetails();
            if (userDetails.data && userDetails.data.id) {
                let patchUserDetailRes;
                if(userDetails.data.first_name == null){

                    const patcDetails = {...userDetails?.data, first_name:response?.data?.results[0]?.name ?? null}
                     patchUserDetailRes = await editUserDetails(patcDetails);
                }
                setUserDetail(patchUserDetailRes?.data ?? userDetails.data);

            }
          } else {
            setHasAddress(false);
          }
        }
      }
    };
    getAddressList();
  }, []);

  const getAddressList = async () => {
    const response = await fetchAddressList();
    if (response.status) {
      setAddressList(response.data!.results);
      if (response.data!.results.length > 0) {
        setSelectedAddress(
          response.data!.results?.find((address) => address.is_default) ??
            response.data!.results[0]
        );
        setHasAddress(true);
      } else {
        setHasAddress(false);
      }
    }
  };

  useEffect(() => {
    setCartItemCount(checkout?.lines?.length ?? 0);
    if (
      checkout?.user_mobile != null &&
      LocalStorageProvider.getUserMobile() == null
    ) {
      LocalStorageProvider.setUserMobile(checkout?.user_mobile);
    }
  }, [checkout]);

  const addToCart: (checkout: CheckoutModel, itemsCount: number) => void = (
    checkout,
    itemsCount
  ) => {
    setCheckout(checkout);
    setCartItemCount(itemsCount);
  };

  const clearCart = () => {
    LocalStorageProvider.deleteCheckout();
    setCheckout(null);
    setCurrentStep(1);
  };

  return (
    <CartContext.Provider
      value={{
        currentStep,
        selectedAddress,
        hasAddress,
        paymentSuccess,
        cartItemCount,
        checkout,
        addressList,
        stateLists,
        editAddress,
        addNewAddress,
        customizableprod,
        showCustomizeDialog,
        customizeCheckout,
        userDetail,
        isLoadingCheckout,
        isLoggedIn,
        selectedPayment,
        success,
        setCustomizeCheckout,
        setShowCustomizeDialog,
        setCustomizableProd,
        setAddressList,
        handleAddressEdit,
        setCurrentStep,
        addToCart,
        setSelectedAddress,
        setHasAddress,
        setPaymentSuccess,
        setCartItemCount,
        setCheckout,
        setStateLists,
        setEditAddress,
        setAddNewAddress,
        getAddressList,
        setIsLoggedIn,
        setSelectedPayment,
        setOrderSuccess,
        clearCart,
        setUserDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

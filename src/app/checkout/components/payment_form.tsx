import { Radio } from "@material-tailwind/react";
import { useState } from "react";
import {useCart} from "@/src/providers/cart_context";
import { useSiteData } from "@/src/providers/site_data_context";

const PaymentForm = () => {
    const {selectedPayment, setSelectedPayment, checkout} = useCart();

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value);
  };
  const {isMicroSite} = useSiteData();

  return (
    <form className="">
      <Radio
        id="upi"
        name="payment"
        color="indigo"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        label={<span className="text-black text-sm">UPI</span>}
        checked={selectedPayment === "upi"}
        onChange={() => handlePaymentChange("upi")}
        crossOrigin=""
      />

      <Radio
        id="debitCreditCard"
        name="payment"
        color="indigo"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        label={<span className="text-black text-sm">Debit/Credit Card</span>}
        checked={selectedPayment === "debitCreditCard"}
        onChange={() => handlePaymentChange("debitCreditCard")}
        crossOrigin=""
      />

      <Radio
        id="netBanking"
        name="payment"
        color="indigo"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        label={<span className="text-black text-sm">Net Banking</span>}
        checked={selectedPayment === "netBanking"}
        onChange={() => handlePaymentChange("netBanking")}
        crossOrigin=""
      />
      {!isMicroSite && (
         <div className="bg-[#F0F0F4] border border-t-[#C3C6CF] border-b-[#C3C6CF] py-2">
         <Radio
           id="cod"
           name="payment"
           color="indigo"
           onPointerEnterCapture={undefined}
           onPointerLeaveCapture={undefined}
           label={
             <span className="text-black text-sm">
               Cash on Delivery (Pay with cash or UPI)
             </span>
           }
           checked={selectedPayment === "cod"}
           onChange={() => handlePaymentChange("cod")}
           crossOrigin=""
         />
           {/*show error message*/}
           { (selectedPayment === "cod" && !checkout?.lines?.every(r => r.is_cod_accepted)) && <p className="text-red-500 md:pl-4 md:text-[14px] text-[12px] px-4">Some items in your cart are not available for COD</p>}
       </div>
      )}
     
    </form>
  );
};

export default PaymentForm;

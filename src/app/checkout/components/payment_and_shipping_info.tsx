import Button from "@material-tailwind/react/components/Button";
import PaymentForm from "./payment_form";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { useCart } from "@/src/providers/cart_context";
import Address from "./address";

type IconProps = {
  open: boolean;
};
type PaymentAndShippingInfoProps = {
  handleChangeAddress?: () => void;
};

function Icon({ open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function PaymentAndShippingInfo({
  handleChangeAddress,
}: PaymentAndShippingInfoProps) {
  const { selectedAddress, setCurrentStep } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg px-2 py-3 bg-[#f9f9fc] text-[#1a1c1e]  md:px-4 shadow-[0_1px_3px_#0000004d,0_4px_8px_3px_#00000026] flex flex-col">
      <h3 className="uppercase text-sm font-medium">Choose Payment Type</h3>
      <PaymentForm />
      <hr className="h-1 mt-4 mb-3"></hr>
      <div className="px-2">
        <div className="flex justify-between items-center mb-3">
          <span>Shipping address</span>
          <button
            className="text-[#6a4fa3] md:hidden"
            onClick={handleChangeAddress}
          >
            Change Address
          </button>
          <button
            className="text-[#6a4fa3] hidden md:block"
            onClick={() => setCurrentStep(2)}
          >
            Change Address
          </button>
        </div>
      </div>
      <div className="px-2">
        {selectedAddress && <Address address={selectedAddress} />}
      </div>
      <hr className="h-1 mt-4 mb-3"></hr>
      <Accordion
        open={open}
        placeholder=""
        className="mb-2 rounded-lg bg-white border-blue-gray-100 px-4 shadow-md"
        icon={<Icon open={open} />}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <AccordionHeader
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => setOpen(!open)}
          placeholder=""
          className="border-b-0 h-11"
        >
          <p className="text-[#000000de] text-sm font-medium">
            {" "}
            What is the return/refund policy?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="mb-4">
            You can return the product only if you have received a wrong or
            damaged product. Please note that we accept claims for returns with
            an unboxing video proof.
          </p>
          <p className="mb-4">
            You are strongly advised to take a video while unboxing the product
            you have received. Without an unboxing video, returns won&apos;t be
            accepted.
          </p>
          <p className="mb-4">
            If you have received a wrong or damaged product, the seller will try
            to replace it within a stipulated time. In case the seller cannot
            replace the product the amount will be refunded to you.
          </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

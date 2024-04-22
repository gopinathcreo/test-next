import { CheckoutModel } from "@/src/providers/models/checkout_model";
import { Button } from "@material-tailwind/react";
import CartItem from "./cart_item";

const CartItemList: React.FC<CartItemListProps> = ({
  seller,
  device,
  setSellerCompany,
  setSellerDialogOpen,
  sellerDialogOpen,
  checkout,
  currentStep,
}) => {
  const company = checkout?.lines?.filter(
    (line) => line.stock_data?.company_slug === seller.slug
  );

  return (
    <div className="rounded-lg px-2 bg-[#fcfcfc] md:px-4 shadow-[0_1px_3px_#0000004d,0_4px_8px_3px_#00000026] flex flex-col">
      <p className="py-3">Seller : {seller.name}</p>
      <div className="gap-1 md:gap-4 overflow-auto flex flex-col border-y border-y-[#c3c6cf] py-2 md:py-0">
        {company ? (
          company?.map((line, index) => (
            <CartItem line={line} key={`${line.id}${device}`} />
          ))
        ) : (
          <div className="animate-pulse bg-gray-300 h-40"></div> // This is your fallback content
        )}
      </div>
      {company && (
        <>
          {company[0]?.is_deliverable === false && currentStep === 3 && (
            <span className="text-red-500 md:text-[14px] text-[13px] mt-4">
              This product is not deliverable to your PIN code.
            </span>
          )}
          {(company[0]?.shipping_charge ?? 0) > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              <p className="pr-2">
                Shipping Charges : <span>₹{company[0]?.shipping_charge}</span>
              </p>
              <p className="text-xs text-[#43474e]">
                Free shipping above minimum Order value of{" "}
                {company[0].warehouse?.minimum_order_value} from this Seller
                Avoid shipping charges by adding products from this seller
              </p>
            </div>
          )}
        </>
      )}
      <div className="flex justify-between py-3 items-center">
        <p>Seller : {seller.name}</p>
        <Button
          variant="outlined"
          size="sm"
          className="rounded-full text-[#6a4fa3] flex-shrink-0 h-fit"
          onClick={() => {
            console.log("click");

            setSellerCompany();
            setSellerDialogOpen();
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add More
        </Button>
      </div>
    </div>
  );
};

type Seller = {
  name: string;
  slug: string;
};

interface CartItemListProps {
  seller: Seller;
  device: string;
  setSellerCompany: () => void;
  setSellerDialogOpen: () => void;
  sellerDialogOpen: boolean;
  checkout: CheckoutModel | null;
  currentStep: number;
}

export default CartItemList;

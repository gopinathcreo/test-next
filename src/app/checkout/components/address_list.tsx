import { useCart } from "@/src/providers/cart_context";
import { Button, Radio } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AddressModel } from "@/src/providers/models/checkout_model";
import Address from "./address";

// Example type for form values
type FormValues = {
  selectedAddress: number | null; // or Address depending on what you want to submit
};

type AddressFormProps = {
  onDone?: (open: boolean) => void;
};

const AddressList: React.FC<AddressFormProps> = ({ onDone }) => {
  const {
    handleAddressEdit,
    setSelectedAddress,
    selectedAddress,
    addressList,
    setAddNewAddress,
  } = useCart();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      selectedAddress:
        addressList?.find((addr) => addr.is_default)?.id ||
        (addressList?.length ?? 0) > 0
          ? addressList![0].id
          : null,
    },
  });

  const handleSelectAddress = (address: AddressModel) => {
    setSelectedAddress(address);
  };

  const addressEdit = (address: AddressModel) => {
    handleAddressEdit(address);
  };

  return (
    <form className="px-3">
      <Controller
        control={control}
        name="selectedAddress"
        render={({ field }) => (
          <div className="flex flex-col">
            <div className="flex flex-col max-h-[312px] overflow-y-auto">
              {addressList?.map((address, index) => (
                <div key={address.id}>
                  <label className="flex items-start ">
                    <Radio
                      color="indigo"
                      name={field.name}
                      value={address.id} // Use address.id as the value if you have unique IDs
                      checked={selectedAddress?.id === address.id}
                      onChange={() => handleSelectAddress(address)} // Use field.onChange to update the form control
                      className="radio radio-primary"
                      crossOrigin=""
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    <div className="md:w-max overflow-hidden">
                    <Address
                      address={address}
                      handleSelectAddress={() => handleSelectAddress(address)}
                    />
                    </div>
                    <button
                      type="button"
                      onClick={() => addressEdit(address)}
                      className="ml-auto mr-2"
                    >
                      <MdOutlineModeEditOutline size={24} />
                    </button>
                  </label>
                  <hr className="my-2 h-1 md:mx-5" />
                </div>
              ))}
            </div>

            <Button
              variant="text"
              className="hidden md:block mx-5 my-4 text-[#6A4FA3] rounded-full shadow-[0_1px_3px_1px_#00000026,0_1px_2px_#0000004d]"
              placeholder=""
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => setAddNewAddress(true)}
            >
              Add new address
            </Button>
            <div className="md:hidden flex justify-between mt-2 mb-4">
              <Button
                variant="outlined"
                className="text-[#6A4FA3] rounded-full"
                placeholder=""
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => setAddNewAddress(true)}
              >
                Add address
              </Button>
              <Button
                className="bg-[#6A4FA3] text-white rounded-full md:px-16 px-14"
                placeholder=""
                onClick={() => onDone?.(!open)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default AddressList;

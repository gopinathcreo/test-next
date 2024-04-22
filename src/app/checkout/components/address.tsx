import { AddressModel } from "@/src/providers/models/checkout_model";
import React from "react";

interface AddressProps {
  address: AddressModel;
  showPhone?: boolean;
  handleSelectAddress?: (address: AddressModel) => void;
}

const Address: React.FC<AddressProps> = ({
  address,
  handleSelectAddress,
  showPhone = true,
}) => {
  return (
    <div
      className="flex flex-col flex-grow  text-xs text-[#1a1c1e] pl-1 w-[200px] overflow-hidden "
      onClick={() => handleSelectAddress && handleSelectAddress(address)}
    >
      <div>
        <span className="text-[#2f1500] text-s font-medium uppercase">
          {address.name}
        </span>{" "}
        {address.is_default && "(Default)"}
      </div>
      <div>
        <span className="text-s overflow-hidden">
        {address.building_name}
        {", "}
        {address.locality}
        {", "}
        {address.city}
        {", "} {address.state}
        {", "}
        {address.pin}
        </span>
      </div>
      {showPhone === true && <div className="text-s">Phone Number: {address.mobile}</div>}
    </div>
  );
};

export default Address;

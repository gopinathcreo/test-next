import {
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ThemeProvider } from "@material-tailwind/react";
import { useCart } from "@/src/providers/cart_context";
import Script from "next/script";
import { State } from "@/src/providers/models/states";
import {
  addEditAddress,
  editUserDetails,
  fetchAddressList,
  fetchUserDetails,
} from "@/src/providers/api_provider";
import { Karantina } from "next/font/google";
import { AddressModel } from "@/src/providers/models/checkout_model";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional(),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits"),
  pin: z.string().min(6, "PIN must be 6 digits").max(6, "PIN must be 6 digits"),
  building_name: z.string().min(1, "Address is required"),
  locality: z.string().min(1, "Locality is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  is_default: z.boolean(),
});

type ContactFormProps = {
  showAddress: () => void;
};

const AddressForm: React.FC<ContactFormProps> = ({ showAddress }) => {
  const {
    selectedAddress: address,
    stateLists,
    setEditAddress,
    setAddNewAddress,
    getAddressList,
    addNewAddress,
    addressList,
    userDetail,
    setUserDetail,
  } = useCart();

  const inputTheme = {
    input: {
      styles: {
        variants: {
          outlined: {
            base: {
              inputWithIcon: {
                pl: "!pl-9",
              },
              icon: {
                top: "top-2/4",
                right: "left-3",
                transform: "-translate-y-2/4",
              },
              label: {
                position: "-top-1.5 left-5",
                fontSize: "peer-placeholder-shown:text-sm",
                floated: {
                  fontSize:
                    "text-[11px] peer-focus:text-[11px] peer-focus:left-0 peer-[.filled]:left-0",
                },
              },
            },
          },
        },
      },
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: !addNewAddress
      ? ({
          name: address?.name || "",
          mobile: address?.mobile || "",
          pin: address?.pin || "",
          building_name: address?.building_name || "",
          locality: address?.locality || "",
          city: address?.city || "",
          state: address?.state || "",
          is_default: address?.is_default || false,
        } as AddressModel)
      : ({
          name: "",
          mobile: "",
          pin: "",
          building_name: "",
          locality: "",
          city: "",
          state: "",
          is_default: false,
        } as AddressModel),
  });

  const [mobileInputFilled, setMobileInputFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(addNewAddress ? "" : address?.state);

  useEffect(() => {
    if (LocalStorageProvider.getUserMobile() != null) {
      setValue(
        "mobile",
        LocalStorageProvider.getUserMobile()!.replace("+91", "")
      );
      setMobileInputFilled(true);
    }
    initAutocomplete();
  }, []);

  useEffect(() => {
    if (address && !addNewAddress) {
      setValue("name", address?.name);
      setValue("mobile", address.mobile.replace("+91", ""));
      setValue("pin", address.pin);
      setValue("building_name", address.building_name);
      setValue("locality", address.locality);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("is_default", address.is_default);
      setValue("email", address.email);
      setMobileInputFilled(!!address.mobile);
    }
    if (addNewAddress) {
      const mobile = LocalStorageProvider.getUserMobile();
      if (mobile) setValue("mobile", mobile.replace("+91", ""));
    }
  }, [address, addNewAddress]);

  const onSubmit = async (data: AddressModel) => {
    const postData = { ...data, mobile: "+91" + data.mobile };
    setIsSubmitting(true);
    const id = addNewAddress ? undefined : address?.id;
    const res = await addEditAddress(postData, id);
    if (res.data) {
      getAddressList();
      setEditAddress(false);
      setAddNewAddress(false);
    }
    if (postData.email?.length > 0 && userDetail) {
      const patchUserDetails = {
        ...userDetail,
        first_name: addressList != null ? addressList[0]?.name : postData.name,
        email: postData.email,
      };
      const patchUserDetailRes = await editUserDetails(patchUserDetails);
      if (patchUserDetailRes.data && patchUserDetailRes.data.id) {
        setUserDetail(patchUserDetailRes.data);
      }
    }
  };

  const handleMobileInput = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setMobileInputFilled(!!value);
    register("mobile").onChange(event);
  };

  const inputContainerRef = useRef<HTMLInputElement>(null);

  const initAutocomplete = () => {
    // const autocomplete = new window.google.maps.places.Autocomplete(input);
    // @ts-ignore
    const autocomplete = new google.maps.places.Autocomplete(
      inputContainerRef.current,
      {
        types: ["(regions)"],
        componentRestrictions: {
          country: "in",
        },
      }
    );

    // @ts-ignore
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      if (place) {
        place?.address_components?.forEach((element: any) => {
          element?.types?.forEach((elementtype: any) => {
            if (elementtype == "postal_code") {
              setValue("pin", element.long_name, {
                shouldValidate: true,
              });
            }
            if (elementtype == "administrative_area_level_3") {
              setValue("city", element.long_name, {
                shouldValidate: true,
              });
            }
            if (elementtype == "administrative_area_level_1") {
              let state = stateLists?.find(
                (x: State) =>
                  x.name.trim().toLowerCase() ==
                  element.long_name.trim().toLowerCase()
              );
              console.log("state" + state);

              if (state) {
                //setState(state.name);
                setValue("state", state.name, {
                  shouldValidate: true,
                });
                // setValue("state_ref", state.id, {
                //   shouldValidate: true,
                // });
                // setValue("state_place_id", state.state_place_id, {
                //   shouldValidate: true,
                // });
              }
            }
          });
        });
      }
    });
  };

  return (
    <>
      <form
        className="flex flex-col space-y-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <Input
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin=""
            label="Name *"
            className="!text-base md:!text-sm"
            id="name"
            color="indigo"
            {...register("name", { required: true })}
            type="text"
            error={!!errors.name}
          />
          {userDetail?.email?.length == 0 && (
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin=""
              label="Email *"
              className="!text-base md:!text-sm"
              id="email"
              color="indigo"
              {...register("email", { required: true })}
              type="email"
              error={!!errors.email}
            />
          )}
          <ThemeProvider value={inputTheme}>
            <Input
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              label="Mobile Number *"
              crossOrigin=""
              id="mobile"
              icon={<span className="text-xs">+91</span>}
              {...register("mobile", { required: true })}
              onChange={handleMobileInput}
              className={
                mobileInputFilled
                  ? "filled !text-base md:!text-sm"
                  : "!text-base md:!text-sm"
              }
              type="text"
              error={!!errors.mobile}
            />
          </ThemeProvider>

          <Input
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            label="Pin code *"
            crossOrigin=""
            id="pin"
            className="!text-base md:!text-sm"
            color="indigo"
            {...register("pin", { required: true })}
            type="number"
            inputRef={inputContainerRef}
            error={!!errors.pin}
          />
          <Input
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            label="Address (House No, Building, Street, Area No) *"
            id="address"
            className="!text-base"
            crossOrigin=""
            color="indigo"
            {...register("building_name", { required: true })}
            type="text"
            error={!!errors.building_name}
          />
          <Input
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            label="Locality/Town *"
            crossOrigin=""
            id="locality"
            className="!text-base md:!text-sm"
            color="indigo"
            {...register("locality", { required: true })}
            type="text"
            error={!!errors.locality}
          />
          <Input
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            label="City/District *"
            crossOrigin=""
            id="city"
            className="!text-base md:!text-sm"
            color="indigo"
            {...register("city", { required: true })}
            type="text"
            error={!!errors.city}
          />

          <Select
            label="State *"
            id="state"
            className="!text-base md:!text-sm"
            color="indigo"
            {...register("state", { required: true })}
            value={getValues().state}
            onChange={(val) => setValue("state", val ?? "")}
            error={!!errors.state}
            placeholder
            onPointerEnterCapture
            onPointerLeaveCapture
          >
            {stateLists.map((state: State, index) => (
              <Option key={index} value={state.name}>
                {" "}
                {state.name}
              </Option>
            ))}
          </Select>

          {/* {errors.name && (
            <span className="text-red-500">This field is required.</span>
          )} */}
        </div>

        <div className="flex items-center">
          <Checkbox
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin=""
            defaultChecked={address?.is_default || false}
            id="is_default"
            {...register("is_default")}
            className="h-5 w-5 rounded-md checked:bg-[#6A4FA1]"
            label="Make this as my default address"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="hidden md:block rounded-full bg-[#6a4fa3] py-3 px-6 text-xs uppercase text-white"
        >
          Save Address
        </button>
        {addressList && addressList?.length >= 1 && (
          <Button
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="outlined"
            className="hidden md:block rounded-full text-[#6a4fa3]"
            placeholder=""
            onClick={showAddress}
          >
            Show all address
          </Button>
        )}
        <div className=" fixed bottom-0 left-0 flex md:hidden justify-center items-center w-full h-24 rounded-t-[25px] bg-[#FCFCFD] bg-opacity-20 shadow-inner">
          <Button
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            disabled={isSubmitting}
            type="submit"
            className="rounded-full bg-[#6a4fa3] h-fit w-[90%]"
            placeholder=""
          >
            Save Address
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;

import ImageUploadComponent from "@/src/components/custom_image_upload";
import { updateCheckout } from "@/src/providers/api_provider";
import { useCart } from "@/src/providers/cart_context";
import { CheckoutModel, Line } from "@/src/providers/models/checkout_model";
import { Button } from "@material-tailwind/react";
import { Dialog } from "@mui/material";
import { getImageUrl } from "@/src/utils/firebase_utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

interface CustomDialogProps {}

const CustomizeDialog = ({}: // showDialog,

CustomDialogProps) => {
  const {
    setShowCustomizeDialog,
    showCustomizeDialog,
    customizableprod,
    setCheckout,
    checkout,
    customizeCheckout,
    setCustomizeCheckout,
  } = useCart();
  const [customTexts, setCustomTexts] = useState<{ [key: number]: string }>({});
  const [customImages, setCustomImages] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [currentCustomprodIndex, setCurrentCustomprodIndex] =
    useState<number>(0);
  const [nextActive, setIsNextActive] = useState(false);

  useEffect(() => {
    customizableprod.map((line) => {
      if (line.custom_text) {
        if (line.product_data)
          customTexts[line.product_data.id] = line.custom_text;
        setIsNextActive(true);
      }
    });
  }, []);

  // useEffect(() => {
  //   // Code here will run after `customizeCheckout` has been updated
  //   console.log(customizeCheckout);
  // }, [customizeCheckout]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    prodId: number
  ) => {
    const target = event.target;
    if (target.value.length > 0) {
      setIsNextActive(true);
    }
    const newValue = event.target.value;
    setCustomTexts((prevCustomTexts) => ({
      ...prevCustomTexts,
      [prodId]: newValue,
    }));
  };

  const handleCustomizeDialog = () => {
    //(!showDialog);
    setShowCustomizeDialog(!showCustomizeDialog);
  };

  const customTextUpdate = async () => {
    let updatedCheckout: CheckoutModel = {};

    if (customizeCheckout) updatedCheckout = { ...customizeCheckout };
    else updatedCheckout = { ...checkout };

    if (updatedCheckout && updatedCheckout.lines) {
      const updatedLines = updatedCheckout.lines.map((line) => {
        const productId = line.product_data?.id;
        if (productId && customTexts.hasOwnProperty(productId)) {
          return {
            ...line,
            custom_text: customTexts[productId],
          };
        }
        return line;
      });
      const newCheckout = {
        ...updatedCheckout,
        lines: updatedLines,
      };
      return await updateCheckout(newCheckout);
    }
  };

  function checkoutupdate(image: string, product: Line) {
    //let updatedCheckout: CheckoutModel = {};
    console.log(checkout, customizeCheckout);
    let updatedCheckout = cloneDeep(
      currentCustomprodIndex === 0 ? checkout : customizeCheckout ?? checkout
    );
    // if (currentCustomprodIndex == 0) {
    //   updatedCheckout = { ...checkout };
    // } else {
    //   updatedCheckout = { ...customizeCheckout };
    // }

    if (updatedCheckout && updatedCheckout.lines) {
      const productIndex = updatedCheckout?.lines?.findIndex(
        (x: any) => x.id === product?.id
      );

      if (productIndex !== -1 && productIndex !== undefined) {
        console.log("updating product " + productIndex);

        const updatedProduct = {
          ...updatedCheckout.lines?.[productIndex],
        };

        // if (!updatedProduct.custom_images) {
        updatedProduct.custom_images = { paths: [] };
        // }
        if (image.length > 0) {
          updatedProduct.custom_images.paths.push(image);
          if (updatedProduct.id) {
            setCustomImages((prevCustomImages) => ({
              ...prevCustomImages,
              [+updatedProduct?.id!]: false,
            }));
          }
        } else {
          console.log(updatedProduct.id);

          if (updatedProduct.id) {
            setCustomImages((prevCustomImages) => ({
              ...prevCustomImages,
              [+updatedProduct?.id!]: true,
            }));
          }
        }

        updatedCheckout.lines[productIndex] = updatedProduct;
        setIsNextActive(true);
      }
    }
    console.log(updatedCheckout, customImages);
    setCustomizeCheckout(updatedCheckout!);
  }

  const handleDone = async () => {
    const newCheckout = await customTextUpdate();
    //await updateCheckout(customizeCheckout);
    setCheckout(newCheckout?.data ?? checkout);
    //setShowDialog(!showDialog);
    setShowCustomizeDialog(!showCustomizeDialog);
    console.log(customTexts);
  };

  return (
    <Dialog
      open={showCustomizeDialog}
      fullWidth
      maxWidth="md"
      onClose={handleCustomizeDialog}
    >
      <div className="p-4">
        <h3 className="font-medium text-sm text-[#2f1500] mb-2">
          Product Customisation - {currentCustomprodIndex + 1}/
          {customizableprod.length}
        </h3>
        {customizableprod.map((prod: Line, index: number) => {
          return (
            <div key={index}>
              {index == currentCustomprodIndex && (
                <>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="relative size-28">
                      <Image
                        src={getImageUrl(
                          prod.product_data?.images.preview ?? ""
                        )}
                        alt="product name"
                        fill
                        fetchPriority="high"
                        objectFit="contain"
                      />
                    </div>
                    <span className="">{prod.product_variant_data?.name}</span>
                  </div>
                  <div className="flex flex-col size-28 p-4 justify-center items-center rounded-lg border border-[#ccc]">
                    <ImageUploadComponent
                      key={prod.product_data?.id}
                      product={prod}
                      updateCheckout={checkoutupdate}
                    />
                  </div>
                  <input
                    className="focus:outline-none rounded-md shadow-md border border-[#ccc] w-full my-2 p-2"
                    placeholder="Enter custom text"
                    value={customTexts[prod.product_data?.id ?? 0] || ""}
                    onChange={(e) =>
                      handleInputChange(e, prod.product_data?.id ?? 0)
                    }
                  />
                  <div className="flex justify-between">
                    {index > 0 && (
                      <Button
                        className="text-[#6A4FA1] rounded-full border-[#73777f]"
                        variant="outlined"
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        onClick={() =>
                          setCurrentCustomprodIndex(currentCustomprodIndex - 1)
                        }
                      >
                        Back
                      </Button>
                    )}
                    <div className="flex-grow"></div>
                    {index < customizableprod.length - 1 && (
                      <Button
                        className="text-[#6A4FA1] rounded-full border-[#73777f] self-end"
                        variant="outlined"
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        disabled={!nextActive}
                        onClick={() =>
                          setCurrentCustomprodIndex(currentCustomprodIndex + 1)
                        }
                      >
                        Next
                      </Button>
                    )}
                    {index == customizableprod.length - 1 && (
                      <Button
                        className="bg-[#6A4FA1] rounded-full text-white"
                        variant="outlined"
                        placeholder=""
                        onPointerEnterCapture=""
                        onPointerLeaveCapture=""
                        disabled={
                          (customTexts[prod.product_data?.id ?? 0] || "")
                            .length == 0 && customImages[prod.id!]
                        }
                        onClick={handleDone}
                      >
                        Done
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};

export default CustomizeDialog;

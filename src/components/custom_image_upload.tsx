import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { imageUpload } from "../providers/api_provider";
import { Line } from "../providers/models/checkout_model";

function getImgUrl(img: any) {
  if (img) {
    const encodedImg = encodeURIComponent(img);
    const imageUrl: any = `${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_URL}${encodedImg}?alt=media`;
    return imageUrl;
  }
}

const useImageUpload = () => {
  const [dataReturn, setDataReturn] = useState({
    percentage: 0,
    uploading: false,
    uploaded: false,
    fullurl: "",
    url: "",
  });
  const [error, setError] = useState("");

  const uploadImage = async (
    file: File,
    path = "ecom/custom_orderline/46374"
  ) => {
    setDataReturn({
      percentage: 0,
      uploading: true,
      uploaded: false,
      fullurl: "",
      url: "",
    });
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Not an image file");
      return;
    }
    const fsize = file.size;
    const filesize = Math.round(fsize / 1024 / 1024);
    if (filesize > 5) {
      setError("Image size must be less than 5MB");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);
    console.log(formData);

    try {
      const response = imageUpload(formData);

      const result = (await response).data;
      setDataReturn({
        ...dataReturn,
        percentage: 100,
        uploading: false,
        uploaded: true,
        fullurl: result?.fullurl ?? "",
        url: result?.file_path ?? "",
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { uploadImage, dataReturn, error };
};

interface ImageUploadComponentProps {
  product: Line;
  updateCheckout: (image: string, product: Line) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  product,
  updateCheckout,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { uploadImage, dataReturn, error } = useImageUpload();

  useEffect(() => {
    if (product.custom_images?.paths?.length > 0)
      setSelectedImage(getImgUrl(product.custom_images.paths[0]));
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          //setSelectedImage(e.target?.result as string);
        };
        fileReader.readAsDataURL(file);

        // Trigger upload but do not await here
        uploadImage(file);
      }
    },
    [uploadImage]
  );

  useEffect(() => {
    if (dataReturn.uploaded && dataReturn.url) {
      const imageUrl = getImgUrl(dataReturn.url);
      console.log(
        "Update checkout with product ID: " + product.id,
        selectedImage
      );
      setSelectedImage(imageUrl);
      updateCheckout(dataReturn.url, product);
    }
  }, [dataReturn, error]);

  const removeSelectedImage = () => {
    setSelectedImage(null);
    updateCheckout("", product);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {selectedImage && (
        <div className="relative size-28">
          <Image
            src={selectedImage!}
            alt="Uploaded"
            className="rounded-md"
            fill
            objectFit="contain"
          />
          <button
            onClick={removeSelectedImage}
            className="absolute top-0 right-0 bg-purple-600 rounded-full p-2 m-1"
            aria-label="Delete image"
          >
            <MdDelete className="text-white" />
          </button>
        </div>
      )}
      {!selectedImage && (
        <>
          <label htmlFor={`${product.id}`} className="cursor-pointer">
            <div className="flex flex-col justify-center items-center">
              <MdCloudUpload size={24} />
              {error ? (
                <span className="mt-2 text-red-500">Please add photo</span>
              ) : (
                <span className="mt-2 text-gray-700 text-center">
                  Upload Image
                </span>
              )}
            </div>
          </label>
          <input
            id={`${product.id}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
};

export default ImageUploadComponent;

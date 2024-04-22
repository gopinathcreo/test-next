"use client"
import React from "react";
import Link from "next/link";
import {getImageUrl} from "@/src/utils/firebase_utils";

const Images = ({ images }: { images: any }) => {


  const mobileBackground = `url('${getImageUrl(images.background)}')`;
  const webBackground = `url('${getImageUrl(images.web_background)}')`;
  return (
    <div className="flex flex-col justify-center">
      <p className="text-black ml-2 text-base font-medium sm:font-normal sm:text-3xl mb-1">
        {images.title}
      </p>
      <div
        className=" block md:hidden py-[10px]  flex justify-center before:bg-background-gradient"
     
      >
        <div className="max-w-5xl flex-grow flex p-4 sm:p-8 justify-between items-center   "    style={{
          backgroundImage: mobileBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          {images.images.map((image: any, index: number) => (
          <Link href={`/collections/${image.redirect.collection_slug}`}
                key={index}>
                   <div
              className=" h-24 w-24 sm:h-56 sm:w-56 cursor-pointer mx-2"
              style={{
                backgroundImage: "url('" + getImageUrl(image.image) + "')",
                backgroundRepeat: "round",
                backgroundSize: "cover",
              }}
            ></div>
           </Link>
          ))}
        </div>
      </div>
      <div
        className=" hidden md:block py-[72px] flex justify-center before:bg-background-gradient "
        style={{
          backgroundImage: webBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl flex-grow flex p-4 sm:p-8 justify-between items-center mx-auto">
          {images.images.map((image: any, index: number) => (
          <Link href={`/collections/${image.redirect.collection_slug}`}
                key={index}>
                   <div
              className=" h-24 w-24 sm:h-56 sm:w-56 cursor-pointer  "
              style={{
                backgroundImage: "url('" + getImageUrl(image.image) + "')",
                backgroundRepeat: "round",
                backgroundSize: "cover",
              }}
            ></div>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
//style={{ background: background, backgroundRepeat: 'round' }}

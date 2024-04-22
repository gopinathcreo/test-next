"use client";

import React from "react";
import { redirectView } from "./design_block";
import {getImageUrl} from "@/src/utils/firebase_utils";

const Banner = ({ banner }: { banner: any }) => {
  const isWebImage = banner.web_image ? true : false;
  const isMobileImage = banner.image ? true : false;


  return (
    <div className="relative">
      <div className="w-full overflow-hidden hidden sm:block cursor-pointer">
        <img
          src={
            isWebImage
              ? getImageUrl(banner.web_image)
              : getImageUrl(banner.image)
          }
          alt="image"
          className="w-full object-cover"
          onClick={() => redirectView(banner.redirect)}
        />
      </div>
      <div className="w-full overflow-hidden block sm:hidden cursor-pointer">
        <img
          src={
            isMobileImage
              ? getImageUrl(banner.image)
              : getImageUrl(banner.web_image)
          }
          alt="image"
          className="w-full object-cover"
          onClick={() => redirectView(banner.redirect)}
        />
      </div>
    </div>
  );
};

export default Banner;

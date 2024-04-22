"use client";

import React from "react";
import { redirectView } from "./design_block";
import {getImageUrl} from "@/src/utils/firebase_utils";

const BannerDuo = ({ banner_duo }: { banner_duo: any }) => {

  const style = `url('${getImageUrl(banner_duo.background)}')`;

  return (
    <div
      className="bg-cover py-1 sm:py-2 bg-center mt-[10px] bg-black"
      style={{ backgroundImage: style }}
    >
      <div className="text-center  bg-white p-2 m-2">
        <h1 className="text-purple  text-3xl sm:text-6xl text-purple-900">
          {banner_duo.title}
        </h1>
      </div>

      <div
        className="flex flex-wrap"
      >
        <div className="flex-1 w-1/2 p-2 pb-3 cursor-pointer"
             onClick={() => redirectView(banner_duo.child1.redirect)}>
          <div
            className="relative bg-cover bg-center bg-no-repeat h-40 sm:h-80 aspect-w-1 aspect-h-1"
            style={{
              backgroundImage: `url('${getImageUrl(banner_duo.child1.image)}')`,
            }}
          ></div>
          <div className=" w-full p-2 sm:p-3 mt-2 bg-white">
            <h2 className="text-xl sm:text-5xl text-black text-center font-normal">
              {banner_duo.child1.title}
            </h2>
          </div>
        </div>

        {/* Men's fashion card */}
        <div
          className="flex-1 w-1/2 p-2 pb-3 cursor-pointer"
          onClick={() => redirectView(banner_duo.child2.redirect)}
        >
          <div
            className="relative bg-cover bg-center bg-no-repeat h-40 sm:h-80 aspect-w-1 aspect-h-1"
            style={{
              backgroundImage: `url('${getImageUrl(banner_duo.child2.image)}')`,
            }}
          ></div>
          <div className="w-full p-2 sm:p-3 mt-2 bg-white">
            <h2 className="text-xl sm:text-5xl text-black text-center font-normal">
              {banner_duo.child2.title}
            </h2>
          </div>
        </div>
      </div>

      {/* <div className="bg-white p-2 ">
        <div className=" text-black">
          <h2 className="font-medium p-2 text-left">SIZE</h2>
          <div className="columns-3 flex flex-row justify-around space-x-6 m-2">
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3">Queen size</div>
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3 ">Queen size</div>
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3 ">Queen size</div>
          </div>
          <div className="columns-3 flex flex-row justify-around space-x-6 m-2">
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3">Queen size</div>
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3 ">Queen size</div>
              <div className="text-center py-1 px-2  text-sm font-medium rounded-lg border-black border-[1px] w-2/3 ">Queen size</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BannerDuo;

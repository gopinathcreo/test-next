"use client";
import { ProductModel } from "@/src/providers/models/product_model";
import { getImageUrl } from "@/src/utils/firebase_utils";
import Image from "next/image";
import React, { useState } from "react";
import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {FreeMode, Pagination,Autoplay} from 'swiper/modules'


export function  ProductImageMobile({ product }: { product: ProductModel }){
  let imagePaths: string[];
  imagePaths = product?.variant?.images?.paths ? product?.variant?.images?.paths : product?.images?.paths;
  return (
    <div className="w-full md:w-full flex-column justify-center items-center space-y-2 border border-black h-[343px] ">
      <Swiper className="z-0  h-[340px] "
        freeMode={false}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        modules={[FreeMode, Pagination,Autoplay]}
        // style={{
        //   "--swiper-theme-color": "black",
        // }}
      >
        {imagePaths.map((path, i)  => (
          <SwiperSlide key={i}>
           <Image
           priority
              src={getImageUrl(path)}
              alt={product.name}
              width={1000}
              height={1000}
              className="object-contain h-full "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};




"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {getImageUrl} from "@/src/utils/firebase_utils";
import { useSiteData } from "@/src/providers/site_data_context";

const ProductCard = ({ product }: { product: any }) => {

  const getMrp = () => {
    if (product.selling_price === product.mrp) {
      return "";
    }
    if (Math.floor(
      ((product.mrp - product.selling_price) / product.mrp) * 100
    ) > 3) {
      return (

        <span className="inline-block ml-2 mr-2 text-[#43474E] line-through   text-[11px]">
          ₹{Math.ceil(product.mrp)}
        </span>
      )
    };
  };

  const getDiscount = () => {
    if (product.selling_price === product.mrp) {
      return "";
    }
    if (Math.floor(
      ((product.mrp - product.selling_price) / product.mrp) * 100
    ) > 3) {
      return (
        <span className="inline-block text-rose-600 mr-2 text-[#904D00] text-[11px]">
          -{Math.floor(
            ((product.mrp - product.selling_price) / product.mrp) * 100
          )}
          %
        </span>
      )
    };
  };

  const getMemberPrice = () => {
    let discount = 0;
    if (product?.commission) {
      product?.commission.forEach((element: any) => {
        if (+element?.commission && +element?.commission >= discount) {
          discount = element?.commission;
        }
      });
    }
    // let commission = product.commission.find(
    //   (c: any) => c.plan_id === 18
    // ).commission;
    return (
      <div className="flex flex-col p-2 tracking-wide whitespace-nowrap border border-dashed border-[#e9db9a] bg-black rounded-none ">
        <div className="relative w-[118px] h-[20px]">
          <Image
            src="/svg/member-price.svg"
            fill
            className="h-auto"
            alt="member price"
            objectFit="contain"
          />
        </div>
        <span className="text-yellow-600 text-lg">
          ₹{Math.ceil(Math.ceil(product.selling_price) - Math.floor(discount))}
        </span>
      </div>
    );
  };
const {isMicroSite} = useSiteData();
  return (
    <Link href={`/product/${product.product_slug}`}>
      <div className="flex flex-col  flex-grow bg-white rounded-xl overflow-hidden w-[40vw] max-w-[160px] mr-2 ">
        <div className="relative size-[118px] self-center">
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            objectFit="contain"
            fill
          />
        </div>
        <div className="flex h-[40px] mt-1 mb-2 ml-2 text-sm tracking-normal  leading-5 text-black ">
          <span className="line-clamp-2 self-center">{product.name}</span>
        </div>
        <div className="my-auto h-px bg-black w-full " />

        <div className=" ml-3 text-xs leading-4 whitespace-normal h-[40px] flex flex-wrap items-center">
          <span className="inline-block text-black text-sm font-medium">
            ₹{Math.ceil(product.selling_price)}
          </span>
          {getMrp()}
          {getDiscount()}
        </div>
       {!isMicroSite && (
<div>{getMemberPrice()}</div>
       )} 
      </div>
    </Link>
  );
};

const ProductList = ({ product_list }: { product_list: any }) => {

  const style = `url('${getImageUrl(product_list.background)}')`;

  const productCardClass = (index: number) => {
    return `flex flex-col  flex-grow  justify-center rounded-xl items-stretch ${index == 0 ? "ml-4" : ""
      }`;
  };

  return (
    <div
      className=" flex flex-col w-full pt-5 bg-cover bg-center   bg-gray-300 "
      style={{ backgroundImage: style }}
    >
      <header className="flex justify-between text-white whitespace-nowrap">
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-center text-2xl sm:text-3xl font-medium leading-7">
            {product_list.title}
          </div>

          <div className="flex justify-between mt-2.5 text-3xl font-semibold mx-3 sm:mx-20">
            <div className="my-auto h-px bg-white w-full m-[8px]" />
            <div className="grow text-3xl sm:text-5xl font-medium">
              {product_list.subtitle}
            </div>
            <div className="my-auto h-px bg-white w-full m-[8px]" />
          </div>
        </div>
      </header>
      <section className="flex overflow-x-auto gap-2 mt-4 text-xs font-medium leading-4 pb-3">
        {product_list.products.map((product: any, index: number) => (
          <div className={productCardClass(index)} key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductList;

'use Client'
import Image from 'next/image';
import React from 'react';
import { getImageUrl } from '../utils/firebase_utils';
import { useSiteData } from '../providers/site_data_context';

const ProductCard = ({ product }: any) => {
  const { isMicroSite } = useSiteData();
  let discount = 0;
  let discountPct = Math.floor(100 - (product.price / product.maxPrice) * 100);;


  if (product?.commission) {
    product?.commission.forEach((element: any) => {
      if (+element?.commission && +element?.commission >= discount) {
        discount = element?.commission;
      }
    });
  }

  let memberPrice = Math.round(Math.ceil(+product.price)- Math.floor(+discount));

  return (
    <>
      <div className="md:hidden text-[#1a1c1e] flex gap-2">
        <div className="h-auto w-1/3 relative ">
          <Image
            src={getImageUrl(product.imageUrl)}
            alt={product.title}
            className="w-full rounded-md"
            fill
            objectFit='contain'
          />
        </div>

        <div className="w-2/3 font-medium">
          <div className="text-sm  multi-line-truncatex">{product.title}</div>
          <div className="mt-2 ">₹{Math.ceil(product.price)}</div>
          <div className="text-base my-2">
            {product?.price < product?.maxPrice && discountPct >3 &&
                  <span className="text-sm text-[#43474e] line-through mr-2">₹{Math.ceil(product.maxPrice)}</span>}
                  {discountPct>3 && 
                              <span className='text-xs text-[#904d00]'>( -{Math.floor(discountPct)}% )</span>
                  }

          </div>
          {!isMicroSite &&
            <div className="flex items-center gap-3">
              <div className="w-[98px] h-[16px] relative">
                <Image
                  src="/svg/member-price.svg"
                  alt="member-price"
                  className="w-full"
                  fill
                />
              </div>
              <span>₹{Math.ceil(memberPrice)}</span>
            </div>}
        </div>
      </div>
      <div className="hidden md:block text-[#1a1c1e]">
        <div className="h-[154px] w-auto relative hover:scale-110 hover:shadow-sm hover:rounded-lg hover:ring-1 ring-blue-gray-100 ring-opacity-25">
          <Image
            src={getImageUrl(product.imageUrl)}
            alt={product.title}
            className="w-full"
            fill
            objectFit="contain"
          />
        </div>

        <div className="py-4">
          <div className="text-sm  multi-line-truncate">{product.title}</div>
          <div className="text-base my-2 flex items-center">
            <span className="mr-2">₹{Math.ceil(product.price)}</span>
            {product?.price < product?.maxPrice && discountPct > 3 &&
              <span className="font-medium text-xs text-[#43474e] line-through mr-2">₹{Math.ceil(product.maxPrice)}</span>}
            {discountPct > 3 &&
              < span className='text-xs text-[#904d00]'>-{discountPct}%</span>}

          </div>
          {!isMicroSite && (
            <div className="w-[98px] h-[16px] relative mb-2">
              <Image
                src="/svg/member-price.svg"
                alt="member-price"
                className="w-full"
                fill
              />
            </div>
          )}
          {!isMicroSite &&
            <span>₹{Math.ceil(memberPrice)}</span>}

        </div>
      </div >
    </>

  );
};

export default ProductCard;

'use Client'
import Image from 'next/image';
import React from 'react';
import { getImageUrl } from '../utils/firebase_utils';
import { useSiteData } from "../providers/site_data_context";

const SimilarProductCard = ({ product }: { product: any }) => {

  let discount = 0;

  let discountPct = Math.floor(100 - (product.price / product.maxPrice) * 100);; 
  if (product?.commission) {
    product?.commission.forEach((element: any) => {
      if (+element?.commission && +element?.commission >= discount) {
        discount = element?.commission;
      }
    });
  }
  let memberPrice = Math.ceil(Math.ceil(+product.price) - Math.floor(+discount));
  const { isMicroSite } = useSiteData();


  return (
    <>
      <div className="block md:block text-[#1a1c1e] border  rounded-xl h-full">
        <div className="h-[154px] w-auto relative object-contain rounded-t-xl overflow-hidden">
          <Image
            src={getImageUrl(product.imageUrl)}
            alt={product.title}
            className="w-auto object-contain rounded-t-xl"
            fill
          />
        </div>

        <div className="py-4 px-1 flex flex-col">
          <div className="text-sm  multi-line-truncate">{product.title}</div>
          <div className="align-end">
            <div className="text-base my-2 flex items-center">
              <span className="mr-2">₹{Math.ceil(product.price)}</span>
              { product?.price < product?.maxPrice &&
                <span className="font-medium text-xs text-[#43474e] line-through mr-2">₹{Math.ceil(product.maxPrice)}</span>
              }
              {discountPct > 3 &&
                <span className='text-xs text-[#904d00]'>-{discountPct}%</span>}
            </div>
            {!isMicroSite &&
              <div>
                <div className="w-[98px] h-[16px] relative mb-2">
                  <Image src="/svg/member-price.svg"
                    alt="member-price"
                    className="w-full"
                    fill />
                </div>
                <span>₹{Math.ceil(memberPrice)}</span></div>}

          </div>

        </div>
      </div>
    </>
  );
};

export default SimilarProductCard;

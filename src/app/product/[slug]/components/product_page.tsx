"use client";
import { ProductImageMobile } from "@/src/app/product/[slug]/components/product_image";
import {
  ProductDetailsMobile,
  ProductDetailsWeb,
} from "@/src/app/product/[slug]/components/product_details";
import { ProductDesc } from "@/src/app/product/[slug]/components/product_desc";
import { ProductModel } from "@/src/providers/models/product_model";
import { Suspense, useEffect, useState } from "react";
import {
  fetchCheckoutDetails,
  fetchReviews,
} from "@/src/providers/api_provider";
import { CheckoutModel } from "@/src/providers/models/checkout_model";
import { AddToCartBottomSheet } from "@/src/app/product/[slug]/components/add_to_cart_bottom_sheet";
import { ProductSimilar } from "@/src/app/product/[slug]/components/product_similar";
import { createContext } from "react";
import React from "react";
import EmblaCarousel from "../../../../components/embla_carousel";
import { EmblaOptionsType } from "embla-carousel";
import ReviewDialog from "./review_dialog";
import { ReviewModel } from "@/src/providers/models/review_model";
import Rating from "@mui/material/Rating";

export interface ProductContextType {
  productQuantity: number;
  setProductQuantity: (productQuantity: number) => void;
}
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

function getCheckout(setCheckout: (checkout: CheckoutModel) => void) {
  fetchCheckoutDetails().then((response) => {
    if (response.status) {
      setCheckout(response.data!);
    }
  });
}

export default function ProductPageView({
  product,
}: {
  product: ProductModel;
}) {
  const [value, setValue] = useState<number | null>(5);
  const [productQuantity, setProductQuantity] = useState(1);
  const OPTIONS: EmblaOptionsType = {};
  let imagePaths: string[];
  imagePaths = product?.variant?.images?.paths
    ? product?.variant?.images?.paths
    : product?.images?.paths;
  const [checkout, setCheckout] = useState({} as CheckoutModel);
  const [reviewData, setReviewData] = useState<ReviewModel>();
  const reviewdata = async () => {
    try {
      const response = await fetchReviews(product.id);
      setReviewData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getCheckout(setCheckout);
    reviewdata();
  }, []);

  return (
    <div className="text-black mt-4">
      <div className="md:hidden">
        <div className="px-4">
          <h2 className="font-medium text-wrap">{product.name}</h2>
          <div className="flex justify-between items-center space-x-3">
            <p className="text-xs text-[#1A1C1E] mt-1 w-1/2">
              Sold by:{" "}
              <span className="capitalize">
                {product.variant.stock.company_name}
              </span>
            </p>

            {Number(reviewData?.results[0]?.product_rating) > 0 && (
              <>
                <a href="#reviewSection" className="mx-0">
                  <div className="flex w-1/2 items-center mx-0 space-x-1">
                    <span className=" font-normal text-sm mr-px">
                      {Number(reviewData?.results[0]?.product_rating).toFixed(
                        1
                      )}
                    </span>
                    <Rating
                      name="read-only"
                      value={Number(reviewData?.results[0]?.product_rating)}
                      readOnly
                      precision={0.5}
                    />
                    {Number(reviewData?.count) > 0 && (
                      <span className="text-sm text-gray-600 text-center ml-px whitespace-nowrap">
                        {reviewData?.count} Reviews
                      </span>
                    )}
                  </div>
                </a>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-2 pb-2 mt-3 mb-0 sm:mb-0">
            <ProductImageMobile product={product} />
            <div className="w-full md:w-1/2">
              <ProductContext.Provider
                value={{ productQuantity, setProductQuantity }}
              >
                <ProductDetailsMobile product={product} />
              </ProductContext.Provider>
            </div>
          </div>
          <ProductSimilar
            product_type={product.product_type_name}
            product={product}
          />
          <ProductDesc product={product} />
          <hr className="my-4" />
          <div className="flex justify-between items-center pt-8 pb-2">
          {Number(reviewData?.results[0]?.product_rating) > 0 ? (
                  <div className="flex justify-between mb-2">Ratings</div>) : (
                  <>

                    <div className="flex flex-col justify-start items-center">
                      <div className="text-lg font-semibold">Customer reviews</div>
                      <div className="text-base font-normal pl-0 ml-0 text-[#73777F]">Be the first to review</div>
                    </div>

                  </>
                )}

            <ReviewDialog
              id={product.id}
              variant={product?.variant?.id}
              getReview={reviewdata}
            ></ReviewDialog>
          </div>
          {Number(reviewData?.results[0]?.product_rating) > 0 && (
            <>
              <p className="text-3xl">
                {Number(reviewData?.results[0]?.product_rating).toFixed(1)}
              </p>
              <Rating
                name="read-only"
                value={Number(reviewData?.results[0]?.product_rating)}
                readOnly
                precision={0.5}
              />
              {Number(reviewData?.count) > 0 && (
                <p className="mb-1">Customer Reviews ({reviewData?.count})</p>
              )}
            </>
          )}

          <div className="mb-4">
            {reviewData?.results.map((result, index) => (
              <>
                <div className="flex items-center my-2" key={index}>
                  <div className="bg-orange-400 h-fit mr-2 flex items-center gap-1 px-1">
                    <span className=" text-xs font-semibold">
                      {result.value}
                    </span>
                    <span className="w-[15px] text-xs">★</span>
                  </div>
                  <div className="flex flex-col justify-start">
                    <p className="text-base font-normal">
                      {result?.private_metadata?.command}
                    </p>
                    <p>
                      <span className="text-base font-semibold">
                        {result?.private_metadata?.name}
                      </span>{" "}
                      on{" "}
                      <span className=" text-sm font-semibold text-gray-700">
                        {new Date(result?.created).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <ProductContext.Provider
          value={{ productQuantity, setProductQuantity }}
        >
          <AddToCartBottomSheet product={product} />
        </ProductContext.Provider>
      </div>

      <div className="hidden md:block">
        <div className="max-w-[1140px] mx-auto">
          <div className="px-4">
            <div className="flex flex-col md:flex-row gap-2 pb-2 border-b">
              <div className="w-full md:w-2/5 overflow-hidden">
                <EmblaCarousel images={imagePaths} options={OPTIONS} />
              </div>
              <div className="w-full md:w-3/5 ms-2">
                <ProductDetailsWeb
                  product={product}
                  reviewDataCount={reviewData?.count}
                  avgProductRating={Number(
                    reviewData?.results[0]?.product_rating
                  )}
                />
              </div>
            </div>
            <Suspense fallback={<div></div>}>
              <ProductSimilar
                product_type={product.product_type_name}
                product={product}
              />
            </Suspense>
            <ProductDesc product={product} />

            <hr className="my-4" />
            <div className="mx-auto pt-8 pb-2" id="reviewSection">
              <div className="flex justify-between items-center">
                {Number(reviewData?.results[0]?.product_rating) > 0 ? (
                  <div className="flex justify-between mb-2">Ratings</div>) : (
                  <>

                    <div className="flex flex-col justify-start items-center">
                      <div className="text-lg font-semibold">Customer reviews</div>
                      <div className="text-base font-normal pl-0 ml-0 text-[#73777F]">Be the first to review</div>
                    </div>

                  </>
                )}
                <ReviewDialog
                  id={product.id}
                  variant={product?.variant?.id}
                  getReview={reviewdata}
                ></ReviewDialog>
              </div>
            </div>

            {Number(reviewData?.results[0]?.product_rating) > 0 && (
              <>
                <p className="text-3xl">
                  {Number(reviewData?.results[0]?.product_rating).toFixed(1)}
                </p>
                <Rating
                  name="read-only"
                  value={Number(reviewData?.results[0]?.product_rating)}
                  readOnly
                  precision={0.5}
                />
                {Number(reviewData?.count) > 0 && (
                  <p className="mb-1">
                    Customer Reviews ( {reviewData?.count} )
                  </p>
                )}
              </>
            )}

            {reviewData?.results.map((result, index) => (
              <>
                <div className="mb-4" key={index}>
                  <div className="flex items-center my-2">
                    <div className="bg-orange-400 h-fit mr-2 flex items-center gap-2 px-2">
                      <span className=" text-xs font-semibold">
                        {result?.value}
                      </span>
                      <span className="w-[15px]">★</span>
                    </div>
                    <div className="flex flex-col justify-start">
                      <p className=" text-base font-normal">
                        {result?.private_metadata?.command}
                      </p>
                      <p>
                        <span className=" text-base  font-semibold">
                          {result?.private_metadata?.name}
                        </span>{" "}
                        on{" "}
                        <span className=" text-sm font-semibold text-gray-700">
                          {new Date(result?.created).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

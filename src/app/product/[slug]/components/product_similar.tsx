"use client";
import { ProductModel } from "@/src/providers/models/product_model";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "@/server/typesense_provider";
import SimilarProductCard from "../../../../components/similar_product_card";

export function ProductSimilar({ product_type, product }: { product_type: string, product: ProductModel }) {
let index:number;
  const [similarProducts, setSimilarProducts] =
    useState<TypesenseSearchResponse>();
    let filteredSimilarProducts : Hit[]=[];
  useEffect(() => {
    getProducts("", {
      product_types: [product_type],
    }).then((response) => {
      setSimilarProducts(response!);
    });
  }, [product_type]); 

  similarProducts?.hits.map((hit)=>
  {
    filteredSimilarProducts = similarProducts.hits.filter(hit => Number(hit.document.id) !== product.id);
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      {(filteredSimilarProducts.length > 2) &&
        <div className="  py-2 sm:py-4  max-w-7xl mx-auto border-b pb-5 ">
          <h3 className=" text-black text-base font-medium  sm:font-normal sm:text-2xl mb-4 md:mb-2">
            Similar products you might be interested in
          </h3>
          <div className="flex overflow-x-auto space-x-2 h-auto overflow-y-hidden pb-2">
            {filteredSimilarProducts.map((result) => (
              <div className="flex-none"
                key={result.document.id}>
                <div className="w-36 h-full bg-center bg-cover   relative">
                  <Link
                    href={`/product/${result.document.slug}`}
                    passHref
                    className=""
                  >
                    <SimilarProductCard
                      product={{
                        imageUrl: result.document.image,
                        title: result.document.name,
                        maxPrice: result.document.max_price,
                        price: result.document.price,
                        discountedPrice: result.document.price,
                        commission: result.document.commission,
                      }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>

  );
}


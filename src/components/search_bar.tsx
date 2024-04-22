"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import debounce from "lodash.debounce";
import { getProducts } from "../../server/typesense_provider";
import ProductCard from "./product_card";
import Link from "next/link";
import useOutsideClick from "@/src/hooks/use_outside_click";
import Image from "next/image";
import { usePathname } from "next/navigation";

// const Image = ({ src, alt, className }: { src: string, alt: string, className: string }) => (
//     <img src={src} alt={alt} loading="lazy" className={className} />
// );

const SearchBarWithResults = () => {
  const searchContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [results, setResults] = useState<TypesenseSearchResponse | null>();
  const [open, setOpen] = React.useState(false);
  const [changes, setChanges] = useState(0);
  const pathname = usePathname();

  const handleOpen = () => setOpen(!open);
  const closeDialog = () => {
    setOpen(!open);
    setIsSearchActive(false);
    setSearchTerm("");
  };
  const callApi = async () => {
    try {
      const response = await getProducts(searchTerm, {});
      setResults(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const debouncedApiCall = debounce(() => {
    if (searchTerm) {
      callApi();
    }
  }, 3);

  useEffect(() => {
    debouncedApiCall();
    if (searchTerm.length > 0 && document.activeElement?.tagName === "INPUT") {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
    return () => {
      debouncedApiCall.cancel();
    };
  }, [searchTerm]);

  {
    /*clearing searchTerm when get navigated to different page */
  }
  useEffect(() => {
    setSearchTerm("");
  }, [pathname]);

  const handleInputFocus = () => {
    setIsSearchActive(searchTerm.length > 0);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  useOutsideClick(searchContainerRef, () => setIsSearchActive(false));
  return (
    <div
      ref={searchContainerRef}
      className={
        isSearchActive
          ? "relative flex flex-row flex-1 p-2 my-2 border border-[#f0f0f4] border-b-0 shadow-md rounded-t-3xl"
          : "relative flex flex-row flex-1 p-2 my-2"
      }
    >
      <div className="flex flex-row flex-1 justify-start items-center self-stretch bg-gray-200 rounded-full">
        {!isSearchActive && (
          <div className="pl-5 pr-0  ">
            <Image
              src="/svg/navbar_search.svg"
              alt="Search image"
              width={20}
              height={20}
              className={""}
            />
          </div>
        )}
        <div
          className="md:hidden w-full py-2 bg-gray-200 rounded-full pl-2 focus:outline-none text-gray-700 placeholder-gray-500"
          onClick={handleOpen}
        >
          What are you looking for?
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder="What are you looking for?"
          className="hidden md:block w-full py-2 bg-gray-200 rounded-full pl-2 focus:outline-none text-gray-700 placeholder-gray-500 ms-6 me-12"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
        />
        {isSearchActive ? (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 z-10 me-4 "
            onClick={() => clearSearch()}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z" />
                    </svg> */}
            <Image
              src="/svg/navbar_close.svg"
              alt="close icon"
              width={15}
              height={15}
            ></Image>
          </button>
        ) : (
          ""
        )}
      </div>

      {isSearchActive ? (
        <div className="flex flex-wrap absolute left-0 overflow-y-auto top-12 h-[75vh] z-50 bg-white border border-[#f0f0f4] border-t-0 rounded-b-3xl shadow-md w-full p-4">
          {results?.found == 0 ? (
            <div className="w-full text-center text-gray-600">
              No results found
            </div>
          ) : (
            results?.hits.map((result) => (
              <Link
                href={`/product/${result.document.slug}`}
                onClick={() => setIsSearchActive(false)}
                passHref
                key={result.document.id}
                className="p-4 w-1/4 rounded"
              >
                <ProductCard
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
            ))
          )}
        </div>
      ) : (
        ""
      )}
      {searchDialogMobile()}
    </div>
  );

  function searchDialogMobile() {
    return (
      <Dialog
        open={open}
        size="xxl"
        handler={handleOpen}
        className="bg-white overflow-y-auto"
        placeholder=""
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div ref={searchContainerRef} className="relative flex">
          <div className="fixed top-0 z-50 w-full bg-white">
            <div className="bg-gray-200 flex items-center mx-auto w-[80%] p-2 my-2  rounded-full pl-2 border border-purple-400">
              <div className="px-4" onClick={closeDialog}>
                <Image
                  src="/svg/arrowLeft.svg"
                  alt=""
                  className={""}
                  width={20}
                  height={20}
                />
              </div>
              <input
                type="text"
                value={searchTerm}
                placeholder="What are you looking for?"
                className="w-full bg-gray-200 focus:outline-none text-gray-700 placeholder-gray-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleInputFocus}
              />
              {isSearchActive ? (
                <button
                  type="button"
                  className=" px-3 z-10"
                  onClick={() => clearSearch()}
                >
                  <Image
                    src="/svg/navbar_close.svg"
                    alt="Close button"
                    width={20}
                    height={20}
                  ></Image>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          {isSearchActive ? (
            <div className="flex flex-wrap absolute left-0 overflow-y-auto divide-y top-12  p-4">
              {results?.found == 0 ? (
                <div className="w-full text-center text-gray-600">
                  No results found
                </div>
              ) : (
                results?.hits.map((result) => (
                  <Link
                    href={`/product/${result.document.slug}`}
                    onClick={closeDialog}
                    passHref
                    key={result.document.id}
                    className="py-4 lg:p-4 w-full lg:w-1/4 rounded"
                  >
                    <ProductCard
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
                ))
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </Dialog>
    );
  }
};

export default SearchBarWithResults;

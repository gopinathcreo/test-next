"use client";
import { getCollectionProducts } from "@/server/typesense_provider";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getImageUrl } from "@/src/utils/firebase_utils";
import Slider from "@mui/material/Slider";
import Image from "next/image";
import Skeleton from "./skeleton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSiteData } from "@/src/providers/site_data_context";
import { Select, Option } from "@material-tailwind/react";

const fetchProducts = async (
  slug: string,
  product_types: string[],
  max_price: number | undefined,
  min_price: number | undefined,
  sort_by: string,
  page: number
) => {
  return await getCollectionProducts("", "", {
    page: page,
    attributes: undefined,
    sortBy: sort_by,
    minPrice: min_price,
    maxPrice: max_price,
    product_types: product_types,
    facetBy: "product_type, price",
    company_slug: slug,
  });
};

const Product = ({ product }: { product: any }) => {
  const {isMicroSite} = useSiteData();
  const getMrp = (product: any) => {    
    if (product.price === product.max_price || product.max_price == 0) {
      return "";
    }

    if((Math.floor((product.max_price - product.price)/product.max_price)*100)>3){
    return (
      <span className="inline-block text-gray-600 line-through">
        ₹{Math.ceil(product.max_price)}
      </span>
    );
    }
  };

  const getDiscount = (product: any) => {
    if (product.price === product.max_price || product.max_price == 0) {
      return "";
    }
    
    if((Math.floor((product.max_price - product.price)/product.max_price)*100)>3){
      return (
        <span className="inline-block text-rose-600 m-0 p-0">
          -{Math.floor(
            ((product.max_price - product.price) / product.max_price) * 100
          )}
          % 
        </span>
      );
    }

  };

  const getMemberPrice = (product: any) => {
    // check if it is zoozle.in or subdomain.zoozle.in
    // if (window.location.hostname.split(".").length == 3) {

    //   return "";
    // } else {
    let commission =
      product.commission.find((c: any) => c.plan_id === 18)?.commission ?? 0;
    return (
      <div className="flex">
        <Image className="w-[70%]" src="/svg/text.svg" alt="Member Price" width={78} height={24} />
        <span className="text-black text-lg ml-1">₹{Math.ceil(product.price - commission)}</span>
      </div>
    );
    // }
  };

  return (
    <Link href={`/product/${product.document.slug}`} className="">
      <div className="px-4 md:bg-[#ffff] bg-[#fcfcff] flex  md:rounded md:overflow-hidden w-full md:block">
        <div className="h-[165px] flex-shrink-0 md:h-[200px] w-[117px] md:w-auto relative mt-3">
          <Image
            className="md:rounded-md  md:hover:scale-110  md:duration-300 md:hover:shadow-md hover:ring-1 ring-blue-gray-100 ring-opacity-25 p-1 md:hover:rounded-md "
            src={getImageUrl(product.document.image)}
            alt={product.document.name}
            fill
            objectFit="contain"
          />
        </div>

      <div className="md:my-4 md:h-[110px] md:flex md:flex-col md:justify-between md:px-0 md:py-0 px-1 py-4">
        <div className="flex items-center">
          <p className=" line-clamp-2 py-1 ">{product.document.name}</p>
        </div>

       <div>
       <div className="md:flex space-x-1 md:items-center">
          <span className="md:text-[15px] md:mt-0 mt-3">₹{Math.ceil(product.document.price)}</span>
          <del className="md:ml-1 pl-1">{getMrp(product.document)}</del>
          <span className="text-[#904d00]">
            {getDiscount(product.document)}
          </span>
        </div>
        {!isMicroSite && (
          <div className="w-40">{getMemberPrice(product.document)}</div>
        )}
       </div>
      </div>
    </div>
    <hr className="md:hidden" />
  </Link>
  );
  // ... rest of the product rendering code
};

let timeoutId: NodeJS.Timeout | null = null;

function debounce(callback: () => void, delay: number) {
  return function () {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, delay);
  };
}

export function CollectionPage({ params }: { params: { slug: string } }) {
  const [product_types, setProductTypes] = useState<string[]>([]);
  const [result, setResult] = useState<any>({ loading: true, results: null });
  const [price_range, setPriceRange] = React.useState<number[]>([0, 0]);
  const [max_price_range, setMaxPriceRange] = React.useState<number[]>([0, 0]);
  const [sort_by, setSortBy] = React.useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [filterChange, setFilterChange] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (result?.results != null) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            loadMore();
          }
        },
        { rootMargin: "100px" }
      );

      if (loadingRef.current) {
        observer.observe(loadingRef.current);
      }

      return () => {
        if (loadingRef.current) {
          observer.unobserve(loadingRef.current);
        }
      };
    }
  }, [loadingRef, result]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(Array.isArray(newValue) ? newValue : [newValue]);
  };
  useEffect(() => {
    setPage(1);
  }, [product_types, price_range, sort_by]);
  useEffect(() => {
    const getProducts = debounce(() => {
      fetchProducts(
        params.slug,
        product_types,
        price_range[1] == 0 ? undefined : price_range[1],
        price_range[1] == 0 ? undefined : price_range[0],
        sort_by,
        page
      ).then((res) => {
        setFilterChange(false);
        if (page == 1) {
          setResult(res);
          setProducts(
            res.results != null
              ? res.results[res.results?.length - 1]?.hits
              : []
          );
        } else {
          setResult(result);
          setProducts([
            ...products,
            ...(res.results != null
              ? res.results[res.results?.length - 1]?.hits
              : []),
          ]);
        }
        if (max_price_range[0] == 0 && max_price_range[1] == 0) {
          let min_price = res.results[0].facet_counts?.find(
            (e: any) => e.field_name == "price"
          )?.stats?.min;
          let max_price =
            res.results[0].facet_counts?.find(
              (e: any) => e.field_name == "price"
            )?.stats?.max + 50;
          if ((min_price ?? 0) > 10) {
            min_price = (min_price ?? 10) - 10;
          }
          setMaxPriceRange([min_price, max_price]);
          setPriceRange([
            res.results[res.results?.length - 1].facet_counts?.find(
              (e: any) => e.field_name == "price"
            )?.stats?.min,
            res.results[res.results?.length - 1].facet_counts?.find(
              (e: any) => e.field_name == "price"
            )?.stats?.max,
          ]);
        }
      });
    }, 500);
    getProducts();
  }, [product_types, price_range, sort_by, page]);

  const updateProductType = (product_type: string) => {

    setFilterChange(true);
    if (selectedTypes.includes(product_type)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== product_type));
    } else {
      setSelectedTypes([...selectedTypes, product_type]);
    }
    let newProductTypes = [...product_types];
    const productTypeIndex = newProductTypes.findIndex(
      (type) => type === product_type
    );
    if (productTypeIndex !== -1) {
      newProductTypes.splice(productTypeIndex, 1);
    } else {
      newProductTypes.push(product_type);
    }
    setProductTypes(newProductTypes);
  };

  return (
    <div className="block md:flex justify-between gap-4">
      {result?.loading ? (
        <Skeleton type={"filter"} number={16} />
      ) : (
        <>
          <div className="md:hidden">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className=" bg-[#f3f3f6] shadow-md  rounded-full mx-4 my-4 px-4 py-1.5"
            >
              <div className="flex">
                <span className="pt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.25 4.5V6H15.75V4.5H2.25ZM7.5 13.5H10.5V12H7.5V13.5ZM13.5 9.75H4.5V8.25H13.5V9.75Z"
                      fill="#6A4FA3"
                    ></path>
                  </svg>
                </span>

                <span className="text-14px text-[#677788]">Filters</span>
              </div>
            </button>
            {showFilter &&
              filterDialogMobile(
                setShowFilter,
                showFilter,
                result,
                updateProductType,
                price_range,
                selectedTypes,
                setSelectedTypes,
                handleChange,
                max_price_range,
                setPriceRange,
                setProductTypes
              )}
          </div>
          {collectionFilter(
            showFilter,
            result,
            updateProductType,
            price_range,
            selectedTypes,
            setSelectedTypes,
            handleChange,
            max_price_range,
            setPriceRange
          )}
          {collectionItems(
            result,
            filterChange,
            setSortBy,
            products,
            loadingRef
          )}
        </>
      )}
    </div>
  );
}

function filterDialogMobile(
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,
  showFilter: boolean,
  result: any,
  updateProductType: (product_type: string) => void,
  price_range: number[],
  selectedTypes: string[],
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>,
  handleChange: (event: Event, newValue: number | number[]) => void,
  max_price_range: number[],
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>,
  setProductTypes: React.Dispatch<React.SetStateAction<string[]>>
): React.ReactNode {
  return (
    <div className="fixed  inset-0 bg-white mt-[60px] h-3/4  z-50 flex flex-col  text-black w-full">
      <div className="flex px-4 flex-grow justify-between text-black h-[65px]">
        <span>Filters</span>
        <XMarkIcon
          strokeWidth={2.5}
          className="size-6 text-[24px] font-normal"
          onClick={() => setShowFilter(!showFilter)}
        ></XMarkIcon>
      </div>
      <div className="overflow-auto">
        {collectionFilter(
          showFilter,
          result,
          updateProductType,
          price_range,
          selectedTypes,
          setSelectedTypes,
          handleChange,
          max_price_range,
          setPriceRange,
          true
        )}
      </div>
      <div className="p-4 bg-gray-300 sticky bottom-0">
        <div className="flex justify-center gap-5">
          <button
            disabled={selectedTypes.length === 0}
            className="rounded-full border border-[#6a4fa3] uppercase text-[#6a4fa3]  py-2 px-4 text-sm disabled:bg-opacity-50"
            onClick={() => {
              setSelectedTypes([]);
              setProductTypes([]);
            }}
          >
            Clear All
          </button>
          <button
            className="rounded-full  bg-[#6a4fa3] uppercase text-white  py-2 px-4 text-sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            See products{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

function collectionItems(
  result: any,
  filterChange: boolean,
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
  products: any[],
  loadingRef: React.MutableRefObject<HTMLDivElement | null>
) {
  return (
    <section className="md:w-3/4">
      {result?.loading || filterChange ? (
        <div className="md:mt-3">
          <div className="h-4 bg-gray-300 w-full mb-4"></div>{" "}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 ">
            <Skeleton number={16} type={"items"}></Skeleton>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:visible md:flex md:justify-between pt-3 pb-2">
          <h1 className="px-2 py-1 my-2">
              <span className="text-[16px] font-semibold px-2">
                {" "}
                {result?.results[0].hits[0]?.document.category}
              </span>
              |
              <span className="px-1 text-[#25005a] text-14px">
                {" "}
                {result?.results != null
                  ? result?.results[result?.results?.length - 1]?.found
                  : 0}{" "}
                Products
              </span>
            </h1>
            <div className="flex items-center">
              <label className="w-20 px-1">Sort by:</label>
              <Select
                placeholder
                onPointerEnterCapture
                onPointerLeaveCapture
                className="rounded-full bg-[#49454f1f] outline-none border-none"
                labelProps={{
                  className: "after:border-none before:border-none",
                }}
                value={""}
                onChange={(val) => setSortBy(val ?? "")}
              >
                <Option className="text-[16px]" value="">
                  Best selling
                </Option>
                <Option className="text-[16px]" value="price:asc">
                  Price: low to high
                </Option>
                <Option className="text-[16px]" value="price:desc">
                  Price: high to low
                </Option>
              </Select>
            </div>
          </div>
          {result?.results[result?.results?.length - 1]?.found ==0 && (
          <div className="text-[16px] text-[#677788] px-5">no  products</div>
          )}
          <div className="columns-1 md:grid md:grid-cols-4 md:mt-3">
            {products?.map((product: any, index: number) => (
              <Product product={product} key={product.document.slug} />
            ))}
          </div>
        </>
      )}
      {result?.results != null &&
      result?.results[result?.results?.length - 1]?.found != products.length ? (
        <div ref={loadingRef}>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 ">
            <Skeleton number={8} type={"items"} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}

function collectionFilter(
  showFilter: boolean,
  result: any,
  updateProductType: (product_type: string) => void,
  price_range: number[],
  selectedTypes: string[],
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>,
  handleChange: (event: Event, newValue: number | number[]) => void,
  max_price_range: number[],
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>,
  isMobile: boolean = false
): React.ReactNode {
  return (
    <div
      className={`${
        showFilter && isMobile
          ? "flex flex-col-reverse bg-transparent"
          : "hidden"
      }  md:block border md:w-2/3 lg:w-1/4 accent-purple-800 bg-[#F9F9FC] h-max px-4 md:px-10 py-10 border-separate rounded-lg shadow-lg my-2 mb-8`}
    >
      <div>
        <h2 className="text-purple-800">Product Type</h2>
        {result?.results[0].facet_counts
          ?.find((e: any) => e.field_name == "product_type")
          .counts?.map((type: any) => (
            <div key={type.value} className="flex items-center ">
              <input
                id={`checkbox-${type.value}`} // Assign an ID based on the type value
                className="accent-purple-800 w-5 h-5 my-3 pr-4 flex-shrink-0"
                type="checkbox"
                checked={selectedTypes.includes(type.value)}
                onChange={() => updateProductType(type.value)}
              />
              <label
                htmlFor={`checkbox-${type.value}`}
                className="pl-5 cursor-pointer"
              >
                {type.value}
              </label>
              <br />
            </div>
          ))}
      </div>

      <br />
      <hr />
      <br />
      <div>
        <label className="text-purple-800 py-3">Price</label>
        <div className="w-full">
          <Slider className="text-purple-800"
            getAriaLabel={() => "Price range"}
            value={price_range}
            onChange={handleChange}
            min={max_price_range[0] ?? 0}
            max={max_price_range[1] ?? 1000}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
          {/*<Slider*/}
          {/*    label="Select a budget"*/}
          {/*    formatOptions={{style: "currency", currency: "USD"}}*/}
          {/*    step={10}*/}
          {/*    maxValue={1000}*/}
          {/*    minValue={0}*/}
          {/*    value={price_range}*/}
          {/*    onChange={(value: number | number[]) => setPriceRange(Array.isArray(value) ? value : [value])}*/}
          {/*    className="max-w-md"*/}
          {/*/>*/}
        </div>

        <br />

        <div className="text-purple-800 flex justify-between">
          <label className="py-1">Min price:</label>
          <label className="py-1">Max price:</label>
        </div>
        <div className="flex justify-between">
          <input
            className=" px-2 w-20 h-10 rounded"
            type="number"
            value={price_range[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), price_range[1]])
            }
          />
          <input
            className="border-[#C3C6CF] px-2 w-20 h-10 rounded ml-3"
            type="number"
            value={price_range[1]}
            onChange={(e) =>
              setPriceRange([price_range[0], parseInt(e.target.value)])
            }
          />
        </div>
      </div>
    </div>
  );
}

function valuetext(value: number) {
  return `${value}`;
}

import React from "react";

type SkeletonProps = {
  number?: number;
  type: String;
};

export default function Skeleton({ number, type }: SkeletonProps) {
  if (type == "items") {
    return itemSkeleton(number);
  }
  return (
    <>
      {filterSkeleton()}
      <div className="md:mt-3 flex-grow">
        <div className="h-4 bg-gray-300 w-full mb-4"></div>{" "}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 ">
          {itemSkeleton(number)}
        </div>
      </div>
    </>
  );
}
function filterSkeleton() {
  return (
    <div className="hidden md:block animate-pulse  md:w-2/3 lg:w-1/4">
      <div className="border  accent-purple-800 bg-[#F9F9FC] h-max px-10 py-10 border-separate rounded-lg shadow-lg my-2 mb-8">
        <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
        <div className="space-y-3">
          {" "}
          {Array(6)
            .fill(0)
            .map((el, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <div className="w-5 h-5 bg-gray-300 rounded mr-4"></div>{" "}
                  <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>{" "}
                </div>
              );
            })}
        </div>
        <div className="my-6 h-px bg-gray-300"></div> {/* Divider */}
        <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
        <div className="h-4 bg-gray-300 rounded-md mb-4 w-full"></div>{" "}
        <div className="flex justify-between mb-4">
          {" "}
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
        </div>
        <div className="flex justify-between">
          {" "}
          <div className="h-10 bg-gray-300 rounded-md w-20 mr-3"></div>
          <div className="h-10 bg-gray-300 rounded-md w-20"></div>
        </div>
      </div>
    </div>
  );
}

function itemSkeleton(number: number | undefined) {
  return Array(number)
    .fill(0)
    .map((el, index) => (
      <div key={index} className="animate-pulse mb-4">
        {" "}
        <div className="pt-4 md:pt-0 px-4 md:bg-[#ffff] bg-[#fcfcff] flex gap-2 md:rounded md:overflow-hidden md:block">
          <div className="flex-grow-[0.75] ">
            <div className="rounded-md bg-gray-300 md:mb-4 max-w-full max-h-40  h-40"></div>
          </div>
          <div className="pb-4">
            <div className="h-4 bg-gray-300 rounded w-2/3 py-1 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div className="bg-gray-300 h-px w-full my-2"></div>
      </div>
    ));
}

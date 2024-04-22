import React from "react";

export default function Skeleton() {
  return (
    <>
      <div className="">
        <div className="">{itemSkeleton()}</div>
      </div>
    </>
  );
}

function itemSkeleton() {
  return (
    <div className="md:flex  md:columns-2 lg:columns-3 xl:columns-2 space-x-1 py-4 md:w-full md:h-[700px] columns-1 md:px-24">
      <div className="">
        <div className=" md:mb-2 bg-gray-200 md:h-[400px] h-72 md:py-0 py-2 ">
          {" "}
        </div>
        <div className="md:flex md:justify-between md:space-x-2 flex justify-between md:mt-0 mt-3">
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200 "> </div>
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200"> </div>
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200"> </div>
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200"> </div>
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200"> </div>
          <div className="md:size-[90px] w-11 h-[75px] bg-gray-200 md:hidden">
            {" "}
          </div>
        </div>
      </div>
      <br className="md:hidden"></br>

      <div className="md:mb-4  space-y-10 h-[700px] w-full">
        <div className="h-12 bg-gray-200  w-full"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  md:w-[300px] w-full py-1 mb-2"></div>
        <div className="h-12 bg-gray-200  w-full py-1 mb-2"></div>
      </div>
    </div>
  );
}

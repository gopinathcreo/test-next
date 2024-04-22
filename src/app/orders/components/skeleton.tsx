import React from "react";

export default function Skeleton() {
  return (
    <>
      <div className="">
        {" "}
        {Array(6)
          .fill(0)
          .map((el, index) => {
            return (
              <div className="border rounded-2xl h-44 sm:h-64 align-middle justify-center flex flex-col my-2 animate-pulse " key={index}>
                <div className=" px-2 sm:px-12 flex justify-center align-middle">
                  <div className="w-1/4 h-32 sm:h-48 rounded-xl  m-1">
                    <div className="rounded-xl h-32 sm:h-48 w-full  object-cover bg-gray-200 " />
                  </div>
                  <div className="w-3/4 h-32 sm:h-48 rounded-xl m-1 p-3 sm:p-8">
                    <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-6  rounded-lg"></div>
                    <div className=" w-2/3 text-xs sm:text-sm font-normal h-5 bg-gray-200 rounded- my-2 "></div>
                    <div className="w-2/3 text-xs sm:text-sm font-normal h-5 bg-gray-200 rounded-xl my-2 "></div>
                  </div>
                </div>

                <div className="flex justify-center align-middle px-2 sm:px-12 mt-2">
                  <div className="w-full h-6 sm:h-8 bg-gray-200 rounded-lg flex align-middle justify-between">
                    <div className="px-2 py-1 flex items-center justify-center">
                      <div className="sm:p-1 bg-gray-200" />
                      <div className="text-xs sm:text-sm px-2 bg-gray-200"></div>
                    </div>

                    <div className=" p-1 sm:p-2 pe-5 ">
                      <div className={"bg-gray-200"}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* Divider */}
    </>
  );
}

// function itemSkeleton(number: number | undefined) {
//   return Array(number)
//     .fill(0)
//     .map((el, index) => (
//       <div key={index} className="animate-pulse mb-4">
//         {" "}
//         <div className="pt-4 md:pt-0 px-4 md:bg-[#ffff] bg-[#fcfcff] flex gap-2 md:rounded md:overflow-hidden md:block">
//           <div className="flex-grow-[0.75] ">
//             <div className="rounded-md bg-gray-300 md:mb-4 max-w-full max-h-40  h-40"></div>
//           </div>
//           <div className="pb-4">
//             <div className="h-4 bg-gray-300 rounded w-2/3 py-1 mb-2"></div>
//             <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
//             <div className="h-6 bg-gray-300 rounded w-40"></div>
//           </div>
//         </div>
//         <div className="bg-gray-300 h-px w-full my-2"></div>
//       </div>
//     ));
// }

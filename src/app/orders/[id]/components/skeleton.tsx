import React from "react";

export default function Skeleton() {
    return (
        <>
            <div className="hidden sm:block animate-pulse">
                <div className="border rounded-2xl h-[484px] align-middle justify-center flex flex-col my-2 animate-pulse py-2 ">
                    <div className=" px-2 sm:px-12 flex justify-center align-middle my-2 py-4 ">
                        <div className="w-1/2  h-[484px] rounded-xl py-2 ">
                            <div className="rounded-xl h-full w-full  object-cover bg-gray-200 " />
                        </div>
                        <div className="w-1/2 h-32 sm:h-48 rounded-xl m-1 p-3 sm:p-8">
                            <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-16  rounded-lg"></div>
                            <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8  rounded-lg"></div>
                            <div className="flex align-middle justify-between h-12 my-2">
                                <div className="w-2/3  bg-gray-200 py-2   rounded-full h-12"></div>
                                <div className="w-2/3  bg-gray-200 py-2   rounded-full h-12"></div>
                            </div>
                            <div className="my-3">
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md my-2"></div>
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md my-2"></div>
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md my-2"></div>
                            </div>

                        </div>
                    </div>


                </div>


            </div>
            {/* <div className="hidden sm:block">
                <div className="border rounded-2xl h-[484px] align-middle justify-center flex flex-col my-2 animate-pulse py-2 ">
                    <div className=" px-2 sm:px-12 flex justify-center align-middle my-2 py-4 ">
                        <div className="w-1/2  h-[484px] rounded-xl py-2 ">
                            <div className="rounded-xl h-full w-full  object-cover bg-gray-200 " />
                        </div>
                        <div className="w-1/2 h-32 sm:h-48 rounded-xl m-1 p-3 sm:p-8">
                            <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-16  rounded-lg"></div>
                            <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8  rounded-lg"></div>
                            <div className="flex align-middle justify-between h-12 my-2">
                                <div className="w-2/3  bg-gray-200 py-2   rounded-full h-12"></div>
                                <div className="w-2/3  bg-gray-200 py-2   rounded-full h-12"></div>
                            </div>
                            <div className="my-3">
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md"></div>
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md"></div>
                                <div className="line-clamp-2 text-ellipsis text-sm sm:text-2xl text-black overflow-hidden mb-2 bg-gray-200 h-2 sm:h-8   rounded-md"></div>

                            </div>

                        </div>
                    </div>


                </div>


            </div> */}

            <div className="block sm:hidden p-2 animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-56 w-full p-4 ">
                </div>
                <div className="w-full  bg-gray-200   p-2  h-10 rounded-full my-1"></div>
                <div className="w-full h-9 bg-gray-200 rounded-lg my-1"></div>
                <div className="my-3  h-3 w-full flex align-middle justify-between "></div>
                <div className="my-3 h-8 w-full flex align-middle justify-between "></div>
           

            </div>

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

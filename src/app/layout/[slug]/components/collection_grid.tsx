import Link from "next/link";
import React from "react";
import {getImageUrl} from "@/src/utils/firebase_utils";

const CollectionGrid = ({ collection_list }: { collection_list: any }) => {

  return (
    <div className="px-1">
      <div className="flex justify-center items-center mt-2.5 mx-10 py-4">
        <div className="flex-grow h-px bg-black m-[8px]" />
        <h2 className="mx-4 flex-shrink-0 text-black md:text-[36px] text-sm  whitespace-nowrap">
          {collection_list?.title}
        </h2>
        <div className="flex-grow h-px bg-black m-[8px]" />
      </div>

      <div className="flex space-x-4 mt-3 justify-between">
        {collection_list?.collections
          ?.slice(0, 3)
          .map((collection: any, index: number) => (
            <Link key={index} href={"/collections/" + collection?.slug} className="w-1/3">
              <div key={index} className="flex-1 space-x-1 space-y-4 w-full">
                <div className="h-36  md:h-72 lg:h-[447px] flex  justify-center bg-gray-400  relative rounded-lg w-full ">
                  <img
                    src={getImageUrl(collection?.image)}
                    alt={`Image ${index}`}
                    className="w-full max-h-full object-cover object-center rounded-lg"
                  />
                  <span className="bg-white text-black  px-2 py-1 shadow-lg rounded absolute bottom-0 left-0 right-0 m-2 text-center text-xs font-medium ">
                    {collection?.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="flex space-x-4 mt-3 justify-between">
        {collection_list?.collections
          ?.slice(3, 6)
          .map((collection: any, index: number) => (
            <Link key={index} href={"/collections/" + collection?.slug} className="w-1/3">
              <div key={index} className="flex-1 space-x-4 space-y-4 w-full">
                <div className="h-36  md:h-72 lg:h-[447px] flex  justify-center bg-gray-400  relative rounded-lg w-full">
                  <img
                    src={getImageUrl(collection?.image)}
                    alt={`Image ${index}`}
                    className="w-full max-h-full object-cover object-center rounded-lg "
                  />
                  <span className="bg-white text-black  px-2 py-1 shadow-lg rounded absolute bottom-0 left-0 right-0 m-2 text-center text-xs font-medium ">
                    {collection?.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CollectionGrid;

import Link from "next/link";
import React from "react";
import {getImageUrl} from "@/src/utils/firebase_utils";

const CollectionList = ({ collection_list }: { collection_list: any }) => {
  return (
    <div className="py-4 ps-1 md:px-0 px-1">
      <h2 className="text-black text-base font-medium sm:font-normal sm:text-3xl mb-2">
        {collection_list?.title}
      </h2>
      <div className="flex overflow-x-auto space-x-2">
        {collection_list?.collections.map((collection: any, index: number) => (
          <Link key={index} href={"/collections/" + collection.slug}>
            <div className="flex-none">
              <div
                className="w-40 h-60 bg-center bg-cover rounded-lg shadow-md relative"
                style={{
                  backgroundImage: `url(${getImageUrl(collection.image)})`,
                }}
              >
                <span className="bg-gradient-to-t from-black text-white px-2 pt-1 pb-2 rounded-lg absolute bottom-0 left-0 right-0 p-2  font-semibold">
                  {collection.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionList;

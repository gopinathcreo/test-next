
import React from "react";
import HeroList from "./hero_list";
import ProductList from "./product_list";
import BannerDuo from "./banner_duo";
import Banner from "./banner";
import Images from "./images";
import CollectionList from "./collection_list";
import CollectionGrid from "./collection_grid";

export const redirectView = (redirect: any) => {
  console.log(redirect);
  switch (redirect.type) {
    case "layout":
      window.location.href = `/layout/${redirect.layout_id}`;
      break;
    case "product":
        window.location.href = `/product/${redirect.product_slug}`;
        break;
    case "collection":
        window.location.href = `/collections/${redirect.collection_slug}`;
        break;
    case "url":
        window.location.href = redirect.url;
        break;
  }
};

async function DesignBlock(data:any) {
  let blockElements: any = [];
  let designBlocks = data.design_blocks;
  blockElements = designBlocks?.map((block: any, index: number) => {
   
    switch (block.type) {
      // case "hero_list_slick":
      //   return <HeroList key={index} hero_list={block.hero_list} />;
      case "hero_list":
        return <HeroList key={index} hero_list={block.hero_list} />;
      case "product_list":
        return <ProductList key={index} product_list={block.product_list} />;
      case "banner_duo":
        return <BannerDuo key={index} banner_duo={block.banner_duo} />;
      case "banner":
        return <Banner key={index} banner={block.design_banner} />;
      case "images":
        return <Images key={index} images={block.images} />;
      case "collection_list":
        return (
          <CollectionList key={index} collection_list={block.collection_list} />
        );
      case "collection_grid":
        return (
          <CollectionGrid key={index} collection_list={block.collection_list} />
        );
      default:
        return (
          <div key={index}>
            <h2>{block.is_mobile_view.toString()}</h2>
            <p className="text-black">{block.type}</p>
          </div>
        );
    }
  });

  return [blockElements];
}

export default DesignBlock;

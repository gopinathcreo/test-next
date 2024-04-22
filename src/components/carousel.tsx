"use client";
import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IconButton, Carousel as MTCarousel } from "@material-tailwind/react";
import { getImageUrl } from "../utils/firebase_utils";
import {redirectView} from "@/src/app/layout/[slug]/components/design_block";

export default function Carousel({ images }: { images: [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <MTCarousel
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className=""
      placeholder=""
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-3 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block w-3 h-3 cursor-pointer rounded-full transition-all ${
                activeIndex === i ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplay
      loop
      prevArrow={({ handlePrev }) => (
        <IconButton
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 !w-9 !h-9 rounded-full bg-black bg-opacity-40 select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:!w-12 md:max-w-[48px] md:!h-12 md:max-h-[48px] text-white hover:bg-black/10 active:bg-white/30 grid place-items-center"
          placeholder=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            className="-ml-1 h-7 w-7"
          >
            <path
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            ></path>
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 !w-9 !h-9 rounded-full bg-black bg-opacity-40 select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:!w-12 md:max-w-[48px] md:!h-12 md:max-h-[48px] text-white hover:bg-black/10 active:bg-white/30 grid place-items-center"
          placeholder=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            className="ml-1 h-7 w-7"
          >
            <path stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
          </svg>
        </IconButton>
      )}
    >
      {images.map((image: any, index: number) => {
        return (
          <div key={index} onClick={() => redirectView(image.redirect)}>
            <img
              src={getImageUrl(image.image)}
              alt="carousel image"
              className="md:hidden h-full w-full object-cover"
              fetchPriority="high"
            />
            <img
              src={getImageUrl(image.web_image)}
              alt="carousel image"
              className="hidden md:block h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
        );
      })}
    </MTCarousel>
  );

  // return (
  //   <div className=" max-w-7xl mx-auto bg-cover pt-2 bg-center mt-[10px]">
  //     <div className="relative">
  //       <AiOutlineLeft
  //         onClick={handlePrevSlide}
  //         className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
  //       />
  //       <div className="w-full flex overflow-hidden relative m-auto">
  //         <Swipe
  //           onSwipeLeft={handleNextSlide}
  //           onSwipeRight={handlePrevSlide}
  //           className="relative z-10 w-full"
  //         >
  //           {images.map((image: string, index: number) => {
  //             if (index === currentSlide) {
  //               return (
  //                 <Image
  //                   key={image}
  //                   src={image}
  //                   width={1400}
  //                   height={500}
  //                   className="animate-fadeIn"
  //                   alt={image}
  //                 />
  //               );
  //             }
  //           })}
  //         </Swipe>
  //       </div>
  //       <AiOutlineRight
  //         onClick={handleNextSlide}
  //         className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
  //       />

  //       <div className="relative flex justify-center p-2">
  //         {images.map((_: string, index: number) => {
  //           return (
  //             <div
  //               className={
  //                 index === currentSlide
  //                   ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
  //                   : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
  //               }
  //               key={index}
  //               onClick={() => {
  //                 setCurrentSlide(index);
  //               }}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}

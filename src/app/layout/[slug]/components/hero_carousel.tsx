import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {FreeMode, Pagination,Autoplay} from 'swiper/modules'
import { getImageUrl } from "@/src/utils/firebase_utils";
import Image from "next/image"


//navigation for mobile
const ImageNavigationMobile = ({
    images,
    activeIndex,
    onClick,
  }: {
    images: string[];
    activeIndex: number;
    onClick: (index:number)=> void;
  }) => (
    <div className="overflow-x-scroll flex gap-2 snap-x scroll-smooth justify-center">
      {
      images.map((path: string, i: number) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] w-4 ${
            activeIndex === i ? " bg-black" : "w-4 bg-gray-500"
          }`}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
  

  //image of mobile
export function  HeroCarousel({ images }: { images: [] }){
    let imagePaths: string[];
    // imagePaths = product?.variant?.images?.paths ? product?.variant?.images?.paths : product?.images?.paths;
    return (
      <div className="w-full md:w-full flex-column justify-center h-[343px] space-y-2">
        <Swiper className="z-0 "
          freeMode={false}
          pagination={{
            clickable: true,
          }}
          autoplay={true}
          modules={[FreeMode, Pagination,Autoplay]}
          // style={{
          //   "--swiper-theme-color": "black",
          // }}
        >
          {images.map((image:any, i)  => (
            <SwiperSlide key={i}>
             <Image
                src={getImageUrl(image.image)}
                alt="Carousel Image"
                width={1000}
                height={1000}
                className="object-contain h-[343px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
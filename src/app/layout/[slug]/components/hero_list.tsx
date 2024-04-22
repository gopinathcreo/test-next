
"use client"
import { redirectView } from "@/src/app/layout/[slug]/components/design_block";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import { FreeMode, Autoplay } from 'swiper/modules'
import { getImageUrl } from "@/src/utils/firebase_utils";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const HeroList = ({ hero_list }: { hero_list: any }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  if (!isMobile) {
    return <>

      {/* <Carousel images={hero_list.hero_list} /> */}
      <div className="w-full md:w-full flex-column  justify-center items-center space-y-2 h-[390px] cursor-pointer"  >
      <Swiper
        className="w-full h-full"
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
        slidesPerView={1}
        navigation
        freeMode={false}
        loop
        autoplay={{
          stopOnLastSlide: false,
         }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {hero_list.hero_list.map((image: any, index: number) => (
          <SwiperSlide key={index} className="w-full h-full"  onClick={() => redirectView(image.redirect)}>
            <Image
              src={getImageUrl(image.web_image)}
              alt="carousel image"
              width={1000}
              height={1000}
              className="object-contain w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

    </>
  } else {
    return <>
      <div className="w-full md:w-full flex-column  justify-center items-center space-y-2 h-[200px] cursor-pointer"  >
        <Swiper className=" w-full h-full"
          freeMode={false}
          pagination={{
            clickable: true,
          }}
          autoplay={true}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {hero_list.hero_list.map((image: any, index: number) => (
            <SwiperSlide key={index} className="h-full" onClick={() => redirectView(image.redirect)}>
              <Image
                src={getImageUrl(image.image)}
                alt="carousel image"
                width={1000}
                height={1000}
                className="object-contain h-full w-full md:hidden"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  }

};

export default HeroList;

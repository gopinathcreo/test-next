import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './embla_carousel_thumbs_button'
import Image from 'next/image'
import { getImageUrl } from '../utils/firebase_utils'
import Autoplay from 'embla-carousel-autoplay'


type PropType = {
    images: string[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { images, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options,[
        Autoplay({ playOnInit: true, delay: 3000,stopOnInteraction:false })
      ])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {images.map((path, index) => (
                        <div className="embla__slide object-contain h-[518px] flex align-middle" key={index}>
                            <Image src={getImageUrl(path)} width={1000} height={1000} alt={`Slide ${index}`} className=" object-contain flex align-middle" priority />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {images.map((path, index) => (
                            <Thumb
                            
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                path={path}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel


{/*
//navigation for desktop
const ImageNavigation = ({
  images,
  activeIndex,
  onClick,
}: {
  images: string[];
  activeIndex: number;
  onClick: (index:number)=>void;
}) => (
  <div className="overflow-x-scroll flex gap-2 snap-x scroll-smooth ">
    {images.map((path: string, i: number) => (
      <img
        key={i}
        src={getImageUrl(path)}
        alt={`Image ${i}`}
        className={`block h-24 cursor-pointer transition-all content-[''] object-contain w-24 border
        }`}
        onClick={() => onClick(i)}
      />

      
    ))}
  </div>
   /*${
          activeIndex === i ? "w-24 bg-black " : "w-24 bg-white"
        } 
); */}

{/*
 */}
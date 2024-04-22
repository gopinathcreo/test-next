
'use client'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function EmblaCarousel() {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })//[Autoplay({ delay: 2000 })]
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className='embla'>
            <div className="embla__viewport border max-w-lg mx-auto h-56" ref={emblaRef}>
                <div className="embla__container h-full">
                    <div className="embla__slide flex justify-center items-center">Slide 1</div>
                    <div className="embla__slide flex justify-center items-center">Slide 2</div>
                    <div className="embla__slide flex justify-center items-center">Slide 3</div>
                </div>
            </div>
            <div>
                <button className="embla__prev m-2" onClick={scrollPrev}>
                    Prev
                </button>
                <button className="embla__next m-2" onClick={scrollNext}>
                    Next
                </button>
            </div>
        </div>

    )
}
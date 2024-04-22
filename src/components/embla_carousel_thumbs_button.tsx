import React from 'react'
import Image from 'next/image'
import { getImageUrl } from '../utils/firebase_utils'



type PropType = {
    selected: boolean
    index: number
    onClick: () => void
    path: string
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, index, onClick, path } = props

    return (
        <div
            className={'embla-thumbs__slide border mx-1 flex items-center justify-center'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number border"
            >
                <Image src={getImageUrl(path)} alt="Product Image" width={1000} height={1000} className="block h-24 w-24 cursor-pointer transition-all content-[''] object-contain "
                ></Image>
            </button>
        </div>
    )
}

import { FC, ReactNode } from 'react'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import styles from './Carousel.module.css'

interface Props {
  className?: any
  images: string[] | String[];
}


export const Carousel: FC<Props> = ({ className, images, ...props }) => {
  return (
    <div className={styles.carouselWrap}>
      <Splide
        options={{
          type: "loop",
          autoWidth: true,
          padding: '10%',
          fixedWidth: '10rem',
          gap: '1rem',
        }
        }>
        {images.map((image, i) => (
          <SplideSlide key={`${images}-${i}`}>
            <Image
              src={image}
              alt={`Image`}
              width={300}
              height={300}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
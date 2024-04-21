import { FC } from "react";
import styles from "./Slider.module.css"
import Image from "next/image";
import Link from "next/link";

interface Props {
  images: string[]
  size?: number | string
  alt?: string
  noImage?: any
}

export const Slider: FC<Props> = ({
  images,
  size,
  alt,
  noImage,
  ...props
}) => {
  return (
    <div className={styles.sliderWrap}>
      <div className={styles.sliderList}>
        {images.map((images) => (
          <div className={styles.sliderItem}>
            <Link href="">
              <Image
                priority={true}
                src={images}
                alt="item"
                width={136}
                height={136}
                key={images}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
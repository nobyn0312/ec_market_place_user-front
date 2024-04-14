import { FC } from "react";
import styles from "./Slider.module.css"
import Image from "next/image";

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
      <ul className={styles.sliderList}>
        {images.map((images) => (
          <li>
            <div className={styles.inner}>
              <Image
                priority={true}
                src={images}
                alt="item"
                width={136}
                height={136}
                key={images}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
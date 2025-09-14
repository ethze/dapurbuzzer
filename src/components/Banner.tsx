"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./scss/Banner.module.scss";

export default function Banner() {
  const banners = [
    { src: "/banner1.png", href: "/" },
    { src: "/banner2.png", href: "/" },
    { src: "/banner3.png", href: "/" },
    { src: "/banner4.png", href: "/" },
    { src: "/banner5.png", href: "/" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div>
      <div className={styles.bannerWrapper}>
        {banners.map((banner, i) => (
          <a
            key={i}
            href={banner.href}
            className={`${styles.bannerItem} ${i === index ? styles.active : ""}`}
          >
            <Image
              src={banner.src}
              alt={`Banner ${i + 1}`}
              fill
              className={styles.bannerImg}
              sizes="(max-width: 600px) 100vw, 460px"
            />
          </a>
        ))}
      </div>

      <div className={styles.dots}>
        {banners.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}


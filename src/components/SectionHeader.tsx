"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { IoChevronForwardOutline } from "react-icons/io5";
import styles from "./scss/SectionHeader.module.scss";

interface SectionHeaderProps {
  icon: IconType;
  text: string;
  color?: string; 
  href: string;
}

export default function SectionHeader({
  icon: Icon,
  text,
  color = "#811ac9",
  href,
}: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.left}>
        <div className={styles.iconBox} style={{ backgroundColor: color }}>
          <Icon />
        </div>
        <span className={styles.title}>{text}</span>
      </div>

      <Link href={href} className={styles.link}>
        Lihat Lainnya <IoChevronForwardOutline />
      </Link>
    </div>
  );
}


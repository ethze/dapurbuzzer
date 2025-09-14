"use client";

import { IoChatbubbleOutline } from "react-icons/io5";
import styles from "./scss/HelpSection.module.scss";

export default function HelpSection() {
  return (
    <div className={styles.helpSection}>
      <p className={styles.title}>Butuh Bantuan?</p>

      <button className={styles.outlineBtn}>
        <IoChatbubbleOutline className={styles.icon} />
        <span>Tanya tentang Dapur Buzzer</span>
      </button>

      <button className={styles.solidBtn}>
        Gabung bersama kami
      </button>
    </div>
  );
}


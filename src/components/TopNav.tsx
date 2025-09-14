"use client";

import { useState } from "react";
import Image from "next/image";
import {
    IoSearchOutline,
    IoMenuOutline,
    IoHomeOutline,
    IoPersonOutline,
    IoFlashOutline,
    IoMegaphoneOutline,
    IoBriefcaseOutline,
    IoPeopleOutline,
    IoDocumentTextOutline,
    IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import styles from "./scss/TopNav.module.scss";

export default function TopNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className={styles.navbar}>
                <div className={styles.logo}>
                    <Image
                        src="/icon.svg"
                        alt="Dapur Buzzer"
                        width={100}
                        height={40}
                        priority
                    />
                </div>

                <div className={styles.searchBox}>
                    <IoSearchOutline className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Cari Influencer..."
                        className={styles.searchInput}
                    />
                </div>

                <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
                    <IoMenuOutline />
                </button>
            </header>

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <div className={styles.sidebarLogo}>
                    <Image
                        src="/icon.svg"
                        alt="Dapur Buzzer"
                        width={100}
                        height={40}
                        priority
                    />
                </div>

                <nav>
                    <ul>
                        <li>
                            <IoHomeOutline /> Home
                        </li>
                        <li>
                            <IoPersonOutline /> About
                        </li>
                        <li>
                            <IoFlashOutline /> Influencer
                        </li>
                        <li>
                            <IoMegaphoneOutline /> Campaign
                        </li>
                        <li>
                            <IoBriefcaseOutline /> Package
                        </li>
                        <li>
                            <IoPeopleOutline /> Join Influencer
                        </li>
                        <li>
                            <IoDocumentTextOutline /> Terms & Conditions
                        </li>
                        <li>
                            <IoChatbubbleEllipsesOutline /> FAQ
                        </li>
                    </ul>
                </nav>
            </aside>

            <div
                className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
                onClick={() => setIsOpen(false)}
            />
        </>
    );
}


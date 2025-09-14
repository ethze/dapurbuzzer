"use client";

import { IoHomeOutline, IoFlashOutline, IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import styles from "./scss/bottomNav.module.scss";
import { useState } from "react";

export default function BottomNav() {
    const [active, setActive] = useState("home");

    const menu = [
        { id: "home", label: "Home", icon: <IoHomeOutline /> },
        { id: "recommended", label: "Recommended", icon: <IoFlashOutline /> },
        { id: "search", label: "Search", icon: <IoSearchOutline /> },
        { id: "about", label: "About Us", icon: <IoPersonOutline /> },
    ];

    return (
        <nav className={styles.bottomNav}>
            {menu.map((item) => (
                <button
                    key={item.id}
                    className={`${styles.navItem} ${active === item.id ? styles.active : ""}`}
                    onClick={() => setActive(item.id)}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
}


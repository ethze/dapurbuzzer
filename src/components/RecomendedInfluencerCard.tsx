"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import {
    IoFlashOutline,
    IoLogoInstagram,
    IoPeopleOutline,
    IoChevronForwardOutline,
} from "react-icons/io5";
import styles from "./scss/RecomendedInfluencerCard.module.scss";
import { useRandomRecommendedInfluencers } from "@/hooks/useInfluencers";
import { useNumberFormat } from "@/context/NumberFormatContext";

export default function RecomendedInfluencerCard() {
    const { influencers, loading, error } = useRandomRecommendedInfluencers();
    const { format } = useNumberFormat();
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loading && listRef.current) {
            listRef.current.scrollLeft = 0;
        }
    }, [loading]);

    // local NO state
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        startX = e.pageX - (listRef.current?.offsetLeft ?? 0);
        scrollLeft = listRef.current?.scrollLeft ?? 0;
    };

    const handleMouseLeave = () => (isDown = false);
    const handleMouseUp = () => (isDown = false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !listRef.current) return;
        e.preventDefault();
        const x = e.pageX - listRef.current.offsetLeft;
        const walk = x - startX;
        listRef.current.scrollLeft = scrollLeft - walk;
    };

    if (loading) {
        return (
            <div className={styles.list}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`${styles.card} ${styles.skeleton}`}>
                        <div className={`${styles.imageWrapper} ${styles.skeletonBox}`} />
                        <div className={styles.content}>
                            <div className={`${styles.skeletonBox} ${styles.skeletonText} ${styles.w70}`} />
                            <div className={`${styles.skeletonBox} ${styles.skeletonText} ${styles.w50}`} />
                            <div className={`${styles.skeletonBox} ${styles.skeletonText} ${styles.w80}`} />
                            <div className={`${styles.skeletonBox} ${styles.skeletonButton}`} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;
    if (influencers.length === 0) return <p>No recommended influencers found.</p>;

    return (
        <div
            ref={listRef}
            className={styles.list}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {influencers.map((item) => (
                <div key={item.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={item.image ?? "/placeholder.png"}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 140px"
                            className={styles.image}
                        />
                        {item.is_recommended && (
                            <div className={styles.badge}>
                                <IoFlashOutline size={16} />
                            </div>
                        )}
                    </div>

                    <div className={styles.content}>
                        <h3 className={styles.name}>{item.name}</h3>
                        <p className={styles.role}>{item.role ?? "Content Creator"}</p>

                        <div className={styles.meta}>
                            <span className={styles.username}>
                                <IoLogoInstagram /> @{item.ig_username}
                            </span>
                            <span className={styles.followers}>
                                <IoPeopleOutline /> {format(item.ig_followers ?? 0)} Followers
                            </span>
                        </div>

                        <button className={styles.button}>
                            <span>Book Now</span>
                            <div className={styles.iconWrapper}>
                                <IoChevronForwardOutline />
                            </div>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


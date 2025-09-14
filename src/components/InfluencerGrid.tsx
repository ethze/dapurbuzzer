"use client";

import Image from "next/image";
import {
    IoFlashOutline,
    IoLogoInstagram,
    IoPeopleOutline,
    IoChevronForwardOutline,
} from "react-icons/io5";
import styles from "./scss/InfluencerGrid.module.scss";
import { useRandomInfluencers } from "@/hooks/useInfluencers";
import { useNumberFormat } from "@/context/NumberFormatContext";


export default function InfluencerGrid() {
    const { influencers, loading, error, refresh } = useRandomInfluencers();
    const { format } = useNumberFormat();


    if (loading) {
        return (
            <div className={styles.grid}>
                {Array.from({ length: 9 }).map((_, i) => (
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
    if (influencers.length === 0) return <p>No influencers found.</p>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                {influencers.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.image || "/placeholder.png"}
                                alt={item.name}
                                sizes="(max-width: 768px) 100vw, 140px"
                                fill
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
                            <p className={styles.role}>{item.role || "Content Creator"}</p>

                            <div className={styles.meta}>
                                <span className={styles.username}>
                                    <IoLogoInstagram /> @{item.ig_username || "username"}
                                </span>
                                <span className={styles.followers}>
                                    <IoPeopleOutline /> {format(item.ig_followers || 0)} Followers
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

            <button className={styles.viewAllBtn} onClick={refresh}>
                Lihat semua Influencer
            </button>
        </div>
    );
}


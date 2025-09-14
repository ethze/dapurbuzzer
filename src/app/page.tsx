"use client";

import styles from "./page.module.scss";
import BottomNav from "../components/BottomNav";
import Banner from "../components/Banner";
import SectionHeader from "../components/SectionHeader";
import HelpSection from "../components/HelpSection";
import { InfluencerProvider } from "@/context/InfluencerContext";
import RecomendedInfluencerCard from "@/components/RecomendedInfluencerCard";
import InfluencerGrid from "../components/InfluencerGrid";
import TopNav from "../components/TopNav";
import { NumberFormatProvider } from "@/context/NumberFormatContext";

import {
    IoFlashOutline,
    IoPeopleOutline,
    IoPhonePortraitOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoGameControllerOutline,
    IoAirplaneOutline,
    IoRestaurantOutline,
    IoMusicalNotesOutline,
    IoGridOutline,
} from "react-icons/io5";

export default function Home() {

    return (
        <div className={styles.page}>
            <main className={styles.container}>
                <BottomNav />
                <TopNav />
                <Banner />
                <section className={styles.categoryGrid}>
                    <div className={styles.categoryItem}>
                        <IoPhonePortraitOutline />
                        <span>Technology</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoPersonOutline />
                        <span>Content Creator</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoShirtOutline />
                        <span>Beauty & Fashion</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoGameControllerOutline />
                        <span>Gaming</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoAirplaneOutline />
                        <span>Travel & Lifestyle</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoRestaurantOutline />
                        <span>Food & Beverages</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoMusicalNotesOutline />
                        <span>Entertainment</span>
                    </div>
                    <div className={styles.categoryItem}>
                        <IoGridOutline />
                        <span>Show All</span>
                    </div>
                </section>

                <SectionHeader
                    icon={IoFlashOutline}
                    text="Recommended Influencer"
                    color="#811ac9"
                    href="/influencer/recommended"
                />
                <NumberFormatProvider>
                    <InfluencerProvider>
                        <RecomendedInfluencerCard />
                    </InfluencerProvider>
                </NumberFormatProvider>

                <HelpSection />

                <SectionHeader
                    icon={IoPeopleOutline}
                    text="Influencer Lainnya"
                    color="#811ac9"
                    href="/influencer/recommended"
                />
                <NumberFormatProvider>
                    <InfluencerProvider>
                        <InfluencerGrid />
                    </InfluencerProvider>
                </NumberFormatProvider>
            </main>
        </div>
    );
}


"use client";

import { useInfluencerContext, Influencer } from "@/context/InfluencerContext";

/* ============================
   Semua hook untuk influencer
===============================*/

// Ambil semua influencer
export function useAllInfluencers() {
  const { influencers, loading, error, refresh } = useInfluencerContext();
  return { influencers, loading, error, refresh };
}

// Ambil semua influencer recommended
export function useAllRecommendedInfluencers() {
  const { influencers, loading, error, refresh } = useInfluencerContext();
  const recommended = influencers.filter((i: Influencer) => i.is_recommended);
  return { influencers: recommended, loading, error, refresh };
}

// Ambil 10 influencer recommended random
export function useRandomRecommendedInfluencers() {
  const { influencers, loading, error, refresh } = useInfluencerContext();
  const recommended = influencers.filter((i: Influencer) => i.is_recommended);
  const random = recommended.sort(() => 0.5 - Math.random()).slice(0, 10);
  return { influencers: random, loading, error, refresh };
}

export function useRandomInfluencers() {
  const { influencers, loading, error, refresh } = useInfluencerContext();

  let random: Influencer[] = [];

  if (influencers.length > 0) {
    // Pisahkan recommended dan non-recommended
    const recommended = influencers.filter(i => i.is_recommended);
    const nonRecommended = influencers.filter(i => !i.is_recommended);

    // Ambil maksimal 3 recommended
    const selectedRecommended = recommended
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Ambil sisanya dari non-recommended supaya total 9
    const remaining = 6 - selectedRecommended.length;
    const selectedNonRecommended = nonRecommended
      .sort(() => 0.5 - Math.random())
      .slice(0, remaining);

    // Gabungkan & shuffle lagi
    random = [...selectedRecommended, ...selectedNonRecommended].sort(() => 0.5 - Math.random());
  }

  return { influencers: random, loading, error, refresh };
}



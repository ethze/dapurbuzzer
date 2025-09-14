"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Influencer = {
  id: number;
  name: string;
  image: string | null;
  ig_username: string | null;
  ig_followers: number | null;
  role?: string | null;
  is_recommended?: boolean;
};

type InfluencerContextType = {
  influencers: Influencer[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const InfluencerContext = createContext<InfluencerContextType | undefined>(undefined);

export function InfluencerProvider({ children }: { children: ReactNode }) {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInfluencers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/influencer");
      if (!res.ok) throw new Error("Failed to fetch influencers");

      const data: Influencer[] = await res.json();
      setInfluencers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  return (
    <InfluencerContext.Provider
      value={{ influencers, loading, error, refresh: fetchInfluencers }}
    >
      {children}
    </InfluencerContext.Provider>
  );
}

export function useInfluencerContext() {
  const context = useContext(InfluencerContext);
  if (!context) {
    throw new Error("useInfluencerContext must be used within an InfluencerProvider");
  }
  return context;
}


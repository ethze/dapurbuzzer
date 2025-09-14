"use client";

import styles from "./page.module.scss";

export default function DocumentationPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>API Documentation</h1>
            <p>
                This is an early-stage API dengan fokus pada struktur proyek.
                Ini menjadi gambaran awal dari arah pengembangan ke depannya. 
                <span style={{ color: '#FF6700', fontWeight: '600' }}>
                    [authentication is not set up]
                </span>
            </p>


            {/* ===================== Categories ===================== */}
            <section>
                <h2 className={styles.sectionTitle}>Categories</h2>

                <h3 className={styles.endpoint}>GET /api/category</h3>
                <p className={styles.description}>Mengambil semua kategori.</p>
                <pre className={styles.code}>
                    {`[
  { "id": 1, "name": "Fashion" },
  { "id": 2, "name": "Beauty" },
  { "id": 3, "name": "Tech" }
]`}
                </pre>

                <h3 className={styles.endpoint}>POST /api/category</h3>
                <p className={styles.description}>Menambahkan kategori baru.</p>
                <pre className={styles.code}>
                    {`{
  "name": "Lifestyle"
}`}
                </pre>

                <h3 className={styles.endpoint}>GET /api/category/[id]</h3>
                <p className={styles.description}>Mengambil kategori berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "id": 1,
  "name": "Fashion"
}`}
                </pre>

                <h3 className={styles.endpoint}>PUT /api/category/[id]</h3>
                <p className={styles.description}>Mengupdate kategori berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "name": "Fashion & Style"
}`}
                </pre>

                <h3 className={styles.endpoint}>DELETE /api/category/[id]</h3>
                <p className={styles.description}>Menghapus kategori berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "message": "Deleted successfully"
}`}
                </pre>
            </section>

            {/* ===================== Influencers ===================== */}
            <section>
                <h2 className={styles.sectionTitle}>Influencers</h2>

                <h3 className={styles.endpoint}>GET /api/influencer</h3>
                <p className={styles.description}>Mengambil semua influencer.</p>
                <pre className={styles.code}>
                    {`[
  {
    "id": 1,
    "name": "Aldi",
    "image": "https://example.com/aldi.jpg",
    "ig_username": "aldi_ig",
    "ig_followers": 12000,
    "role": "1 [id]",
    "is_recommended": true
  },
  {
    "id": 2,
    "name": "Budi",
    "image": null,
    "ig_username": "budi_ig",
    "ig_followers": 8000,
    "role": "Influencer",
    "is_recommended": false
  }
]`}
                </pre>

                <h3 className={styles.endpoint}>POST /api/influencer</h3>
                <p className={styles.description}>Menambahkan influencer baru.</p>
                <pre className={styles.code}>
                    {`{
  "name": "Citra",
  "image": "https://example.com/citra.jpg",
  "ig_username": "citra_ig",
  "ig_followers": 15000,
  "role": "1 [id]",
  "is_recommended": true
}`}
                </pre>

                <h3 className={styles.endpoint}>GET /api/influencer/[id]</h3>
                <p className={styles.description}>Mengambil influencer berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "id": 1,
  "name": "Aldi",
  "image": "https://example.com/aldi.jpg",
  "ig_username": "aldi_ig",
  "ig_followers": 12000,
  "role": "1 [id]",
  "is_recommended": true
}`}
                </pre>

                <h3 className={styles.endpoint}>PUT /api/influencer/[id]</h3>
                <p className={styles.description}>Mengupdate influencer berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "ig_followers": 13000,
  "is_recommended": false
}`}
                </pre>

                <h3 className={styles.endpoint}>DELETE /api/influencer/[id]</h3>
                <p className={styles.description}>Menghapus influencer berdasarkan ID.</p>
                <pre className={styles.code}>
                    {`{
  "message": "Deleted successfully"
}`}
                </pre>
            </section>

            {/* ===================== Hooks ===================== */}
            <section>
                <h2 className={styles.sectionTitle}>Hooks</h2>
                <p className={styles.description}>Beberapa hooks untuk mengambil influencer di frontend:</p>
                <ul className={styles.list}>
                    <li>
                        <span className={styles.orange}>useAllInfluencers()</span> - Mengambil semua influencer
                    </li>
                    <li>
                        <span className={styles.orange}>useAllRecommendedInfluencers()</span> - Mengambil semua influencer recommended
                    </li>
                    <li>
                        <span className={styles.orange}>useRandomRecommendedInfluencers()</span> - Mengambil 10 influencer recommended random
                    </li>
                    <li>
                        <span className={styles.orange}>useRandomInfluencers()</span> - Mengambil 9 influencer random, maksimal 3 recommended
                    </li>
                </ul>

                <h3 className={styles.endpoint}>Contoh penggunaan:</h3>
                <pre className={styles.code}>
                    {`import { useRandomInfluencers } from "@/hooks/useInfluencers";

export default function InfluencerList() {
  const { influencers, loading, error, refresh } = useRandomInfluencers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {influencers.map(i => (
        <li key={i.id}>{i.name} ({i.ig_followers} followers)</li>
      ))}
    </ul>
  );
}`}
                </pre>
            </section>
        </div>
    );
}


"use client";

import { useState, useEffect } from "react";
import { InfluencerProvider, useInfluencerContext, Influencer } from "@/context/InfluencerContext";
import styles from "./InfluencerAdmin.module.scss";
import ImageCropper from "@/components/ImageCropper";

function AdminInfluencerPageInner() {
  const { influencers, loading, error, refresh } = useInfluencerContext();

  // state
  const [search, setSearch] = useState("");
  const [showCropper, setShowCropper] = useState(false);

  const [editing, setEditing] = useState<Influencer | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState<string>(""); // pakai string
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name ?? "");
      setUsername(editing.ig_username ?? "");
      setFollowers(editing.ig_followers ? String(editing.ig_followers) : "");
      setPreview(editing.image ?? null);
      setFile(null);
    } else {
      setName("");
      setUsername("");
      setFollowers("");
      setPreview(null);
      setFile(null);
    }
  }, [editing]);

  const filtered = influencers.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ig_username", username);
    formData.append("ig_followers", followers ? String(Number(followers)) : "0"); // convert
    if (file) formData.append("file", file);

    const url = editing && editing.id
      ? `/api/influencer/${editing.id}`
      : "/api/influencer";
    const method = editing && editing.id ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });
    if (res.ok) {
      await refresh();
      setEditing(null);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus influencer ini?")) return;
    setDeletingId(id);
    await fetch(`/api/influencer/${id}`, { method: "DELETE" });
    await refresh();
    setDeletingId(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin - Influencer</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Cari influencer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() =>
            setEditing({
              id: 0,
              name: "",
              ig_username: "",
              ig_followers: 0,
              image: null,
            })
          }
        >
          + Tambah
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nama</th>
            <th>IG</th>
            <th>Followers</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inf) => (
            <tr key={inf.id}>
              <td>
                {inf.image ? (
                  <img src={inf.image} alt={inf.name} className={styles.avatar} />
                ) : (
                  "-"
                )}
              </td>
              <td>{inf.name}</td>
              <td>@{inf.ig_username}</td>
              <td>{inf.ig_followers?.toLocaleString()}</td>
              <td>
                <button onClick={() => setEditing(inf)}>Edit</button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(inf.id)}
                  disabled={deletingId === inf.id}
                >
                  {deletingId === inf.id ? "Menghapus..." : "Hapus"}
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>

      {editing && (
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editing.id ? "Edit Influencer" : "Tambah Influencer"}</h2>

            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="IG Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="number"
              placeholder="Followers"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
            />

            {preview && (
              <div className={styles.preview}>
                <img src={preview} alt="Preview" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                if (f) {
                  setFile(f);
                  setShowCropper(true);
                }
              }}
            />

            <div className={styles.actions}>
              <button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showCropper && file && (
        <ImageCropper
          file={file}
          onCancel={() => {
            setFile(null);
            setShowCropper(false);
          }}
          onCropDone={(croppedBlob, previewUrl) => {
            setFile(new File([croppedBlob], file.name, { type: "image/jpeg" }));
            setPreview(previewUrl);
            setShowCropper(false);
          }}
        />
      )}
    </div>
  );
}

export default function AdminInfluencerPage() {
  return (
    <InfluencerProvider>
      <AdminInfluencerPageInner />
    </InfluencerProvider>
  );
}


"use client";

import { ArrowLeft, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

type AlbumForm = {
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  coverImageUrl: string;
  imageUrls: string[];
  photographCount: string;
};

const emptyAlbum: AlbumForm = {
  title: "",
  category: "Weddings",
  date: "",
  location: "",
  description: "",
  coverImageUrl: "",
  imageUrls: [],
  photographCount: "24"
};

type CloudinaryUploadResponse = {
  secure_url: string;
};

type SelectedImagePreview = {
  name: string;
  url: string;
};

export function AdminAlbumForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [albumForm, setAlbumForm] = useState(emptyAlbum);
  const [loading, setLoading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");
  const [galleryUploadError, setGalleryUploadError] = useState("");
  const [selectedCoverPreview, setSelectedCoverPreview] = useState<SelectedImagePreview | null>(null);
  const [selectedGalleryPreviews, setSelectedGalleryPreviews] = useState<SelectedImagePreview[]>([]);
  const selectedCoverPreviewRef = useRef(selectedCoverPreview);
  const selectedGalleryPreviewsRef = useRef(selectedGalleryPreviews);

  useEffect(() => {
    selectedCoverPreviewRef.current = selectedCoverPreview;
  }, [selectedCoverPreview]);

  useEffect(() => {
    selectedGalleryPreviewsRef.current = selectedGalleryPreviews;
  }, [selectedGalleryPreviews]);

  useEffect(() => {
    return () => {
      if (selectedCoverPreviewRef.current) URL.revokeObjectURL(selectedCoverPreviewRef.current.url);
      selectedGalleryPreviewsRef.current.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, []);

  async function addAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...albumForm,
          imageUrls: albumForm.imageUrls.length ? albumForm.imageUrls : albumForm.coverImageUrl ? [albumForm.coverImageUrl] : [],
          photographCount: Number(albumForm.photographCount)
        })
      });

      if (!response.ok) {
        showToast({ tone: "error", message: "Album could not be saved. Please check the details and try again." });
        return;
      }

      showToast({ tone: "success", message: "Album saved." });
      router.push("/admin/albums");
      router.refresh();
    } catch {
      showToast({ tone: "error", message: "Album could not be saved right now. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  async function uploadToCloudinary(files: File[]) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Image uploads are not available right now. Please paste an image URL instead.");
    }

    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "ceylon-frame-studio/albums");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Image upload failed. Please try another image or paste an image URL.");
      const payload = (await response.json()) as CloudinaryUploadResponse;
      uploadedUrls.push(payload.secure_url);
    }

    return uploadedUrls;
  }

  async function uploadCoverImage(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];

    setSelectedCoverPreview((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return { name: file.name, url: URL.createObjectURL(file) };
    });

    setCoverUploadError("");
    setCoverUploading(true);

    try {
      const [coverImageUrl] = await uploadToCloudinary([file]);
      setAlbumForm((current) => ({ ...current, coverImageUrl: coverImageUrl || current.coverImageUrl }));
      showToast({ tone: "success", message: "Cover image uploaded." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Cover upload failed. Please try again.";
      setCoverUploadError(message);
      showToast({ tone: "error", message });
    } finally {
      setCoverUploading(false);
    }
  }

  async function uploadGalleryImages(files: FileList | null) {
    if (!files?.length) return;
    const selectedFiles = Array.from(files);

    setSelectedGalleryPreviews((current) => {
      current.forEach((preview) => URL.revokeObjectURL(preview.url));
      return selectedFiles.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    });

    setGalleryUploadError("");
    setGalleryUploading(true);

    try {
      const uploadedUrls = await uploadToCloudinary(selectedFiles);
      setAlbumForm((current) => ({
        ...current,
        imageUrls: [...current.imageUrls, ...uploadedUrls],
        photographCount: current.photographCount === "24" ? String([...current.imageUrls, ...uploadedUrls].length) : current.photographCount
      }));
      showToast({ tone: "success", message: "Album images uploaded." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gallery upload failed. Please try again.";
      setGalleryUploadError(message);
      showToast({ tone: "error", message });
    } finally {
      setGalleryUploading(false);
    }
  }

  function removeUploadedImage(url: string) {
    setAlbumForm((current) => {
      const imageUrls = current.imageUrls.filter((imageUrl) => imageUrl !== url);
      return { ...current, imageUrls };
    });
  }

  function removeCoverImage() {
    setAlbumForm((current) => ({ ...current, coverImageUrl: "" }));
    setSelectedCoverPreview((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
  }

  const input = "min-h-12 w-full min-w-0 rounded-md border border-ink/15 bg-white px-4 py-3 text-base shadow-sm transition placeholder:text-charcoal/35 focus:border-gold sm:text-sm";

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <div className="mb-6 sm:mb-8">
        <LinkButton href="/admin/albums" variant="outline"><ArrowLeft size={18} /> Albums</LinkButton>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">New album</p>
        <h1 className="mt-3 font-serif text-4xl leading-none sm:text-6xl">Add Album</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal/70 sm:text-base">Create a new album entry with a cover, gallery images, location, and short description.</p>
      </div>

      <form onSubmit={addAlbum} className="grid gap-5 rounded-lg bg-white p-4 shadow-[0_18px_70px_rgba(17,16,14,0.08)] ring-1 ring-ink/10 sm:p-6 md:p-8">
        <h2 className="flex items-center gap-3 font-serif text-2xl sm:text-4xl"><ImagePlus className="shrink-0 text-gold" /> Album Details</h2>
        <input aria-label="Album title" className={input} placeholder="Title" value={albumForm.title} onChange={(event) => setAlbumForm({ ...albumForm, title: event.target.value })} />
        <div className="grid gap-4 md:grid-cols-2">
          <select aria-label="Album category" className={input} value={albumForm.category} onChange={(event) => setAlbumForm({ ...albumForm, category: event.target.value })}>
            {["Weddings", "Pre-shoots", "Portraits", "Fashion", "Events", "Family", "Product Photography", "Commercial Photography"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <input aria-label="Album date or year" className={input} placeholder="Date or year" value={albumForm.date} onChange={(event) => setAlbumForm({ ...albumForm, date: event.target.value })} />
        </div>
        <input aria-label="Album location" className={input} placeholder="Location" value={albumForm.location} onChange={(event) => setAlbumForm({ ...albumForm, location: event.target.value })} />
        <div className="grid gap-3 rounded-lg border border-dashed border-ink/20 bg-bone/70 p-3 sm:p-4">
          <label className="grid gap-3 text-sm font-semibold">
            Cover image
            <input className="w-full rounded-md border border-ink/10 bg-white p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" type="file" accept="image/*" disabled={coverUploading} onChange={(event) => uploadCoverImage(event.target.files)} />
          </label>
          <p className="text-xs leading-5 text-charcoal/60">This image appears as the album cover card and hero image.</p>
          {coverUploading ? <p className="text-sm font-semibold text-gold">Uploading cover...</p> : null}
          {coverUploadError ? <p className="text-sm text-red-700">{coverUploadError}</p> : null}
          {selectedCoverPreview ? (
            <div className="overflow-hidden rounded-md border border-ink/10 bg-white">
              <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url(${selectedCoverPreview.url})` }} role="img" aria-label={selectedCoverPreview.name} />
              <p className="truncate px-3 py-2 text-xs font-semibold text-charcoal/70">{selectedCoverPreview.name}</p>
            </div>
          ) : null}
          {albumForm.coverImageUrl ? (
            <div className="overflow-hidden rounded-md border border-ink/10 bg-white">
              <div className="relative aspect-[16/10] bg-mist">
                <Image src={albumForm.coverImageUrl} alt="Uploaded cover image" fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover" />
              </div>
              <button type="button" onClick={removeCoverImage} className="flex min-h-10 w-full items-center justify-center gap-2 bg-ink px-3 py-2 text-xs font-semibold text-white">
                <X size={14} /> Remove Cover
              </button>
            </div>
          ) : null}
        </div>

        <input aria-label="Cover image URL" className={input} placeholder="Cover image URL" value={albumForm.coverImageUrl} onChange={(event) => setAlbumForm({ ...albumForm, coverImageUrl: event.target.value })} />

        <div className="grid gap-3 rounded-lg border border-dashed border-ink/20 bg-bone/70 p-3 sm:p-4">
          <label className="grid gap-3 text-sm font-semibold">
            Album gallery images
            <input className="w-full rounded-md border border-ink/10 bg-white p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" type="file" accept="image/*" multiple disabled={galleryUploading} onChange={(event) => uploadGalleryImages(event.target.files)} />
          </label>
          <p className="text-xs leading-5 text-charcoal/60">Select all photos that should appear inside the album gallery.</p>
          {galleryUploading ? <p className="text-sm font-semibold text-gold">Uploading album images...</p> : null}
          {galleryUploadError ? <p className="text-sm text-red-700">{galleryUploadError}</p> : null}
          {selectedGalleryPreviews.length ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Selected images</p>
              <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4">
                {selectedGalleryPreviews.map((preview) => (
                  <div key={preview.url} className="overflow-hidden rounded-md border border-ink/10 bg-white">
                    <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${preview.url})` }} role="img" aria-label={preview.name} />
                    <p className="truncate px-2 py-1.5 text-[11px] font-semibold text-charcoal/60">{preview.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {albumForm.imageUrls.length ? (
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
              {albumForm.imageUrls.map((url) => (
                <div key={url} className="overflow-hidden rounded-md border border-ink/10 bg-white">
                  <div className="relative aspect-[4/3] bg-mist">
                    <Image src={url} alt="Uploaded album image" fill sizes="(min-width: 640px) 180px, 100vw" className="object-cover" />
                  </div>
                  <button type="button" onClick={() => removeUploadedImage(url)} className="flex min-h-10 w-full items-center justify-center gap-2 bg-ink px-3 py-2 text-xs font-semibold text-white">
                    <X size={14} /> Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <input aria-label="Number of photographs" className={input} type="number" min="1" placeholder="Photo count" value={albumForm.photographCount} onChange={(event) => setAlbumForm({ ...albumForm, photographCount: event.target.value })} />
        <textarea aria-label="Album description" className={input} rows={5} placeholder="Description" value={albumForm.description} onChange={(event) => setAlbumForm({ ...albumForm, description: event.target.value })} />
        <Button type="submit" disabled={loading} className="mt-1">{loading ? "Adding..." : "Add Album"}</Button>
      </form>
    </div>
  );
}

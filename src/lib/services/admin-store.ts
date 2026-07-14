import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StoredAdminAlbum, StoredMessage } from "@/types/admin";
import type { ContactFormValues } from "@/lib/validations/contact";
import type { AdminAlbumValues } from "@/lib/validations/admin";

const storageDir = path.join(process.cwd(), "data", "admin");
const messagesFile = path.join(storageDir, "messages.json");
const albumsFile = path.join(storageDir, "albums.json");

async function ensureStorage() {
  await mkdir(storageDir, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureStorage();
  try {
    const content = await readFile(file, "utf8");
    return JSON.parse(content) as T;
  } catch {
    await writeJson(file, fallback);
    return fallback;
  }
}

async function writeJson<T>(file: string, value: T) {
  await ensureStorage();
  await writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveContactMessage(values: ContactFormValues) {
  const messages = await getContactMessages();
  const message: StoredMessage = {
    ...values,
    id: createId("msg"),
    status: "new",
    createdAt: new Date().toISOString()
  };
  await writeJson(messagesFile, [message, ...messages]);
  return message;
}

export async function getContactMessages() {
  return readJson<StoredMessage[]>(messagesFile, []);
}

export async function getAdminAlbums() {
  return readJson<StoredAdminAlbum[]>(albumsFile, []);
}

export async function createAdminAlbum(values: AdminAlbumValues) {
  const albums = await getAdminAlbums();
  const album: StoredAdminAlbum = {
    ...values,
    imageUrls: values.imageUrls.length ? values.imageUrls : [values.coverImageUrl],
    id: createId("album"),
    slug: `${slugify(values.title)}-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  await writeJson(albumsFile, [album, ...albums]);
  return album;
}

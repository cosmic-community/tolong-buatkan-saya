// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image structure returned by Cosmic file metafields
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Dialog item within a scene
export interface DialogLine {
  karakter?: string;
  teks?: string;
  [key: string]: unknown;
}

// Character object type
export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    nama?: string;
    peran?: string;
    kepribadian?: string;
    ilustrasi?: CosmicImage;
    warna?: string;
  };
}

// Scene object type
export interface Scene extends CosmicObject {
  type: 'scenes';
  metadata: {
    judul?: string;
    nomor_urut?: number;
    lokasi?: string;
    narasi?: string;
    dialog?: string;
    karakter?: Character[];
    ilustrasi_adegan?: CosmicImage;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isCharacter(obj: CosmicObject): obj is Character {
  return obj.type === 'characters';
}

export function isScene(obj: CosmicObject): obj is Scene {
  return obj.type === 'scenes';
}
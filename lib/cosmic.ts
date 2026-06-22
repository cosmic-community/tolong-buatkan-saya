import { createBucketClient } from '@cosmicjs/sdk'
import type { Character, Scene } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Get all scenes sorted by sequence number
export async function getScenes(): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const scenes = response.objects as Scene[]

    return scenes.sort((a, b) => {
      const orderA = a.metadata?.nomor_urut ?? 0
      const orderB = b.metadata?.nomor_urut ?? 0
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch scenes')
  }
}

// Get a single scene by slug
export async function getScene(slug: string): Promise<Scene | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'scenes', slug })
      .depth(1)

    const scene = response.object as Scene

    if (!scene) {
      return null
    }

    return scene
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch scene')
  }
}

// Get all characters
export async function getCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch characters')
  }
}

// Get a single character by slug
export async function getCharacter(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .depth(1)

    const character = response.object as Character

    if (!character) {
      return null
    }

    return character
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch character')
  }
}
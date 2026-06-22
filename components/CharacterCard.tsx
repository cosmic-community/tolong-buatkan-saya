import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const nama = getMetafieldValue(character.metadata?.nama) || character.title
  const peran = getMetafieldValue(character.metadata?.peran)
  const warna = getMetafieldValue(character.metadata?.warna) || '#ff8fab'
  const image = character.metadata?.ilustrasi

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-panel hover:shadow-panel-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-ink/5">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={nama}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">👤</div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: warna }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-comic font-bold text-lg text-ink">{nama}</h3>
        {peran && (
          <span
            className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: warna }}
          >
            {peran}
          </span>
        )}
      </div>
    </Link>
  )
}
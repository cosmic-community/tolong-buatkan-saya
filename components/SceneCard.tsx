import Link from 'next/link'
import type { Scene } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SceneCardProps {
  scene: Scene
}

export default function SceneCard({ scene }: SceneCardProps) {
  const judul = getMetafieldValue(scene.metadata?.judul) || scene.title
  const lokasi = getMetafieldValue(scene.metadata?.lokasi)
  const narasi = getMetafieldValue(scene.metadata?.narasi)
  const nomor = scene.metadata?.nomor_urut
  const image = scene.metadata?.ilustrasi_adegan

  return (
    <Link
      href={`/scenes/${scene.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-panel hover:shadow-panel-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={judul}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📖</div>
        )}
        {typeof nomor === 'number' && (
          <span className="absolute top-3 left-3 bg-ink text-cream text-xs font-bold px-3 py-1 rounded-full">
            Adegan {nomor}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-comic font-bold text-lg text-ink group-hover:text-rose-soft transition-colors">
          {judul}
        </h3>
        {lokasi && (
          <p className="text-ink/50 text-sm mt-1 flex items-center gap-1">
            <span>📍</span> {lokasi}
          </p>
        )}
        {narasi && (
          <p className="text-ink/70 text-sm mt-3 line-clamp-2">{narasi}</p>
        )}
      </div>
    </Link>
  )
}
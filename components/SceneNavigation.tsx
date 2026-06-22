import Link from 'next/link'
import type { Scene } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SceneNavigationProps {
  prev: Scene | null
  next: Scene | null
}

export default function SceneNavigation({ prev, next }: SceneNavigationProps) {
  return (
    <div className="flex items-stretch justify-between gap-4 mt-10">
      {prev ? (
        <Link
          href={`/scenes/${prev.slug}`}
          className="flex-1 group bg-white rounded-xl p-4 shadow-panel hover:shadow-panel-lg transition-all hover:-translate-y-0.5"
        >
          <span className="text-xs text-ink/50 flex items-center gap-1">
            <span>←</span> Sebelumnya
          </span>
          <p className="font-comic font-bold text-ink mt-1 group-hover:text-rose-soft transition-colors line-clamp-1">
            {getMetafieldValue(prev.metadata?.judul) || prev.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/scenes/${next.slug}`}
          className="flex-1 group bg-white rounded-xl p-4 shadow-panel hover:shadow-panel-lg transition-all hover:-translate-y-0.5 text-right"
        >
          <span className="text-xs text-ink/50 flex items-center justify-end gap-1">
            Selanjutnya <span>→</span>
          </span>
          <p className="font-comic font-bold text-ink mt-1 group-hover:text-sky-soft transition-colors line-clamp-1">
            {getMetafieldValue(next.metadata?.judul) || next.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
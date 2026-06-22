// app/scenes/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getScene, getScenes, getMetafieldValue } from '@/lib/cosmic'
import SceneNavigation from '@/components/SceneNavigation'
import type { Scene, Character } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const scene = await getScene(slug)

  if (!scene) {
    return { title: 'Adegan Tidak Ditemukan' }
  }

  const judul = getMetafieldValue(scene.metadata?.judul) || scene.title
  return {
    title: `${judul} | Komik Persahabatan`,
    description: getMetafieldValue(scene.metadata?.narasi),
  }
}

export default async function ScenePage({ params }: PageProps) {
  const { slug } = await params
  const scene = await getScene(slug)

  if (!scene) {
    notFound()
  }

  const allScenes = await getScenes()
  const currentIndex = allScenes.findIndex((s) => s.id === scene.id)
  const prev: Scene | null = currentIndex > 0 ? allScenes[currentIndex - 1] ?? null : null
  const next: Scene | null =
    currentIndex >= 0 && currentIndex < allScenes.length - 1
      ? allScenes[currentIndex + 1] ?? null
      : null

  const judul = getMetafieldValue(scene.metadata?.judul) || scene.title
  const lokasi = getMetafieldValue(scene.metadata?.lokasi)
  const narasi = getMetafieldValue(scene.metadata?.narasi)
  const dialog = getMetafieldValue(scene.metadata?.dialog)
  const nomor = scene.metadata?.nomor_urut
  const image = scene.metadata?.ilustrasi_adegan
  const karakter: Character[] = Array.isArray(scene.metadata?.karakter)
    ? scene.metadata.karakter
    : []

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/scenes" className="text-sm text-ink/50 hover:text-rose-soft transition-colors">
        ← Kembali ke semua adegan
      </Link>

      <header className="mt-6 text-center">
        {typeof nomor === 'number' && (
          <span className="inline-block bg-ink text-cream text-xs font-bold px-4 py-1.5 rounded-full">
            Adegan {nomor}
          </span>
        )}
        <h1 className="font-comic font-bold text-3xl sm:text-4xl text-ink mt-4 text-balance">
          {judul}
        </h1>
        {lokasi && (
          <p className="text-ink/50 mt-2 flex items-center justify-center gap-1">
            <span>📍</span> {lokasi}
          </p>
        )}
      </header>

      {image && (
        <div className="mt-8 rounded-2xl overflow-hidden shadow-panel-lg">
          <img
            src={`${image.imgix_url}?w=1400&h=900&fit=crop&auto=format,compress`}
            alt={judul}
            width={700}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {narasi && (
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-panel">
          <p className="text-ink/80 leading-relaxed text-lg italic">{narasi}</p>
        </div>
      )}

      {dialog && (
        <div className="mt-6 bg-sun-soft/15 rounded-2xl p-6 sm:p-8 border border-sun-soft/30">
          <h2 className="font-comic font-bold text-ink mb-3 flex items-center gap-2">
            <span>💬</span> Dialog
          </h2>
          <div className="text-ink/80 leading-relaxed whitespace-pre-line">{dialog}</div>
        </div>
      )}

      {karakter.length > 0 && (
        <div className="mt-8">
          <h2 className="font-comic font-bold text-ink mb-4 flex items-center gap-2">
            <span>👥</span> Karakter di adegan ini
          </h2>
          <div className="flex flex-wrap gap-3">
            {karakter.map((char) => {
              const nama = getMetafieldValue(char.metadata?.nama) || char.title
              const warna = getMetafieldValue(char.metadata?.warna) || '#ff8fab'
              const avatar = char.metadata?.ilustrasi
              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.slug}`}
                  className="flex items-center gap-2 bg-white rounded-full pl-1 pr-4 py-1 shadow-panel hover:shadow-panel-lg transition-all"
                >
                  {avatar ? (
                    <img
                      src={`${avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={nama}
                      width={40}
                      height={40}
                      className="w-9 h-9 rounded-full object-cover"
                      style={{ border: `2px solid ${warna}` }}
                    />
                  ) : (
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: warna }}
                    >
                      👤
                    </span>
                  )}
                  <span className="font-medium text-ink text-sm">{nama}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <SceneNavigation prev={prev} next={next} />
    </article>
  )
}
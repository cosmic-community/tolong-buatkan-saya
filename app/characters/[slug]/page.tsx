// app/characters/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCharacter, getMetafieldValue } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const character = await getCharacter(slug)

  if (!character) {
    return { title: 'Karakter Tidak Ditemukan' }
  }

  const nama = getMetafieldValue(character.metadata?.nama) || character.title
  return {
    title: `${nama} | Komik Persahabatan`,
    description: getMetafieldValue(character.metadata?.kepribadian),
  }
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params
  const character = await getCharacter(slug)

  if (!character) {
    notFound()
  }

  const nama = getMetafieldValue(character.metadata?.nama) || character.title
  const peran = getMetafieldValue(character.metadata?.peran)
  const kepribadian = getMetafieldValue(character.metadata?.kepribadian)
  const warna = getMetafieldValue(character.metadata?.warna) || '#ff8fab'
  const image = character.metadata?.ilustrasi

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/characters"
        className="text-sm text-ink/50 hover:text-rose-soft transition-colors"
      >
        ← Kembali ke semua karakter
      </Link>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-8 items-start">
        <div className="sm:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-panel-lg bg-white">
            {image ? (
              <img
                src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={nama}
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center text-6xl bg-ink/5">
                👤
              </div>
            )}
            <div className="h-2" style={{ backgroundColor: warna }} />
          </div>
        </div>

        <div className="sm:col-span-3">
          <h1 className="font-comic font-bold text-4xl text-ink">{nama}</h1>
          {peran && (
            <span
              className="inline-block mt-3 text-sm font-semibold px-4 py-1.5 rounded-full text-white"
              style={{ backgroundColor: warna }}
            >
              {peran}
            </span>
          )}

          {kepribadian && (
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-panel">
              <h2 className="font-comic font-bold text-ink mb-2 flex items-center gap-2">
                <span>✨</span> Kepribadian
              </h2>
              <p className="text-ink/80 leading-relaxed whitespace-pre-line">{kepribadian}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
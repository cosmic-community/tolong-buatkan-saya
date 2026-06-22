import Link from 'next/link'
import { getScenes, getCharacters, getMetafieldValue } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'
import CharacterCard from '@/components/CharacterCard'

export default async function HomePage() {
  const [scenes, characters] = await Promise.all([getScenes(), getCharacters()])

  const featuredScenes = scenes.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-soft/20 via-cream to-sky-soft/20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block text-5xl sm:text-6xl mb-6">📖✨</span>
          <h1 className="font-comic font-bold text-4xl sm:text-5xl lg:text-6xl text-ink text-balance">
            Komik Persahabatan
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-2xl mx-auto text-balance">
            Sebuah cerita hangat tentang persahabatan seorang cowok dan dua cewek.
            Ikuti perjalanan mereka adegan demi adegan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scenes"
              className="px-6 py-3 rounded-full bg-ink text-cream font-comic font-bold hover:bg-ink-light transition-colors shadow-panel"
            >
              Mulai Baca →
            </Link>
            <Link
              href="/characters"
              className="px-6 py-3 rounded-full bg-white text-ink font-comic font-bold hover:bg-rose-soft/15 transition-colors shadow-panel"
            >
              Kenali Karakter
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Scenes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-comic font-bold text-2xl sm:text-3xl text-ink">
              Adegan Terbaru
            </h2>
            <p className="text-ink/60 mt-1">Mulai dari awal cerita</p>
          </div>
          <Link
            href="/scenes"
            className="text-sm font-semibold text-rose-soft hover:underline whitespace-nowrap"
          >
            Lihat semua →
          </Link>
        </div>

        {featuredScenes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50 text-center py-12">Belum ada adegan tersedia.</p>
        )}
      </section>

      {/* Characters */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-comic font-bold text-2xl sm:text-3xl text-ink">
              Para Karakter
            </h2>
            <p className="text-ink/60 mt-1">Tiga sahabat dalam cerita ini</p>
          </div>
          <Link
            href="/characters"
            className="text-sm font-semibold text-sky-soft hover:underline whitespace-nowrap"
          >
            Lihat semua →
          </Link>
        </div>

        {characters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50 text-center py-12">Belum ada karakter tersedia.</p>
        )}
      </section>
    </div>
  )
}
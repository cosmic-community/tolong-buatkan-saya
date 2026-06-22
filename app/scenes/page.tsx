import { getScenes } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'

export const metadata = {
  title: 'Semua Adegan | Komik Persahabatan',
  description: 'Baca semua adegan dari komik persahabatan ini secara berurutan.',
}

export default async function ScenesPage() {
  const scenes = await getScenes()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-4xl">📖</span>
        <h1 className="font-comic font-bold text-3xl sm:text-4xl text-ink mt-3">
          Semua Adegan
        </h1>
        <p className="text-ink/60 mt-2">Ikuti cerita dari awal hingga akhir</p>
      </div>

      {scenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      ) : (
        <p className="text-ink/50 text-center py-16">Belum ada adegan tersedia.</p>
      )}
    </div>
  )
}
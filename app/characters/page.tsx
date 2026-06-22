import { getCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export const metadata = {
  title: 'Karakter | Komik Persahabatan',
  description: 'Kenali para karakter dalam komik persahabatan ini.',
}

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-4xl">👥</span>
        <h1 className="font-comic font-bold text-3xl sm:text-4xl text-ink mt-3">
          Para Karakter
        </h1>
        <p className="text-ink/60 mt-2">Kenali sahabat-sahabat dalam cerita ini</p>
      </div>

      {characters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <p className="text-ink/50 text-center py-16">Belum ada karakter tersedia.</p>
      )}
    </div>
  )
}
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📖</span>
            <span className="font-comic font-bold text-lg sm:text-xl text-ink group-hover:text-rose-soft transition-colors">
              Komik Persahabatan
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/scenes"
              className="px-3 py-2 rounded-full text-sm font-medium text-ink hover:bg-rose-soft/15 transition-colors"
            >
              Adegan
            </Link>
            <Link
              href="/characters"
              className="px-3 py-2 rounded-full text-sm font-medium text-ink hover:bg-sky-soft/20 transition-colors"
            >
              Karakter
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
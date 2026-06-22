export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="font-comic text-ink/70 text-sm">
          📖 Komik Persahabatan &middot; Sebuah cerita tentang persahabatan
        </p>
        <p className="text-ink/40 text-xs mt-2">&copy; {year} Komik Persahabatan</p>
      </div>
    </footer>
  )
}
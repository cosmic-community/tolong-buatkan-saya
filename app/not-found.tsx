import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl">🔍</div>
        <h1 className="font-comic font-bold text-3xl text-ink mt-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-ink/60 mt-2">Maaf, halaman yang kamu cari tidak ada.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-ink text-cream font-comic font-bold hover:bg-ink-light transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
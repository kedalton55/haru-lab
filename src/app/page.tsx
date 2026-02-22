import Link from 'next/link'
import { GiSpinningBlades } from "react-icons/gi";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-pink-600 to-pink-700">
      <main className="flex flex-col items-center gap-6 text-center px-8">
        <GiSpinningBlades className='animate-spin size-12' />
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">하루랩</h1>
        <p className="text-pink-200">Learn Korean, one day at a time.</p>

        <div className="flex gap-3 mt-4">
          <Link
            href="/login"
            className="rounded bg-pink-500 px-6 py-2 text-sm font-medium text-white hover:bg-pink-400"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded border border-pink-500 px-6 py-2 text-sm font-medium text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-700 dark:text-pink-100 dark:border-pink-100"
          >
            Create account
          </Link>
        </div>
      </main>
    </div>
  )
}

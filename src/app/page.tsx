'use client'

import Image from "next/image";
import HangulSoundChoiceModule from "@/app/components/HangulModule";
import { createClient } from '@supabase/supabase-js'

export default function Home() {
  const handleTest = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anon) {
      console.error('Missing env vars', { url: !!url, anon: !!anon })
      alert('Missing env vars — check .env.local and restart dev server')
      return
    }

    const supabase = createClient(url, anon)

    const { data, error } = await supabase.auth.getSession()

    console.log('getSession data:', data)
    console.log('getSession error:', error)

    alert(error ? `Error: ${error.message}` : '✅ Supabase connected (see console)')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-pink-600">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-purple-800 sm:items-start">
         {/* Supabase test button */}
          <button
            className="bg-pink-500 p-3 rounded-sm text-white mb-8"
            onClick={handleTest}
          >
            Run Supabase test
          </button>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <HangulSoundChoiceModule />

        

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
      </main>
    </div>
  );
}

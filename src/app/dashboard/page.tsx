'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import HangulSoundChoiceModule from '@/app/components/HangulModule'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/login')
        return
      }
      setUser(data.session.user)
      setLoading(false)
    })
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-pink-600">
        <p className="text-zinc-400">Loading…</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-pink-600 px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">하루랩</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-200">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded border border-zinc-300 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:border-zinc-500 dark:text-zinc-200 dark:hover:bg-purple-700"
          >
            Sign out
          </button>
        </div>

        <HangulSoundChoiceModule />
      </div>
    </div>
  )
}

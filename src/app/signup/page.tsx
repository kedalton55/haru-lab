'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-pink-600">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-purple-800 text-center">
          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">Check your email</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/login" className="mt-6 inline-block text-sm font-medium text-pink-500 hover:underline">
            Back to log in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-pink-600">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-purple-800">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">Create account</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-pink-500 dark:border-zinc-600 dark:bg-purple-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-pink-500 dark:border-zinc-600 dark:bg-purple-700 dark:text-white"
              placeholder="••••••••"
            />
            <p className="text-xs text-zinc-400 dark:text-zinc-400">Minimum 6 characters</p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-pink-500 py-2 text-sm font-medium text-white hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-pink-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

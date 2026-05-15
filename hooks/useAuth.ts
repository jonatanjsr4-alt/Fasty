'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'customer' | 'business' | 'admin' | 'delivery' | null

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function fetchRole(userId: string): Promise<UserRole> {
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).single()
    return (data?.role as UserRole) ?? 'customer'
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) setRole(await fetchRole(u.id))
      setLoading(false)
      if (!u && redirectIfUnauthenticated) router.push('/auth')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) setRole(await fetchRole(u.id))
      else { setRole(null); if (redirectIfUnauthenticated) router.push('/auth') }
    })
    return () => subscription.unsubscribe()
  }, [router, redirectIfUnauthenticated])

  async function logout() { await supabase.auth.signOut(); router.push('/auth') }
  return { user, role, loading, logout }
}

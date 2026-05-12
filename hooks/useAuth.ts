'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export type UserRole = 'customer' | 'business' | 'admin' | null

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function fetchRole(userId: string): Promise<UserRole> {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    return (data?.role as UserRole) ?? 'customer'
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const userRole = await fetchRole(currentUser.id)
        setRole(userRole)
      }

      setLoading(false)

      if (!currentUser && redirectIfUnauthenticated) {
        router.push('/auth')
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          const userRole = await fetchRole(currentUser.id)
          setRole(userRole)
        } else {
          setRole(null)
          if (redirectIfUnauthenticated) router.push('/auth')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, redirectIfUnauthenticated])

  async function logout() {
    await supabase.auth.signOut()

document.cookie =
  'fasty-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

document.cookie =
  'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/auth')
  }

  return { user, role, loading, logout }
}
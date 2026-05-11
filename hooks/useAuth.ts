'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(false)

      if (!currentUser && redirectIfUnauthenticated) {
        router.push('/auth')
      }
    })

    // Escuchar cambios de sesión en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (!currentUser && redirectIfUnauthenticated) {
          router.push('/auth')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, redirectIfUnauthenticated])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return { user, loading, logout }
}
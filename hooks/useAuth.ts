'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export type UserRole =
  | 'customer'
  | 'business'
  | 'admin'
  | null

export function useAuth(
  redirectIfUnauthenticated = true
) {

  const [user, setUser] =
    useState<User | null>(null)

  const [role, setRole] =
    useState<UserRole>(null)

  const [loading, setLoading] =
    useState(true)

  const router = useRouter()

  // ====================================
  // OBTENER ROL
  // ====================================

  async function fetchRole(
    userId: string
  ): Promise<UserRole> {

    const { data } =
      await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    return (
      (data?.role as UserRole)
      ?? 'customer'
    )

  }

  // ====================================
  // SESSION
  // ====================================

  useEffect(() => {

    let mounted = true

    async function loadSession() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession()

      const currentUser =
        session?.user ?? null

      if (!mounted) return

      setUser(currentUser)

      if (currentUser) {

        const userRole =
          await fetchRole(
            currentUser.id
          )

        if (!mounted) return

        setRole(userRole)

      } else {

        setRole(null)

        if (
          redirectIfUnauthenticated
        ) {

          router.push('/auth')

        }

      }

      setLoading(false)

    }

    loadSession()

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        async (_event, session) => {

          const currentUser =
            session?.user ?? null

          setUser(currentUser)

          if (currentUser) {

            const userRole =
              await fetchRole(
                currentUser.id
              )

            setRole(userRole)

          } else {

            setRole(null)

            if (
              redirectIfUnauthenticated
            ) {

              router.push('/auth')

            }

          }

        }
      )

    return () => {

      mounted = false

      subscription.unsubscribe()

    }

  }, [
    router,
    redirectIfUnauthenticated,
  ])

  // ====================================
  // LOGOUT
  // ====================================

  async function logout() {

    try {

      await supabase.auth.signOut()

      // limpiar localStorage
      localStorage.clear()

      // limpiar sessionStorage
      sessionStorage.clear()

      // limpiar cookies
      document.cookie.split(';').forEach(
        (cookie) => {

          const eqPos =
            cookie.indexOf('=')

          const name =
            eqPos > -1
              ? cookie.substr(
                  0,
                  eqPos
                )
              : cookie

          document.cookie =
            name +
            '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'

        }
      )

      setUser(null)

      setRole(null)

      window.location.href =
        '/auth'

    } catch (error) {

      console.error(
        'Logout error:',
        error
      )

    }

  }

  return {
    user,
    role,
    loading,
    logout,
  }

}
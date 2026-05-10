'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import AdminOrders from '@/components/AdminOrders'

export default function AdminPage() {

  const router = useRouter()

  useEffect(() => {

    const isAdmin =
      localStorage.getItem('fasty-admin')

    if (!isAdmin) {
      router.push('/login')
    }

  }, [])

  return <AdminOrders />
}
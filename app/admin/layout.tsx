import type { Metadata } from 'next'
import AdminNavbar from '@/components/AdminNavbar'

export const metadata: Metadata = {
  title: 'MK Baking - Admin Dashboard',
  description: 'Manage expenses, orders, and other aspects of home baking',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )
}

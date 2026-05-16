import type { Metadata } from 'next'
import './globals.css'
import PublicNavbar from '@/components/PublicNavbar'

export const metadata: Metadata = {
  title: 'MK Baking - Fresh Homemade Cakes',
  description: 'Order delicious homemade cakes baked with love and care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PublicNavbar />
        {children}
      </body>
    </html>
  )
}
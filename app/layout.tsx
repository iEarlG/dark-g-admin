import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import { ModalProvider } from '@/providers/ModalProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DARK G ADMIN DASHBOARD',
  description: 'DARK G ADMIN DASHBOARD - A dashboard for DARK G ADMIN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

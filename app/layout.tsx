import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';

import { ModalProvider } from '@/providers/ModalProvider';
import { ToastProvider } from '@/providers/ToastProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: 'Dark G Admin Dashboard',
  description: 'Dark G Admin Dashboard - A dashboard for Dark G Store.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

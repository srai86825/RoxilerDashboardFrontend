import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Roxiler Dashboard',
  description: 'Roxiler is a leading software services company having a proven track record of helping startups, SMEs, and Enterprises with our outstanding product building.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

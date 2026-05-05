import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pedro Lucas Aguiar | Portifólio',
  description: 'Desenvolvedor de software em Salvador, BA. Transformo processos complexos em sistemas que funcionam. Especialista em Python, Django, Next.js, React e automação.',
  keywords: ['desenvolvedor', 'software', 'python', 'django', 'next.js', 'react', 'salvador', 'bahia', 'brasil'],
  authors: [{ name: 'Pedro Lucas Aguiar' }],
  creator: 'Pedro Lucas Aguiar',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://pedrolucasaguiar.dev',
    title: 'Pedro Lucas Aguiar | Portifólio',
    description: 'Desenvolvedor de software em Salvador, BA. Transformo processos complexos em sistemas que funcionam.',
    siteName: 'Pedro Lucas Aguiar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pedro Lucas Aguiar | Portifólio',
    description: 'Desenvolvedor de software em Salvador, BA. Transformo processos complexos em sistemas que funcionam.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Sudip Sen | Data Architect - Modern Data Platforms',
  description: 'Data & Analytics Architect with 14+ years delivering modern data platforms and enterprise data products across MedTech, Consumer, Supply Chain, Insurance, and Banking.',
  keywords: ['Data Architect', 'Solution Architect', 'Modern Data Platform', 'AWS', 'Azure', 'Data Engineering'],
  authors: [{ name: 'Sudip Sen' }],
  openGraph: {
    title: 'Sudip Sen | Data Architect - Modern Data Platforms',
    description: 'Data & Analytics Architect with 14+ years delivering modern data platforms and enterprise data products.',
    images: ['/og-image.png'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

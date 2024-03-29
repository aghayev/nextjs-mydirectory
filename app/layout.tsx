import type { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'
import { Providers } from './GlobalRedux/provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <div
          className={styles.header}
        >My wellbeing directory</div>
        <div>
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}

// 'use client'
import './globals.css'

export const metadata = {
  title: 'Teen Titans App',
  description: 'A Next.js application with authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 
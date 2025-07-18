import './globals.css'
// import ClientAuthRedirect from '@/components/ClientAuthRedirect';

export const metadata = {
  title: 'Teen Titans App',
  description: 'A Next.js application with authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <ClientAuthRedirect /> */}
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

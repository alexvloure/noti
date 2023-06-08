import NavBar from '@/components/NavBar';
import ProvidersWrapper from './ProvidersWrapper';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NOTI',
  description: 'your meeting notes simplified.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
        />
      </head>
      <body className={inter.className}>
        <ProvidersWrapper attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}

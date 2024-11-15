
import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/ui/styles/globals.css';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

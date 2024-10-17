import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Afacad } from 'next/font/google';
import "./globals.css";

const zainFont = localFont({
  src: [
    {
      path: './fonts/Zain-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Zain-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-zain',
  display: 'swap',
});

const afacad = Afacad({
  subsets: ['latin'],
  variable: '--font-afacad',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Growvy",
  description: "Business learning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${zainFont.variable} ${afacad.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

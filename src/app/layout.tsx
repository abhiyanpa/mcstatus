import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mc-status.abhiyanpa.in'),
  title: {
    default: 'Minecraft Server Status Checker | Check Java & Bedrock Servers',
    template: '%s | MC Status by Abhiyan P A'
  },
  description: 'Free Minecraft server status checker for Java and Bedrock editions. Check server status, player count, ping, version, and MOTD in real-time. Created by Abhiyan P A.',
  keywords: [
    'minecraft server status',
    'minecraft server checker',
    'minecraft server status checker',
    'minecraft java server status',
    'minecraft bedrock server status',
    'check minecraft server',
    'minecraft status checker',
    'minecraft server finder',
    'server status minecraft',
    'mc status'
  ],
  authors: [{ name: 'Abhiyan P A', url: 'https://abhiyanpa.in' }],
  creator: 'Abhiyan P A',
  publisher: 'Abhiyan P A',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Minecraft Server Status Checker',
    description: 'Check any Minecraft server status instantly. Support for both Java and Bedrock editions. Created by Abhiyan P A.',
    url: 'https://mc-status.abhiyanpa.in',
    siteName: 'MC Status',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Minecraft Server Status Checker',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft Server Status Checker',
    description: 'Check any Minecraft server status instantly. Support for both Java and Bedrock editions.',
    images: ['/og-image.png'],
    creator: '@abhiyanpa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mc-status.abhiyanpa.in" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
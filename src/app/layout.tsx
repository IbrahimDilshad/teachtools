import type { Metadata, Viewport } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import InstallPWA from '@/components/install-pwa';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

const APP_NAME = "TeachTools";
const APP_DESCRIPTION = "TeachTools empowers modern educators with powerful tools to manage schedules, track student progress, handle payments, and use AI to streamline their teaching. Start for free!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: 'TeachTools - The All-in-One Toolkit for Modern Educators',
    template: '%s | TeachTools',
  },
  description: APP_DESCRIPTION,
  keywords: ['tutor software', 'teaching tools', 'class management', 'student progress tracking', 'online teaching platform', 'educator tools', 'AI for teachers'],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'TeachTools - The All-in-One Toolkit for Modern Educators',
    description: APP_DESCRIPTION,
    url: 'https://teachtools.example.com', // Replace with your actual domain
    siteName: 'TeachTools',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with your OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeachTools - The All-in-One Toolkit for Modern Educators',
    description: APP_DESCRIPTION,
    images: ['https://placehold.co/1200x630.png'], // Replace with your Twitter image
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', ptSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <InstallPWA />
        </ThemeProvider>
      </body>
    </html>
  );
}

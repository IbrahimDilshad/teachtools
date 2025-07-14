import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'TeachTools - The All-in-One Toolkit for Modern Educators',
    template: '%s | TeachTools',
  },
  description:
    'TeachTools empowers modern educators with powerful tools to manage schedules, track student progress, handle payments, and use AI to streamline their teaching. Start for free!',
  keywords: ['tutor software', 'teaching tools', 'class management', 'student progress tracking', 'online teaching platform', 'educator tools', 'AI for teachers'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'TeachTools - The All-in-One Toolkit for Modern Educators',
    description: 'Streamline your teaching, track progress, and manage payments with ease.',
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
    description: 'The ultimate toolkit for tutors and educators. Manage schedules, students, and payments effortlessly.',
    images: ['https://placehold.co/1200x630.png'], // Replace with your Twitter image
  },
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
        </ThemeProvider>
      </body>
    </html>
  );
}

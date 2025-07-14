import Link from 'next/link';
import { GraduationCap, ArrowRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

const features = [
  {
    icon: '📅',
    title: 'Class Schedule Manager',
    description: 'Organize your tutoring sessions with a weekly calendar view and automated reminders.',
  },
  {
    icon: '📊',
    title: 'Student Progress Tracker',
    description: 'Log lessons, track homework, and export detailed progress reports for your students.',
  },
  {
    icon: '💰',
    title: 'Income & Payment Log',
    description: 'Effortlessly track earnings, manage payments, and generate monthly income summaries.',
  },
  {
    icon: '📚',
    title: 'Resource Library',
    description: 'Upload, tag, and manage all your learning materials in one centralized location.',
  },
  {
    icon: '🤖',
    title: 'Smart Reminders',
    description: 'AI-powered reminders for classes, payments, and attendance to keep everyone on track.',
  },
  {
    icon: '🔗',
    title: 'Shareable Profile',
    description: 'A professional, shareable profile link with a "Book Me" call-to-action.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-headline">TeachTools</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex flex-col items-center justify-center gap-6">
                         <SheetClose asChild>
                             <Link href="/login" className="text-lg font-medium">Log In</Link>
                         </SheetClose>
                         <SheetClose asChild>
                            <Button asChild className="w-full">
                                <Link href="/login">Get Started Free</Link>
                            </Button>
                         </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32">
          <div className="bg-primary/10 text-primary font-semibold rounded-full px-4 py-1 inline-block mb-4">
            Your All-in-One Teaching Toolkit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight">
            Streamline Your Teaching,
            <br className="hidden sm:inline" />
            <span className="text-primary"> Amplify Your Impact.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            TeachTools empowers modern educators with powerful tools to manage schedules, track student progress, handle payments, and more. Focus on what you do best: teaching.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                Start Your Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <div className="mt-16 sm:mt-24 relative">
             <div className="absolute top-0 -left-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative shadow-2xl rounded-xl">
              <Image 
                src="https://placehold.co/1200x675.png"
                width={1200}
                height={675}
                alt="TeachTools Dashboard Preview"
                data-ai-hint="dashboard computer"
                className="rounded-lg border-4 border-background"
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted/50 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline">Everything You Need to Succeed</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                All the features you need to run your teaching business efficiently, in one simple and intuitive platform.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} TeachTools. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <span className="font-bold font-headline text-muted-foreground">TeachTools</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

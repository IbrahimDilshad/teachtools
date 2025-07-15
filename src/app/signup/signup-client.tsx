
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SignupForm = dynamic(() => import('@/components/signup-form'), {
    ssr: false,
    loading: () => (
       <div className="grid gap-4">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    )
})

export default function SignupClient() {
    return <SignupForm />;
}

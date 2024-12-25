'use client';

import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/h1';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10 px-5 py-10 md:py-16 lg:py-20">
      <H1 className="text-center text-3xl md:text-4xl lg:text-5xl">
        PetCare Access Required Payment
      </H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true); // Send the request from client to server to update the JWT token
            router.push('/app/dashboard');
          }}
          disabled={status === 'loading' || session?.user?.hasAccess}
          className="w-full max-w-md"
        >
          Access PetCare
        </Button>
      )}

      {!searchParams.success && (
        <Button
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
          disabled={isPending}
          className="w-full max-w-md"
        >
          Buy Lifetime Access for ₹599
        </Button>
      )}

      {searchParams.success && (
        <p className="text-sm text-center text-green-700">
          Payment successful! You now have lifetime access to PetCare.
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-sm text-center text-red-700">
          Payment cancelled! You can try again.
        </p>
      )}
    </main>
  );
}

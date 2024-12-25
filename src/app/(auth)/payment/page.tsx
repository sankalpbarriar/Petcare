'use client'
import { createCheckoutSession } from '@/actions/actions'
import H1 from '@/components/h1'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Page({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [isPending, startTransition] = useTransition();
  const { data:session,update, status } = useSession();
  const router = useRouter();

  return (
    <main className='flex flex-col items-center space-y-10'>
      <H1>PetCare access required payment</H1>

      {searchParams.success && (
        <Button onClick={async () => {
          await update(true);  //this will send the request from client to server to update the JWT token
          router.push('/app/dashboard')
        }}
          disabled={status === 'loading' || session?.user.hasAccess}
        >
          Access PetCare
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            })
          }}
        >
          Buy lifetime access for ₹599
        </Button>
      )}
      {
        searchParams.success && (
          <p className='text-sm text-green-700'>
            Payment successful.. you now have lifetime access to Petcare.
          </p>
        )}
      {
        searchParams.cancelled && (
          <p className='text-sm text-red-700'>
            Payment cancelled! You can try again.
          </p>
        )}
    </main>
  );
}

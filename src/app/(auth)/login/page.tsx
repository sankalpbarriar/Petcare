import AuthForm from '@/components/auth-form'
import H1 from '@/components/h1'
import Link from 'next/link'
export default function Page() {
  return <main>
    <H1 className='text-center mb-5'>Login</H1>

    <AuthForm type='logIn'/>
    <p className='mt-6 text-sm text-zinc-500'>
      No account yet ?{" "}
      <Link className="font-medium" href='/sign-up'>
        Sign-up
      </Link>
    </p>
  </main>
}
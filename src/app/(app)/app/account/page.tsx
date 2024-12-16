import ContentBlock from '@/components/content-block'
import H1 from '@/components/h1'
import SignOutBtn from '@/components/sign-out-btn'
import { authCheck } from '@/lib/server-utils'

const Page = async () => {
  const session = await authCheck();

  return (
    <main>
      <H1 className='my-8 text-white'>Your Account</H1>
      <ContentBlock className='h-[500px] flex flex-col gap-3 justify-center items-center'>
        <p>Logged in as {session.user.email}</p>
        <SignOutBtn/>
      </ContentBlock>
    </main>
  )
}

export default Page
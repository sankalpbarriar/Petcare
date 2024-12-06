import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background'
import { Toaster } from '@/components/ui/sonner'
import PetContextProvider from '@/contexts/pet-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import prisma from "@/lib/db"
import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

async function Layout({ children }: {
  children: React.ReactNode
}) {
  //this will fetch the data on the server side and send it to the client side (context provider) which in turn spread it around the app
  const session = await auth();
  if (!session?.user) {
    redirect('./login');
  }
  console.log(session)

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    }
  })   //fetching pets from DB

  return <>
    <BackgroundPattern />
    <div className=' flex flex-col max-w-[1050px] mx-auto px-4  min-h-screen'>
      <AppHeader />

      <SearchContextProvider>
        <PetContextProvider data={pets}>{children}</PetContextProvider>
      </SearchContextProvider>
      <Toaster position="top-right" />
      <AppFooter />
    </div>

  </>
}
export default Layout
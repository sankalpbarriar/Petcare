import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background'
import PetContextProvider from '@/contexts/pet-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import prisma from "@/lib/db"
import React from 'react'

async function Layout({ children }: {
  children: React.ReactNode
}) {
  //this will fetch the data on the server side and send it to the client side (context provider) which in turn spread it around the app
  const pets=await prisma.pet.findMany({})

  return <>
    <BackgroundPattern />
    <div className=' flex flex-col max-w-[1050px] mx-auto px-4  min-h-screen'>
      <AppHeader />

      <SearchContextProvider>
        <PetContextProvider data={pets}>{children}</PetContextProvider>
      </SearchContextProvider>
      
      <AppFooter />
    </div>

  </>
}
export default Layout
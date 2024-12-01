import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background'
import { Toaster } from '@/components/ui/sonner'
import PetContextProvider from '@/contexts/pet-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import prisma from "@/lib/db"
import React from 'react'

async function Layout({ children }: {
  children: React.ReactNode
}) {
  //this will fetch the data on the server side and send it to the client side (context provider) which in turn spread it around the app
  console.log("renedring layout...")
  const pets=await prisma.pet.findMany({})   //fetching pets from DB
  return <>
    <BackgroundPattern />
    <div className=' flex flex-col max-w-[1050px] mx-auto px-4  min-h-screen'>
      <AppHeader />

      <SearchContextProvider>
        <PetContextProvider data={pets}>{children}</PetContextProvider>
      </SearchContextProvider>
      <Toaster position= "top-right" />
      <AppFooter />
    </div>

  </>
}
export default Layout
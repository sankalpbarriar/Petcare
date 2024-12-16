import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background'
import { Toaster } from '@/components/ui/sonner'
import PetContextProvider from '@/contexts/pet-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import React from 'react'
import { authCheck, getPetsByUserId } from '@/lib/server-utils'

async function Layout({ children }: {
  children: React.ReactNode
}) {
  //this will fetch the data on the server side and send it to the client side (context provider) which in turn spread it around the app
  const session = await authCheck();   //it looks like it is happening in client side but actually server is sending it to the client we have to deduce a method to retrieve some information onto the client side only using useSession hook
  // console.log(session)

  const pets = await getPetsByUserId(session.user.id); //fetching pets from DB

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
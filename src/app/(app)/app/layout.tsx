import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background'
import PetContextProvider from '@/contexts/pet-context-provider'
import { Pet } from '@/lib/types'
import React from 'react'

async function Layout({ children }: {
    children: React.ReactNode
}) {
  //this will fetch the data on the server side and send it to the client side (context provider) which in turn spread it around the app
  const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets')
  if (!response.ok) {
    throw new Error('Could not fetch pets')
  }
  const data:Pet[] = await response.json();
  console.log(data)

    return <>
        <BackgroundPattern />
        <div className=' flex flex-col max-w-[1050px] mx-auto px-4  min-h-screen'>
            <AppHeader />
            <PetContextProvider data={data}>
            {children}
            </PetContextProvider>
            <AppFooter />
        </div>

    </>
}
export default Layout
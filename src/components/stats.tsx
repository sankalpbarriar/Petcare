'use client'
import { usePetContext } from "@/lib/hooks"

function Stats() {
  const {numberPets}=usePetContext();
  return (
    <section className='text-center'>
      <p className='text-2xl font-bold leading-6'>{numberPets}</p>
      <p className='opacity-80'>current guest</p>
    </section>
  )
}

export default Stats
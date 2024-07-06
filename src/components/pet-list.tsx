'use client'
import { usePetContext } from "@/lib/hooks"
import Image from "next/image"

function PetList() {
  const { pets } = usePetContext();
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {
        pets.map((pet) => (
          <li key={pet.id}>
            <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3
        hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition ">
              <Image
                src={pet.imageUrl}
                alt="pet image"
                width={45}
                height={45}
                className="rounded-full object-cover w-[45px] h-[45px]"
              />
              <p className="font-semibold">{pet.name}</p>
            </button>
          </li>
        ))
      }

    </ul>
  )
}

export default PetList
'use client'
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image"
import PetButton from "./pet-button";
import { deletePet } from "@/actions/actions";
import { useTransition } from "react";

function PetDetails() {

  const { selectedPet } = usePetContext();
  return (
    <section className=" flex flex-col h-full w-full">
      {
        !selectedPet ? (
          <EmptyView />
        ) : (
          <>
            <Topbar pet={selectedPet} />
            <OtherInfo pet={selectedPet} />
            <Notes pet={selectedPet} />
          </>
        )
      }
    </section>
  )
}

export default PetDetails

type Props = {
  pet: Pet;
}
function Topbar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet.imageUrl}
        alt="slected pet iamge"
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">edit</PetButton>
        <PetButton actionType="checkout"
          disabled={isPending}
          onClick={async () => await handleCheckoutPet(pet.id)}
        >checkout</PetButton>
      </div>
    </div>
  )
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">owner name</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  )
}

function Notes({ pet }: Props) {
  return (
    <section className="flex-1bg-white px-7 py-5 rounded-mdmb-9 mx-8 border border-light">
      {pet?.notes}
    </section>
  )
}

function EmptyView() {
  return <div className="h-full flex justify-center items-center">
    <p className="text-2xl font-medium">No items selected</p>
  </div>
}
'use client';

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import PetButton from "./pet-button";
import { Pet } from "@prisma/client";

function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <Topbar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

export default PetDetails;

type Props = {
  pet: Pet;
};

function Topbar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex flex-wrap items-center bg-white px-5 py-4 border-b border-light md:px-8 md:py-5">
      <Image
        src={pet.imageUrl}
        alt="selected pet image"
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-xl font-semibold leading-7 ml-5 md:text-3xl">{pet.name}</h2>
      <div className="ml-auto mt-4 md:mt-0 space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => await handleCheckoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex flex-wrap justify-around py-5 px-4 text-center md:py-10 md:px-5">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xs font-medium uppercase text-zinc-700 md:text-sm">Owner Name</h3>
        <p className="mt-1 text-base text-zinc-800 md:text-lg">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-xs font-medium uppercase text-zinc-700 md:text-sm">Age</h3>
        <p className="mt-1 text-base text-zinc-800 md:text-lg">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="flex-1 bg-white px-5 py-4 rounded-md mb-6 mx-4 border border-light md:px-7 md:py-5 md:mb-9 md:mx-8">
      <p className="text-base text-zinc-800 md:text-lg">{pet?.notes || "No notes available."}</p>
    </section>
  );
}

function EmptyView() {
  return (
    <div className="h-full flex justify-center items-center px-4 text-center">
      <p className="text-xl font-medium md:text-2xl">No items selected</p>
    </div>
  );
}

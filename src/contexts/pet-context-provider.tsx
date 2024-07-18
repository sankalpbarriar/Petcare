'use client'
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
    data: Pet[];
    children: React.ReactNode;
}

type TPetContext = {
    pets: Pet[];
    selectedPetId: string | null;
    selectedPet: Pet | undefined;
    numberPets: number;
    handleCheckoutPet:(id:string) => void;
    handleChangeSelectedPetId: (id: string) => void;  //fucntion that accepts id and dosent return anything
}

//creating context
export const PetContext = createContext<TPetContext | null>(null);

//yahan se state har jagah use hoga
export default function PetContextProvider({ data, children }: PetContextProviderProps) {
    const [pets, setPets] = useState(data);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    // derived state
    const selectedPet = pets.find((pet) => pet.id === selectedPetId)
    const numberPets = pets.length;

    //checkout per
    const handleCheckoutPet = (id: string) => {
        //remove from the array
        setPets((prev) => prev.filter(pet => pet.id !== id));
        setSelectedPetId(null);
    }

    //despite of sending only the sleter fucntion we will create a handle function abd then submut
    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id);
    }

    return <PetContext.Provider
        value={{
            pets,
            selectedPetId,
            numberPets,
            handleChangeSelectedPetId,
            handleCheckoutPet,
            selectedPet
        }}
    >
        {children}   {/* this is still a server componet */}
    </PetContext.Provider>
}
'use client'
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps={
    data:Pet[];
    children:React.ReactNode;
}

type TPetContext={
    pets:Pet[];
    selectedPetId:string | null
}

//creating context
export const PetContext = createContext<TPetContext | null >(null);

export default function PetContextProvider({ data,children }:PetContextProviderProps) {
    const [pets, setPets] = useState(data);
    const [selectedPetId, setSelectedPetId] = useState(null);

    return <PetContext.Provider
        value={{
            pets,
            selectedPetId,
        }}
    >
        {children}   {/* this is still a server componet */}
    </PetContext.Provider>
}
'use client'
import { addPet } from "@/actions/actions";
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
    handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
    handleEditPet: (petId: string, newPet: Omit<Pet, 'id'>) => void;
    handleCheckoutPet: (id: string) => void;
    handleChangeSelectedPetId: (id: string) => void;  //fucntion that accepts id and dosent return anything
}

//creating context
export const PetContext = createContext<TPetContext | null>(null);

//yahan se state har jagah use hoga
export default function PetContextProvider({ data: pets, children }: PetContextProviderProps) {
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    // derived state
    const selectedPet = pets.find((pet) => pet.id === selectedPetId)
    const numberPets = pets.length;

    //event handler add pet --> it recieves formadata excpet id and to the state
    const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
        // setPets(prev => [...prev, {
        //     ...newPet,
        //     id: Date.now().toString(),
        // }
        // ]);

        //mutating the data -> adding the pet to the backend
        await addPet(newPet);   //thoudh we are not creating any API end point there is still a network request

    }

    const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
        setPets((prev) =>
            prev.map((pet) => {
                if (pet.id === petId) {  //it will look for the pet data and if the id matches with the given one it will return the new pet data
                    return {
                        id: petId,
                        ...newPetData,
                    }
                }
                return pet;
            })
        )
    }

    //checkout pet
    const handleCheckoutPet = (id: string) => {
        //remove from the array
        setPets((prev) => prev.filter(pet => pet.id !== id));
        setSelectedPetId(null);
    }

    //despite of sending only the sleter fucntion we will create a handle function abd then submut
    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id);
    }

    //context provider
    return <PetContext.Provider
        value={{
            pets,
            selectedPetId,
            numberPets,
            handleChangeSelectedPetId,
            handleCheckoutPet,
            handleAddPet,
            handleEditPet,
            selectedPet
        }}
    >
        {children}   {/* this is still a server componet */}
    </PetContext.Provider>
}
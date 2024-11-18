'use client'
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
    data: Pet[];
    children: React.ReactNode;
}

type TPetContext = {
    pets: Pet[];
    selectedPetId: string | null;
    selectedPet: Pet | undefined;
    numberPets: number;
    handleAddPet: (newPet: Omit<Pet, 'id'>) => Promise<void>;
    handleEditPet: (petId: string, newPet: Omit<Pet, 'id'>) => Promise<void>;
    handleCheckoutPet: (id: string) => Promise<void>;
    handleChangeSelectedPetId: (id: string) => void;  //fucntion that accepts id and dosent return anything
}

//creating context
export const PetContext = createContext<TPetContext | null>(null);

//yahan se state har jagah use hoga
export default function PetContextProvider({ data, children }: PetContextProviderProps) {
    const [optimisticPet, setOptimisticPet] = useOptimistic(data,(state,newPet) =>{
        return [...state,{
            ...newPet,
            id:Math.random().toString(),
        }];
    }); //initalize with the data
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    // derived state
    const selectedPet = optimisticPet.find((pet) => pet.id === selectedPetId)
    const numberPets = optimisticPet.length;

    //event handler add pet --> it recieves formadata excpet id and to the state
    const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
        setOptimisticPet(newPet);
        const error = await addPet(newPet);
        if (error) {
            toast.warning(error.message);
            return;
        }
    }
    const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
        const error = await editPet(petId, newPetData);
        if (error) {
            toast.warning(error.message);
            return;
        }
    }

    //checkout pet
    const handleCheckoutPet = async(petId: string) => {
        //remove from the array  
        await deletePet(petId);
        setSelectedPetId(null);
    }

    //despite of sending only the sleter fucntion we will create a handle function abd then submut
    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id);
    }

    //context provider
    return <PetContext.Provider
        value={{
            pets:optimisticPet,
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
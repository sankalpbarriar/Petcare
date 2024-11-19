'use client'
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
    data: Pet[];
    children: React.ReactNode;
}

type TPetContext = {
    pets: Pet[];
    selectedPetId: Pet['id'] | null;
    selectedPet: Pet | undefined;
    numberPets: number;
    handleAddPet: (newPet:PetEssentials) => Promise<void>;
    handleEditPet: (petId: Pet['id'], newPet: PetEssentials) => Promise<void>;
    handleCheckoutPet: (id: Pet['id']) => Promise<void>;
    handleChangeSelectedPetId: (id: Pet['id']) => void;  //function that accepts id and dosent return anything
}

//creating context
export const PetContext = createContext<TPetContext | null>(null);

//yahan se state har jagah use hoga
export default function PetContextProvider({ data, children }: PetContextProviderProps) {
    const [optimisticPet, setOptimisticPet] = useOptimistic(
        data,
        (state, { action, payload }) => {
            switch (action) {
                case "add":
                    return [...state, { ...payload, id: Math.random().toString() }];
                case "edit":
                    return state.map((pet) => {
                        if (pet.id === payload.id) {
                            return { ...pet, ...payload.newPetData };
                        }
                        return pet;
                    });
                case "delete":
                    return state.filter((pet) => pet.id !== payload);
                default:
                    return state;
            }
        }); //initalize with the data
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    // derived state
    const selectedPet = optimisticPet.find((pet) => pet.id === selectedPetId)
    const numberPets = optimisticPet.length;

    //event handler add pet --> it recieves formadata excpet id and to the state
    const handleAddPet = async (newPet: PetEssentials) => {
        setOptimisticPet({ action: "add", payload: newPet });
        const error = await addPet(newPet);
        if (error) {
            toast.warning(error.message);
            return;
        }
    }
    const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials) => {
        setOptimisticPet({ action: "edit", payload: { id: petId, newPetData } });
        const error = await editPet(petId, newPetData);
        if (error) {
            toast.warning(error.message);
            return;
        }
    }

    //checkout pet
    const handleCheckoutPet = async (petId: Pet['id']) => {
        setOptimisticPet({ action: "delete", payload: petId });
        const error = await deletePet(petId);
        if (error) {
            toast.warning(error.message);
            return;
        }
        //remove from the array  
        await deletePet(petId);
        setSelectedPetId(null);
    }

    //despite of sending only the sleter fucntion we will create a handle function abd then submut
    const handleChangeSelectedPetId = (id: Pet['id']) => {
        setSelectedPetId(id);
    }

    //context provider
    return <PetContext.Provider
        value={{
            pets: optimisticPet,
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
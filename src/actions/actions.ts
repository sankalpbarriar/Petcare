"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      //creating new pet in the db
      data: pet,
    });
  } catch (error) {
    return {
      message: "couldn't add pets",
    };
  }
  revalidatePath("/app", "layout"); //we can instruct next js to re-render our layout
}

export async function editPet(petId, newPetData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "couldn't edit pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId){
  await sleep(3000);
  try {
    await prisma.pet.delete({
      where:{
        id:petId, 
      }
    });
  } catch (error) {
    return{
      message:"Couldn't delete Pet..",
    }
  }
  revalidatePath("/app", "layout");
}

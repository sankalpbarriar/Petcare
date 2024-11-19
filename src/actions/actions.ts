"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet: PetEssentials) {
  await sleep(1000);

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

export async function editPet(petId: Pet['id'], newPetData :PetEssentials) {
  await sleep(1000);
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

export async function deletePet(petId :Pet['id']) {
  await sleep(1000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Couldn't delete Pet..",
    };
  }
  revalidatePath("/app", "layout");
}

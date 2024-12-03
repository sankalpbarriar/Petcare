"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

//---------user actions---------------------

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  await signIn('credentials',authData);
}

export async  function logOut(){
  await signOut({redirectTo:'/'});
}
// ----pet actions --------------------------------

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet: unknown) {
  await sleep(1000);

  //if not properly validated we do not want to intereact with the database
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data..",
    };
  }

  try {
    await prisma.pet.create({
      //creating new pet in the db
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "couldn't add pets",
    };
  }
  revalidatePath("/app", "layout"); //we can instruct next js to re-render our layout
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data..",
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "couldn't edit pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data..",
    };
  }
  await sleep(1000);
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Couldn't delete Pet..",
    };
  }
  revalidatePath("/app", "layout");
}

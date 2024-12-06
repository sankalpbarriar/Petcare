"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation";

//---------user actions---------------------

export async function logIn(formData: FormData) {

  await signIn('credentials',formData);
}
export async function signUp(formData : FormData){
  const hashedPassword = await bcrypt.hash(formData.get("password") as string , 10);
  await prisma.user.create({
      data:{
        email : formData.get("email") as string,
        hashedPassword,
      },
  })
  await signIn('credentials',formData);

}

export async  function logOut(){
  await signOut({redirectTo:'/'});
}

// ----pet actions --------------------------------

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet: unknown) {
  await sleep(1000);
   
  const session = await auth();
  if (!session?.user) {
    redirect('./login');
  }
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
      data:{
        ...validatedPet.data,
        user:{
          connect:{
            id : session.user.id,
          }
        }
      }
    });
  } catch (error) {
    return {
      message: "couldn't add pet..",
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

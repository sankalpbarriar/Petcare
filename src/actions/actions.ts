"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(formData) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      //creating new pet in the db
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        age: parseInt(formData.get("age")),
        imageUrl:
          formData.get("imageUrl") ||
          "https://i.ibb.co/3hhthJS/dog-1650609.png",
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "couldn't add pets",
    };
  }
  revalidatePath("/app", "layout"); //we can instruct next js to re-render our layout
}

export async function editPet(petId, formData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        age: parseInt(formData.get("age")),
        imageUrl:
          formData.get("imageUrl") ||
          "https://i.ibb.co/3hhthJS/dog-1650609.png",
        notes: formData.get("notes"),
      },
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

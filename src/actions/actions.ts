"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { authCheck, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

//---------user actions---------------------

export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid Form Data",
    };
  }
  //check if the form data us of formData type
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. could not sign in..",
          };
        }
      }
    }

    throw error; //next js redirects throws error so we need to retuhrow it
  }
}
export async function signUp(prevState: unknown, formData: FormData) {
  await sleep(1000);

  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  try {
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists..",
        };
      }
    }
    return {
      message: "Could not create user..",
    };
  }
  await signIn("credentials", formData);
}

export async function logOut() {
  await sleep(1000)
  await signOut({ redirectTo: "/" });
}

// ----pet actions --------------------------------

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await authCheck();
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
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  //autentication check
  const session = await authCheck();

  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data..",
    };
  }

  //authorization check
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "pet not found",
    };
  }
  if (pet.userId != session.user?.id) {
    return {
      message: "Not authorized..",
    };
  }

  //database mutation
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
  await sleep(1000);

  //authentication check
  const session = await auth();

  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data..",
    };
  }

  //authorization check
  //user with this email is alloweded or not to delete the pet (user owns the pet)
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "No pet found",
    };
  }
  if (pet.userId != session?.user.id) {
    //if the current user id is not equal to the
    return {
      message: "Not authorized..",
    };
  }

  //database mutation
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

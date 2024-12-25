"use server";

import { auth, signIn, signOut } from "@/lib/auth-no-edge";
import prisma from "@/lib/db";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { authCheck, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//---------user actions---------------------

export async function logIn(prevState: unknown, formData: unknown) {

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
export async function signUp(prevState: unknown, formData: unknown) {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }

    return {
      message: "Could not create user.",
    };
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// ----pet actions --------------------------------

//it takes whatever we are putting in the form using action attribute and updating the db
export async function addPet(pet: unknown) {

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

//--------payemtn actions ------------
export async function createCheckoutSession() {
  //authenticatiom check
  const session = await authCheck();
  console.log(session.user.email);
  const cheeckoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1QWkykH7qhML6j1fcF6s1BCP",
        quantity: 1,
      },
    ],
    mode :"payment",
    success_url:`${process.env.CANONICAL_URL}/payment?success=true`,  //where to send the user after successful payment
    cancel_url:`${process.env.CANONICAL_URL}/payment?cancelled=true`
  });

  //redirect user
  redirect(cheeckoutSession.url);
}

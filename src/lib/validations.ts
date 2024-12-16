import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { z } from "zod";

export const petIdSchema = z.string().cuid();
//ZOD Validation
export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().url({ message: "Image Url must be a valid URL" }),
    ]),
    age: z.coerce.number().int().positive().max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>; //zod solve the type issues itself

export const authSchema = z.object({
  email : z.string().email().max(100),
  password : z.string().max(90),
})

export type TAuth = z.infer<typeof authSchema>; 


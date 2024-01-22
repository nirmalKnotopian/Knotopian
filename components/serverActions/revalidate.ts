"use server";
import { revalidatePath } from "next/cache";

export const revalidateEmailsPath = () => {
  revalidatePath("/emaiResponse");
};

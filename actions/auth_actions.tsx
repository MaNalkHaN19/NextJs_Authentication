"use server";

import { hashUserPassword } from "../lib/hash";
import { createUser } from "../lib/user";
import { redirect } from "next/navigation";

export async function signup({ formData }: { formData: FormData }) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: { email?: string; password?: string } = {};

  if (!email.includes("@gmail.com")) {
    errors.email = "Invalid email";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  const hashedPassword = hashUserPassword(password);
  try{  
    createUser(email,hashedPassword);
    } catch(error){
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return{
                errors:{
                    email:'Email already exists.'
                }
            };
        }
        throw error;
    }
redirect("/training");
  // Process signup (e.g., store in DB) and return success if needed
}

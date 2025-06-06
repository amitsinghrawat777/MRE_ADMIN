"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
  propertyId: z.string().regex(/^\d+$/, "Invalid Property ID"),
});

export async function submitInquiry(prevState: any, formData: FormData) {
  const supabase = createClient();

  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    propertyId: formData.get('propertyId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.'
    }
  }

  const { name, email, phone, message, propertyId } = validatedFields.data;

  const { error } = await supabase.from('inquiries').insert({
    name,
    email,
    phone,
    message,
    property_id: parseInt(propertyId, 10)
  });

  if (error) {
    console.error('Error submitting inquiry:', error);
    return {
      message: 'Database error: Could not submit inquiry.'
    }
  }

  revalidatePath('/admin/inquiries');

  return { message: "Inquiry submitted successfully!", success: true };
} 
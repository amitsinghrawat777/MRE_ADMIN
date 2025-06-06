"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type InquiryState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    propertyId?: string[];
  };
  success?: boolean;
};

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
  propertyId: z.string().regex(/^\d+$/, "Invalid Property ID"),
});

export async function submitInquiry(prevState: InquiryState, formData: FormData): Promise<InquiryState> {
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
      message: 'Validation failed.',
      success: false
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
      message: 'Database error: Could not submit inquiry.',
      success: false
    }
  }

  revalidatePath('/admin/inquiries');

  return { message: "Inquiry submitted successfully!", success: true };
} 
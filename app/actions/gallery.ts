"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addImageUrlToDb(imageUrl: string, title?: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gallery")
    .insert([{ image_url: imageUrl, title: title || '' }])
    .select()
    .single();

  if (error) {
    console.error("Error saving image to DB:", error);
    return { success: false, message: "Failed to save image to database." };
  }

  revalidatePath("/admin-dashboard");

  return { success: true, message: "Image added to gallery.", image: data };
}

export async function deleteImageFromDb(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    console.error("Error deleting image from DB:", error);
    return { success: false, message: "Failed to delete image." };
  }

  revalidatePath("/admin-dashboard");

  return { success: true, message: "Image deleted." };
}
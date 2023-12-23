import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("مشکلی در دریافت لیست ویلا ها رخ داد");
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create/update cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id)
    query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  // B) Update
  if (id)
    query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(`مشکلی در ${id ? "ویرایش" : "ایجاد"} ویلا رخ داد`);
  }

  // 2) Upload image
  if (imagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin if there was an error in uploading image
  if (storageError) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("مشکلی در بارگذاری تصویر رخ داد");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("مشکلی در حذف ویلا رخ داد");
  }
}

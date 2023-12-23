import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.log(error);
    throw new Error("مشکلی در دریافت تنظیمات رخ داد");
  }
  return data;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.log(error);
    throw new Error("مشکلی در بروزرسانی تنظیمات رخ داد");
  }

  return data;
}

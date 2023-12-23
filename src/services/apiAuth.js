import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);

    if (error.message === "User already registered")
      throw new Error("کاربری با این مشخصات قبلا ثبت شده است");

    throw new Error("مشکلی در ایجاد کاربر رخ داد");
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
}

export async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  // 1) Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw new Error("مشکلی در بروزرسانی حساب کاربری رخ داد");
  }

  if (!avatar) return data;

  // 2) Upload avatar image to the bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error("مشکلی در بارگذاری تصویر رخ داد");
  }

  // 3) Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    console.error(error2);
    throw new Error("مشکلی در بروزرسانی حساب کاربری رخ داد");
  }

  return updatedUser;
}

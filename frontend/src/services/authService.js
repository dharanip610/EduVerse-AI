import { supabase } from "../config/supabase";

// Signup
export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

// Login
export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// Logout
export async function signOut() {
  return await supabase.auth.signOut();
}

// Current Session
export async function getSession() {
  return await supabase.auth.getSession();
}

// Current User
export async function getUser() {
  return await supabase.auth.getUser();
}

// Forgot Password
export async function forgotPassword(email) {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-password",
  });
}

// Reset Password
export async function updatePassword(password) {
  return await supabase.auth.updateUser({
    password,
  });
}
export async function isAdmin(userId) {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}
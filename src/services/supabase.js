import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://izsufvpaplqjfmjdwpwd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c3VmdnBhcGxxamZtamR3cHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMTM5OTIsImV4cCI6MjAxNzg4OTk5Mn0.3Bdi2_EodhYEw_UYFhIhepjnweEX3iGnTFsTN0BPLKY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

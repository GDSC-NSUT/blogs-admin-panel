"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signOutUser() {
    const cookiestore = cookies()
    const supabase = createClient(cookiestore);
    await supabase.auth.signOut();
    redirect("/")
}
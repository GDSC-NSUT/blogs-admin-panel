"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";

export default async function accountFormSubmit(userId: string, formdata: FormData) {
    let username = formdata.get("username") as string;
    if (!userId || !username) throw new Error("Username or id not found");
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    await supabase.from("profiles").update({
        username
    }).eq("id", userId);
}
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function downloadPath(path: string) {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const {data} = supabase.storage.from("avatars").getPublicUrl(path);
    return {
        path: data.publicUrl,
    }
}
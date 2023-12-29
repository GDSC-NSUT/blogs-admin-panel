import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const {data: {session}} = await supabase.auth.getSession();
    if (session) {
        await supabase.auth.signOut();
    }
    return NextResponse.redirect(new URL("/", req.url), {
        status: 302
    })
}
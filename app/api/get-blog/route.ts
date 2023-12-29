import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const id = params.get("id")!;
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const {data, error} = await supabase.from("blogs").select("*").eq("id", id).single();
    if (error) throw new Error(error.message);
    return NextResponse.json(data);
}
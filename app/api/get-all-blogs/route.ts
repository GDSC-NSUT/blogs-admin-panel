import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const {data, error} = await supabase.from("blogs").select("*");
    if (error) return NextResponse.error();
    const blogs = [data.map((blog: Blog) => {
        return {
            id: blog.id,
            slug: blog.slug,
            title: blog.title,
            content: blog.content,
            created_by: blog.created_by 
        }
    })]
    return NextResponse.json(blogs);
}
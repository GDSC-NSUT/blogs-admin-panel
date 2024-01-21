import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers"

export default async function Page() {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const { data, error } = await supabase.from('blogs').select("*");
    if(error || data == null) return <div>Some Error</div>;
    return <div>Hello World</div>
}
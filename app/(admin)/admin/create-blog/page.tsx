import { cookies } from "next/headers"
import HomePage from "./Client"
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const {data: {session}} = await supabase.auth.getSession();
    if(!session) return "Error";
    return <HomePage session={session} />
}
export default Page
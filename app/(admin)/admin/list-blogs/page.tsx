import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Table from "./Table";

export default async function Page() {
    const cookiestore = cookies();
    const supabase = createClient(cookiestore);
    const { data, error } = await supabase.from("blogs").select("*");
    console.log(data);

    if (error || data == null) return <div>Some Error</div>;

    const blogs = data;
    return (
        <div>
            <Table blogs={blogs} />
        </div>
    );
}

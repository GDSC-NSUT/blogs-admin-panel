import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

const Page = async () => {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { data, error } = await supabase.from('blogs').select('*');
	if (error) return error.message;

	return <div className='w-full'>
        {data.map((blog: Blog) => {
            return <div key={blog.id}>
                <Link prefetch={false} href={`/blog/${blog.slug}`}>{blog.title}</Link>
                <p>{blog.content.slice(0, 200)}....</p>
            </div>
        })}
    </div>;
};
export default Page;

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import CreateBlogComponent from './Client';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: { blogid: string } }) => {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const { data } = await supabase
		.from('blogs')
		.select('*')
		.eq('id', params.blogid)
		.single();
	if (data == null || session === null) return <div>Some Error</div>;
	if (session.user.id != data.created_by) notFound();
	return <CreateBlogComponent blog={data} />;
};
export default Page;

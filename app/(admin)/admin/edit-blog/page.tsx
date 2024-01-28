import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CreateBlogComponent from './Client';

const Page = async () => {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session)
		redirect(
			'/login?message=You must be logged in to view this route group'
		);
	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();
	if (data == null) return <div>Some Error</div>;
	return <CreateBlogComponent session={session} author={data.name} />;
};
export default Page;

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Index() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	let isSupabaseInit = true;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase.from('blogs').select('*');

	if (error || !data.length) isSupabaseInit = false;

	return (
		<>
			<div>Hello {isSupabaseInit ? 'Bro' : ', Found an error'}</div>
			{session ? (
				'Logged in'
			) : (
				<Link href='/login' className='hover:underline'>
					Login Now
				</Link>
			)}
			<br />
			{session ? (
				<Link className='hover:underline' prefetch={false} href='/admin'>
					Admin panel
				</Link>
			) : (
				''
			)}
			{isSupabaseInit
				? data?.map((blog: Blog) => (
						<Link
							href={`/blog/${blog.slug}`}
							className='hover:underline'
							prefetch={false}
							key={blog.id}>
							{blog.title}
						</Link>
				  ))
				: 'No blogs found'}
		</>
	);
}

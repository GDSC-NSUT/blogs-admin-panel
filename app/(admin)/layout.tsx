import { Button } from '@/components/Button';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session)
		redirect('/login?message=You must be logged in to view this route');

	return (
		<div className='border w-full min-h-screen block md:flex '>
			<div className='min-w-[215px] border flex md:block space-x-2 md:space-x-0 md:space-y-2 p-2  '>
				<Link
					prefetch={false}
					href='/admin'
					className='p-1 md:block md:w-full '>
					<Button className='w-full text-xl font-bold '>
						Admin Panel
					</Button>
				</Link>
				<Link
					prefetch={false}
					href='/admin/create-blog'
					className='p-1 md:block md:w-full '>
					<Button className='w-full text-xl font-bold '>
						Create a Blog
					</Button>
				</Link>
				<Link
					prefetch={false}
					href='/blogs'
					className='p-1 md:block md:w-full '>
					<Button className='w-full text-xl font-bold '>
						Blogs
					</Button>
				</Link>
				<form
					action='/auth/sign-out'
					className='block p-1 md:block md:w-full '
					method='POST'>
					<Button variant="outline" className='w-full text-xl font-bold ' type='submit'>
						Sign Out
					</Button>
				</form>
			</div>
			<div className='w-full'>{children}</div>
		</div>
	);
}

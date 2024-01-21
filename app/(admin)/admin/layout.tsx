import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default async function Layout({ children }: PropsWithChildren) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session)
		redirect('/login?message=You must be logged in to view this route group');

	return (
		<div className='w-full min-h-screen'>
			<Navbar session={session}>{children}</Navbar>
		</div>
	);
}

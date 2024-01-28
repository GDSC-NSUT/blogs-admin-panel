import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default async function Layout({ children }: PropsWithChildren) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session === null) return <div>Some Error</div>;
	return (
		<div className='w-full min-h-screen'>
			<Navbar session={session}>{children}</Navbar>
		</div>
	);
}

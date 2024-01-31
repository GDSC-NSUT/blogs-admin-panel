import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const loggedIn = JSON.stringify(session) != 'null';
	return (
		<div className='w-full min-h-screen flex items-center justify-center flex-col'>
			<h1>
				The Page could not be found or you don't have the required
				access
			</h1>
			<Link
				href={loggedIn ? '/admin' : '/login'}
				className='hover:underline text-slate-50/50 hover:text-slate-50 transition'>
				{loggedIn ? 'Go To Admin page' : 'Go to Login Page'}
			</Link>
		</div>
	);
}

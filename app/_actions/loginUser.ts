'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function loginUser(formdata: FormData) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { error } = await supabase.auth.signInWithPassword({
		email: formdata.get('email') as string,
		password: formdata.get('password') as string,
	});
	let redirectPath = error ? `/login?message=${error.message}` : '/admin';
	redirect(redirectPath);
}

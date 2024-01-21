'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signOutUser() {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	await supabase.auth.signOut();
	revalidatePath('/');
	redirect('/');
}

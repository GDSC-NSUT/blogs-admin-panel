'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function accountFormSubmit(
	initialState: any,
	formdata: FormData
) {
	let username = formdata.get('username') as string;
	let name = formdata.get('name') as string;
	let userId = formdata.get('id');
	if (!userId || !username) throw new Error('Username or id not found');
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { error } = await supabase
		.from('profiles')
		.update({
			username,
			name,
		})
		.eq('id', userId);
	if (error)
		return {
			message: error.message,
			success: false,
		};
	else
		return {
			message: 'Done',
			success: true,
		};
}

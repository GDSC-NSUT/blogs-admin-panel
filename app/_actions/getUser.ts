'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function getUser(userid: string) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userid)
		.single();
	if (error) {
		return {
			username: null,
			avatar: null,
			error: error.message,
		};
	}
	return {
		username: data.username,
		avatar: data.avatar_url,
		error: null,
	};
}

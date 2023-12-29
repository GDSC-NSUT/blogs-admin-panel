'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import slugify from 'react-slugify';

export default async function createBlog(
	title: string,
	content: string,
	created_by: string
) {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { error } = await supabase.from('blogs').insert({
		title,
		content,
		created_by,
		slug: slugify(title),
	});
	if (error) return { error: error.message };
	else return { error: null };
}

'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { BlogContentType } from '../(admin)/admin/create-blog/Client';
import { redirect } from 'next/navigation';

export default async function editBlog(
	blogData: BlogContentType,
	id: number,
	formdata: FormData
) {
	const title = blogData.title;
	const content = blogData.content;
	// const created_by =
	const slug = blogData.slug;
	const author = blogData.author;
	const tagsArr = blogData.tagsArr;
	const cover_image = blogData.cover_image;
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { error } = await supabase
		.from('blogs')
		.update({
			title,
			content,
			// created_by,
			slug,
			author,
			tagsArr,
			cover_image: cover_image,
		})
		.eq('id', id);
	if (error) redirect(`/admin?error=${error.message}`);
	redirect('/admin/list-blogs');
}
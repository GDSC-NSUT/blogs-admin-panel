'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

type ReturnType = {
	success: boolean;
	error: string | null;
};

export default async function unpublish(id: number): Promise<ReturnType> {
	// try {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { data: row, error: err } = await supabase
		.from('blogs')
		.select('published,created_by')
		.eq('id', id)
		.single();
	if (row == null || err)
		throw new Error(err ? err.message : 'No Rows Found');
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();
	if (!session || error)
		throw new Error(error ? error.message : 'No Session found');
	if (
		session.user.id != row.created_by &&
		session.user.email != process.env.SUPERADMIN_EMAIL
	)
		throw new Error("You don't have the required acsess");
	const { error: updateError } = await supabase
		.from('blogs')
		.update({
			published: !row.published,
		})
		.eq('id', id);
	if (updateError) throw new Error(updateError.message);
	revalidatePath('/admin/list-blogs');
	// redirect('/admin/list-blogs');
	return { success: true, error: null };
	// } catch (err: any) {
	// 	return { success: false, error: err.message };
	// }
}

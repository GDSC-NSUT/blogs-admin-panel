import downloadPath from '@/app/_actions/downloadPath';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountForm from './AccountForm';

const Page = async ({searchParams}: {searchParams: {message: string}}) => {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session?.user.id!)
		.single();
	if (error || !data) redirect(`/login?message=${error.message}`);
	let { path } = downloadPath(data.avatar_url!);

	return (
		<div className='w-full min-h-full flex items-center justify-center '>
      <AccountForm session={session!} profile={data} urlPath={path} message={searchParams.message} />
		</div>
	);
};
export default Page;

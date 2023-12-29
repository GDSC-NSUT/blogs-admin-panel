'use client';

import accountFormSubmit from '@/app/_actions/accountFormSubmit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Input } from '@/components/Input';
import { createClient } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import { ChangeEventHandler, useState } from 'react';
import SubmitButton from './SubmitButton';

export default function AccountForm({
	session,
	profile,
	urlPath,
	message
}: {
	session: Session;
	profile: Profile;
	urlPath: string;
	message: string;
}) {
	const [username, setUsername] = useState(profile.username!);
	const [filePath, setFilePath] = useState(urlPath);
	const [loading, setLoading] = useState(false);
	const supabase = createClient();

	const handleChange: ChangeEventHandler<HTMLInputElement> = async event => {
		try {
			setLoading(true);
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = event.target.files[0];
			const fileExt = file.name.split('.').pop();
			const filepth = `${session.user.id}-${Math.random()}.${fileExt}`;
			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filepth, file);
			const { error } = await supabase
				.from('profiles')
				.update({
					avatar_url: filepth,
					updated_at: new Date().toISOString(),
				})
				.eq('id', session.user.id);
			if (uploadError) throw uploadError;
			if (error) throw error;
			const { data: path } = supabase.storage
				.from('avatars')
				.getPublicUrl(filepth);
			setFilePath(path.publicUrl);
		} catch (e: any) {
			alert(e.message);
		} finally {
			setLoading(false);
		}
	};

	const formSubmit = accountFormSubmit.bind(null, session.user.id);

	return (
		<form className='animate-in text-foreground' action={formSubmit}>
			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<label className='text-xl m-3' htmlFor='email'>
					Email
				</label>
				<Input
					value={session?.user.email}
					disabled
					className='border-2 m-1'
				/>
			</div>
			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<label className='text-xl m-3' htmlFor='username'>
					Username
				</label>
				<Input
					name='username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='m-1'
				/>
			</div>
			<div className='flex mt-4 w-full max-w-sm items-center relative'>
				<label className='text-xl m-3' htmlFor='username'>
					Profile Picture :
				</label>
				<Avatar className='border-2 w-20 h-20'>
					<AvatarImage src={filePath} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Input
					className='opacity-0 absolute top-0  right-0 z-10 w-20 h-20 rounded-full cursor-pointer'
					accept='image/*'
					onChange={handleChange}
					type='file'
				/>
			</div>
			<div className='grid w-full mt-2 p-2 pr-0 max-w-sm items-center gap-1.5'>
				<SubmitButton loading={loading} text="Update.."  />
			</div>
		</form>
	);
}

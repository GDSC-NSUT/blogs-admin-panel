'use client';

import accountFormSubmit from '@/app/_actions/accountFormSubmit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import { ChangeEventHandler, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const initialState = {
	message: '',
	success: false,
};

export default function AccountForm({
	session,
	profile,
	urlPath,
	message,
}: {
	session: Session;
	profile: Profile;
	urlPath: string;
	message: string;
}) {
	const [username, setUsername] = useState(profile.username!);
	const [name, setName] = useState(profile.name!);
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

	const [state, formSubmit] = useFormState(accountFormSubmit, initialState);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Modify your profile details here</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					className='animate-in text-foreground'
					action={formSubmit}>
					<input
						type='text'
						value={session.user.id}
						className='hidden'
						name='id'
						readOnly
					/>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label className='text-xl m-3' htmlFor='email'>
							Email
						</Label>
						<Input
							value={session?.user.email}
							disabled
							className='border-2 m-1'
						/>
					</div>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label className='text-xl m-3' htmlFor='username'>
							Username
						</Label>
						<Input
							name='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='m-1'
						/>
					</div>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label className='text-xl m-3' htmlFor='username'>
							Name
						</Label>
						<Input
							name='name'
							value={name}
							onChange={e => setName(e.target.value)}
							className='m-1'
						/>
					</div>
					<div className='flex mt-4 w-full max-w-sm justify-between items-center relative'>
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
						<SubmitButton loading={loading} text='Update..' />
					</div>
				</form>
				{!state?.success && state?.message ? (
					<div className='w-full mt-3 p-2'>
						<div className='w-full bg-red-500 p-3 font-bold max-w-[370px] rounded-lg'>
							{state?.message}
						</div>
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

function SubmitButton({ loading = false, text = 'Sign In' }) {
	const { pending } = useFormStatus();
	return (
		<Button
			variant='default'
			className='mt-2 w-full'
			type='submit'
			disabled={pending || loading}
			aria-disabled={pending || loading}>
			{text}
		</Button>
	);
}

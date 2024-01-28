'use client';

import loginUser from '../_actions/loginUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Login({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	const router = useRouter();
	useEffect(() => {
		let toastId: string | number;
		if (searchParams && searchParams.message) {
			toastId = toast.error('Error', {
				description: searchParams.message,
				duration: 5000,
			});
		}

		const checkLoggedIn = async () => {
			const supabase = createClient();
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (JSON.stringify(session) != 'null') router.push('/admin');
		};
		checkLoggedIn();

		return () => {
			toast.dismiss(toastId);
		};
	}, [searchParams]);

	return (
		<div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 relative'>
			<form
				className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
				action={loginUser}>
				<div className='w-full  space-y-3'>
					<div className='w-full space-y-1'>
						<label className='text-xl' htmlFor='email'>
							Email
						</label>
						<Input
							name='email'
							placeholder='you@example.com'
							required
						/>
					</div>
					<div className='w-full space-y-1'>
						<label className='text-xl' htmlFor='password'>
							Password
						</label>
						<Input
							type='password'
							name='password'
							placeholder='••••••••'
							required
						/>
					</div>
					<SubmitButton />
				</div>
			</form>
		</div>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			variant='default'
			className='mt-2 w-full'
			type='submit'
			disabled={pending}
			aria-disabled={pending}>
			Sign In
		</Button>
	);
}

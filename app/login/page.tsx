"use client"

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import loginUser from '../_actions/loginUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export default function Login({
	searchParams,
}: {
	searchParams: { message: string };
}) {
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
					<Link href='/'>
						<Button variant='outline' className='w-full mt-3 '>
							<ArrowLeftCircle className='mr-2' />Go Back
						</Button>
					</Link>
					{searchParams?.message && (
						<p className='mt-4 p-4 bg-foreground/10 text-foreground text-center border-2 rounded-xl border-red-500'>
							{searchParams.message}
						</p>
					)}
				</div>
			</form>
		</div>
	);
}

function SubmitButton() {
    const {pending} = useFormStatus();
    return <Button variant="default" className='mt-2 w-full' type="submit" disabled={pending} aria-disabled={pending}>Sign In</Button>;
}
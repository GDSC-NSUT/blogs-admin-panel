'use client';

import { Button } from '@/components/Button';
// Still in canary
// @ts-ignore
import { useFormStatus } from 'react-dom';

export default function SubmitButton({loading=false, text="Sign In"}) {
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

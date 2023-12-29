'use client';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import createBlog from '@/app/_actions/createBlog';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Dont remove
// @ts-ignore
import * as commands from '@uiw/react-md-editor/commands';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function HomePage({ session }: {session: Session}) {
	const [value, setValue] = useState<string | undefined>('**Hello world!!!**');
	const [title, setTitle] = useState<string>("");
	const router = useRouter();
	const handleSubmit = async () => {
		const {error} = await createBlog(title, value!, session.user.id);
		if(error) alert(error);
 		else router.push("/blogs")
	}
	return (
		<div className='w-full h-full flex flex-col items-center justify-center '>
			<div className='w-[90%] ' data-color-mode='dark'>
				<div className='flex space-x-3 mb-4 '>
					<Input
						onChange={e => setTitle(e.target.value)}
						className='font-semibold  '
						placeholder='Title...'
						required
					/>
					<Button onClick={handleSubmit}>Submit</Button>
				</div>
				<MDEditor value={value} onChange={setValue} height={750} />
			</div>
		</div>
	);
}

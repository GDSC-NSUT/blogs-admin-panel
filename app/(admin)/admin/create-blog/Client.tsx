'use client';

import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import 'react-quill/dist/quill.snow.css';
import QuillEditor from './QuillEditor';

export type BlogContentType = {
	title: string;
	content: string;
	tagsArr: string[];
	cover_image: string;
	author: string;
	slug: string;
};

export default function CreateBlogComponent({
	session,
	author,
}: {
	session: Session;
	author: string;
}) {
	const [value, setValue] = useState<string | undefined>(
		'Write something awesome...'
	);
	// const [title, setTitle] = useState<string>('');

	const [blogData, setBlogData] = useState<BlogContentType>({
		title: '',
		content: '',
		tagsArr: [] as string[], // Initialize with an empty array
		cover_image: '',
		author: author,
		slug: '',
	});

	useEffect(() => {
		if (value) {
			setBlogData({ ...blogData, content: value });
		}
	}, [value]);

	return (
		<div className='w-full flex flex-col space-y-3 '>
			<div>
				<QuillEditor
					// session={session}
					blogData={blogData}
					setBlogData={setBlogData}
					value={value}
					setValue={setValue}
				/>
			</div>
		</div>
	);
}

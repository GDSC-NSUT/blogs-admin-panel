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

	// if (typeof window === "undefined") return null;

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

				{/* <div>
					{value && (
						<div className='border   min-h-screen border-red-500   w-full ql-snow'>
							<div
								className='ql-editor bg-white text-gray-700'
								dangerouslySetInnerHTML={{
									// __html: DOMPurify.sanitize(richHtml),
									__html: value,
								}}></div>
						</div>
					)}
				</div> */}
			</div>
			{/* <div className='col-span-1'>
				<RightSidebar blogData={blogData} setBlogData={setBlogData} />
			</div> */}
		</div>
	);
}

'use client';

import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillEditor from './QuillEditor';

export type BlogContentType = {
	title: string;
	content: string | undefined;
	tagsArr: string[];
	cover_image: string;
	author: string;
	slug: string;
};

export default function CreateBlogComponent({ blog }: { blog: Blog }) {
	const [blogData, setBlogData] = useState<BlogContentType>({
		title: blog.title,
		content: blog.content,
		tagsArr: blog.tagsArr, // Initialize with an empty array
		cover_image: blog.cover_image || '',
		author: blog.author,
		slug: blog.slug,
	});
	const [value, setValue] = useState<string | undefined>(blog.content);

	return (
		<div className='w-full flex flex-col space-y-3 '>
			<div>
				<QuillEditor
					blogData={blogData}
					setBlogData={setBlogData}
					value={value}
					setValue={setValue}
					id={blog.id}
				/>
			</div>
		</div>
	);
}

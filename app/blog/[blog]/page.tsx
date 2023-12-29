import downloadPath from '@/app/_actions/downloadPath';
import getUser from '@/app/_actions/getUser';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Page = async ({ params }: { params: { blog: string } }) => {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);
	const { data, error } = await supabase
		.from('blogs')
		.select('*')
		.eq('slug', params.blog)
		.single();
	if (error || !data) return 'Error fetching';
	let {username, avatar, error: err} = await getUser(data.created_by);
	let {path} = downloadPath(avatar as string);
	return (
		<div className='w-full flex justify-center'>
			<div className='w-[50%] border p-2 '>
				<h1 className='text-2xl font-bold text-center '>{data.title}</h1>
				<h3 className='text-xl'>by {username && avatar ? username : err} <Image alt="profile" className="inline" src={path} height={30} width={30} /> at {data.created_at}</h3>
				<Markdown
					children={data.content}
					components={{
						code(props) {
							const { children, className, node, ref, ...rest } =
								props;
							const match = /language-(\w+)/.exec(
								className || ''
							);
							return match ? (
								<SyntaxHighlighter
									{...rest}
									PreTag='div'
									children={String(children).replace(
										/\n$/,
										''
									)}
									language={match[1]}
									style={oneDark}
								/>
							) : (
								<code {...rest} className={className}>
									{children}
								</code>
							);
						},
					}}
				/>
			</div>
		</div>
	);
};
export default Page;

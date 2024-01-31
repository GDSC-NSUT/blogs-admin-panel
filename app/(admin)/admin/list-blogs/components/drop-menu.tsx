import unpublish from '@/app/_actions/unpublish';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Spinner from '@/components/ui/spinner';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DropMenu({ blog }: { blog: Blog }) {
	const [loading, setLoading] = useState(false);
	if (loading) return <Spinner />;
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setLoading(true);

		const data = unpublish(blog.id);
		toast.promise(data, {
			loading: 'Loading...',
			success: data => {
				return 'Completed Sucsessfully';
			},
			error: error => {
				return error.message;
			},
			finally: () => {
				setLoading(false);
			},
		});
	};

	const router = useRouter();
	const editBlog = async (e: Event) => {
		setLoading(true);
		router.push(`/admin/edit-blog/${blog.id}`);
		setLoading(false);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onSelect={handleSubmit}>
					{blog.published ? 'Unpublish' : 'Publish'}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={editBlog}>Edit</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

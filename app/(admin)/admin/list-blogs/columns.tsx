'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import DropMenu from './components/drop-menu';

export const columns: ColumnDef<Blog>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					ID
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-start px-4'>{row.getValue('id')}</div>
		),
	},
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					Title
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-start px-4'>{row.getValue('title')}</div>
		),
	},
	{
		accessorKey: 'author',
		header: 'Author',
	},
	{
		accessorKey: 'published',
		header: () => <div className='text-right'>Published</div>,
		cell: ({ row }) => {
			return (
				<div className='text-right font-medium'>
					{row.getValue('published') ? 'Published' : 'Not Published'}
				</div>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					Created At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const dat = new Date(row.getValue('created_at'));
			return <div>{dat.toUTCString()}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const blog = row.original;

			return <DropMenu blog={blog} />;
		},
	},
];

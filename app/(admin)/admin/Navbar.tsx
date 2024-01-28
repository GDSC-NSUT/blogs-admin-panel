'use client';

import signOutUser from '@/app/_actions/signOutUser';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import {
	ComponentPropsWithoutRef,
	ElementRef,
	ReactNode,
	forwardRef,
} from 'react';

const blogComponents: { title: string; href: string; description: string }[] = [
	{
		title: 'Create a Blog',
		href: '/admin/create-blog',
		description: 'Use this page to create a Blog',
	},
	{
		title: 'Blogs',
		href: '/admin/list-blogs',
		description: 'Use this page to list all the blogs',
	},
];

export default function Navbar({
	children,
	session,
}: {
	children: ReactNode;
	session: Session;
}) {
	const router = useRouter();
	const handleSignOut = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push('/');
	};
	return (
		<>
			<nav className='w-full border p-3 mb-3 bg-secondary/50 sticky top-0 z-10 backdrop-filter backdrop-blur-lg'>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href='/admin' legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}>
									Admin Panel
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Blog</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
									{blogComponents.map(blogComponent => (
										<ListItem
											key={blogComponent.title}
											title={blogComponent.title}
											href={blogComponent.href}>
											{blogComponent.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								Profile
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
									<ListItem
										title='Update Profile'
										href='/admin/profile'>
										Update your Profile
									</ListItem>
									<ListItem
										title='Sign Out'
										onClick={handleSignOut}
										className='hover:cursor-pointer'>
										Remember to Save your changes
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			{children}
		</>
	);
}

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}>
						<div className='text-sm font-medium leading-none'>
							{title}
						</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';

import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'GDSC NSUT Blog',
	description: 'GDSC NSUT Blog',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${cn(GeistSans.className, 'antialiased', 'dark')}`}>
				<Toaster />
				<main className='min-h-screen flex flex-col items-center'>
					<NextTopLoader color='red' />
					{children}
				</main>
			</body>
		</html>
	);
}

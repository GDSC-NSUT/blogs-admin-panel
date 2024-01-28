import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function Page() {
	const cookiestore = cookies();
	const supabase = createClient(cookiestore);

	const { data, error } = await supabase.from('blogs').select('*');
	if (error?.message || data == null) throw new Error(error.message);

	// const newD = [
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// 	...data,
	// ];

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={data} />
			{/* <DataTable columns={columns} data={newD} /> */}
		</div>
	);
}

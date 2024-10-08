export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			blogs: {
				Row: {
					author: string;
					content: string;
					cover_image: string | null;
					created_at: string;
					created_by: string;
					id: number;
					published: boolean;
					slug: string;
					tagsArr: string[];
					title: string;
				};
				Insert: {
					author?: string;
					content: string;
					cover_image?: string | null;
					created_at?: string;
					created_by?: string;
					id?: number;
					published?: boolean;
					slug: string;
					tagsArr?: string[];
					title: string;
				};
				Update: {
					author?: string;
					content?: string;
					cover_image?: string | null;
					created_at?: string;
					created_by?: string;
					id?: number;
					published?: boolean;
					slug?: string;
					tagsArr?: string[];
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'blogs_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					email: string | null;
					id: string;
					name: string;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					email?: string | null;
					id: string;
					name?: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					email?: string | null;
					id?: string;
					name?: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			delete_avatar: {
				Args: {
					avatar_url: string;
				};
				Returns: Record<string, unknown>;
			};
			delete_storage_object: {
				Args: {
					bucket: string;
					object: string;
				};
				Returns: Record<string, unknown>;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never;

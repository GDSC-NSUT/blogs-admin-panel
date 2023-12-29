import type { Database as DB, Tables } from "./_types/database.types";

declare global {
    type Database = DB;
    type Blog = Tables<'blogs'>;
    type Profile = Tables<'profiles'>;
}
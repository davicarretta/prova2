import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'sua_url_aqui';
const SUPABASE_ANON_KEY = 'sua_chave_api_aqui';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

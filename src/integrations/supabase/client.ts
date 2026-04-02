import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://izebxyvfrlkvqgjwteol.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_M71Zyh8SH-Pmi-7Os6MkPg_XvY24IhE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

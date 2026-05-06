import { createClient } from '@supabase/supabase-js';

// These are your specific project credentials
const supabaseUrl = 'https://pojtdpnrurntlsivxnyn.supabase.co';
const supabaseAnonKey = 'sb_publishable_jsV7FrIzfJeRpZDJiVZU3g_nEfdFfmS';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
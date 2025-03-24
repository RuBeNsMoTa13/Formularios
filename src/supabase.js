import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar a conexão com o Supabase
supabase
  .from('business_info')
  .select('*')
  .then(({ data, error }) => {
    if (error) {
      console.error('Erro ao conectar ao Supabase:', error);
    } else {
      console.log('Conexão com o Supabase bem-sucedida:', data);
    }
  });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão sendo carregadas
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não estão definidas.');
}

// Adicionando o schema 'formularios' na configuração
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'formularios' }
});

// Verificar a conexão com o Supabase
(async () => {
  try {
    // Corrigido o nome da tabela para 'business_form'
    const { data, error } = await supabase
      .from('business_form') // Nome correto da tabela
      .select('*')
      .limit(1);

    if (error) {
      console.error('Erro ao conectar ao Supabase:', error.message);
    } else {
      console.log('Conexão com o Supabase bem-sucedida:', data);
    }
  } catch (err) {
    console.error('Erro inesperado ao conectar ao Supabase:', err.message);
  }
})();
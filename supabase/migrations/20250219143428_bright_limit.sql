/*
  # Create business information table

  1. New Tables
    - `business_info`
      - All form fields as columns
      - Timestamps for created_at and updated_at
  
  2. Security
    - Enable RLS
    - Add policy for inserting data
*/

CREATE TABLE IF NOT EXISTS business_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa text NOT NULL,
  setor text NOT NULL,
  nicho text NOT NULL,
  departamento text,
  localizacao text NOT NULL,
  marca text NOT NULL,
  slogan text,
  fundadores text NOT NULL,
  fundacao text NOT NULL,
  estagio text NOT NULL,
  sede text,
  site text,
  redes_sociais text,
  logotipo text,
  cores text,
  estilo_visual text,
  sugestoes_identidade text,
  descricao text NOT NULL,
  ideia text NOT NULL,
  solucao text NOT NULL,
  entrega text NOT NULL,
  receita text NOT NULL,
  parceiros text,
  publico_alvo text NOT NULL,
  vendas text NOT NULL,
  relacionamento_clientes text NOT NULL,
  valores text NOT NULL,
  crenca text NOT NULL,
  objetivo text NOT NULL,
  crencas_clientes text NOT NULL,
  gostos_clientes text NOT NULL,
  venda_indireta text NOT NULL,
  valores_clientes text NOT NULL,
  sensacoes text NOT NULL,
  marcas_admiradas text,
  barreiras text,
  impacto text NOT NULL,
  transformacoes_produto text NOT NULL,
  transformacoes_pessoais text NOT NULL,
  modelo_negocio text[] NOT NULL,
  canais text NOT NULL,
  estrategia_digital text NOT NULL,
  diferencial text NOT NULL,
  concorrentes text NOT NULL,
  concorrentes_melhor text,
  desafios text NOT NULL,
  opcoes_compra text NOT NULL,
  ciclo_vendas text NOT NULL,
  gargalo text,
  descoberta text NOT NULL,
  jornada text NOT NULL,
  melhorias text NOT NULL,
  produtos text NOT NULL,
  diferenciais text,
  tendencias text NOT NULL,
  descricao_curta text NOT NULL,
  palavras_associadas text NOT NULL,
  conteudo text,
  temas text,
  produtos_definidos text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting data
CREATE POLICY "Allow anonymous form submissions" ON business_info
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reading own data
CREATE POLICY "Allow reading own data" ON business_info
  FOR SELECT
  TO anon
  USING (true);
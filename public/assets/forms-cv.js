import { supabase } from '/src/supabase.js';

// Função para gerar UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("Documento carregado, inicializando formulário...");

  const form = document.getElementById('businessForm');
  const submitButton = form.querySelector('button[type="submit"]');
  let confirmationCheckbox;

  console.log("Formulário encontrado:", !!form);

  if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    // Função para validar campos
    function validateFields() {
      const emptyFields = [];
      inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling;
        if (!input.value.trim() && input.type !== 'file') {
          emptyFields.push(input);
          if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '12px';
            errorDiv.textContent = 'Este campo está vazio.';
            input.insertAdjacentElement('afterend', errorDiv);
          }
        } else if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.remove(); // Remove o alerta se o campo for preenchido
        }
      });
      return emptyFields;
    }

    // Função para criar checkbox de confirmação
    function createConfirmationCheckbox() {
      if (!document.getElementById('confirm-empty-fields')) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.marginTop = '20px';

        confirmationCheckbox = document.createElement('input');
        confirmationCheckbox.type = 'checkbox';
        confirmationCheckbox.id = 'confirm-empty-fields';
        confirmationCheckbox.name = 'confirm-empty-fields';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = 'confirm-empty-fields';
        checkboxLabel.style.marginLeft = '5px';
        checkboxLabel.textContent = 'Você confirma que deseja enviar o formulário com campos vazios?';

        checkboxContainer.appendChild(confirmationCheckbox);
        checkboxContainer.appendChild(checkboxLabel);

        submitButton.insertAdjacentElement('beforebegin', checkboxContainer);

        submitButton.disabled = true;
        confirmationCheckbox.addEventListener('change', () => {
          submitButton.disabled = !confirmationCheckbox.checked;
        });
      }
    }

    // Adicionar validação em tempo real para remover mensagens de erro ao preencher
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message') && input.value.trim()) {
          errorMessage.remove(); // Remove a mensagem de erro ao preencher o campo
        }
        if (confirmationCheckbox) {
          confirmationCheckbox.parentElement.remove(); // Remove a checkbox se todos os campos forem preenchidos
          confirmationCheckbox = null;
          submitButton.disabled = false;
        }
      });
    });

    // Adicionar validação no envio do formulário
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      console.log("Formulário enviado, iniciando processamento...");

      const emptyFields = validateFields(); // Exibe mensagens de erro ao clicar em enviar

      if (emptyFields.length > 0) {
        if (!confirmationCheckbox) {
          createConfirmationCheckbox(); // Cria a checkbox apenas ao clicar em enviar
        }
        return;
      }

      showAlert('Enviando formulário...', 'info');

      const formData = new FormData(form);

      let data = {
        objetivos_curto: formData.get('objetivos_curto'),
        objetivos_medio: formData.get('objetivos_medio'),
        objetivos_longo: formData.get('objetivos_longo'),
        dados_acompanhados: formData.get('dados_acompanhados'),
        desafios: formData.get('desafios'),
        estrategias_aquisicao: formData.get('estrategias_aquisicao'),
        restricoes_recursos: formData.get('restricoes_recursos'),
        futuro_negocio: formData.get('futuro_negocio'),
        planos_expansao: formData.get('planos_expansao'),
        ferramenta_crm: formData.get('ferramenta_crm'),
        equipes_acesso_crm: formData.get('equipes_acesso_crm'),
        canais_comunicacao: formData.get('canais_comunicacao'),
        canais_prioritarios: formData.get('canais_prioritarios'),
        tom_comunicacao: formData.get('tom_comunicacao'),
        fluxo_atendimento: formData.get('fluxo_atendimento'),
        precos_concorrentes: formData.get('precos_concorrentes'),
        decisao_compra: formData.get('decisao_compra'),
        mercado_sensibilidade: formData.get('mercado_sensibilidade'),
        recorrencia_clientes: formData.get('recorrencia_clientes'),
        meta_faturamento: formData.get('meta_faturamento'),
        vendas_necessarias: formData.get('vendas_necessarias'),
        integracoes_crm: formData.get('integracoes_crm'),
        preferencia_crm: formData.get('preferencia_crm'),
        objetivos_crm: formData.get('objetivos_crm'),
        conhecimento_crm: formData.get('conhecimento_crm'),
        orcamento_crm: formData.get('orcamento_crm'),
        suporte_crm: formData.get('suporte_crm'),
        tipo_funil_vendas: formData.get('tipo_funil_vendas'),
        ticket_venda: formData.get('ticket_venda'),
        estrategias_upsell: formData.get('estrategias_upsell'),
        programa_afiliados: formData.get('programa_afiliados'),
        orcamento_trafego: formData.get('orcamento_trafego'),
        programa_fidelidade: formData.get('programa_fidelidade'),
        engajamento_clientes: formData.get('engajamento_clientes'),
        estrategias_eventos: formData.get('estrategias_eventos'),
        loja_fisica: formData.get('loja_fisica'),
        aquisicao_offline: formData.get('aquisicao_offline'),
      };

      data = replaceEmptyWithNull(data);

      try {
        const { data: result, error } = await supabase
          .from('cv_form')
          .insert([data]);

        if (error) {
          throw error;
        }

        showAlert('Formulário enviado com sucesso!', 'success');
        form.reset();
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showAlert(`Erro ao enviar formulário: ${error.message || "Erro desconhecido"}. Por favor, tente novamente.`, 'error');
      }
    });
  }

  // Função para atualizar contadores de caracteres
  const inputs = document.querySelectorAll('textarea, input[type="text"]');
  inputs.forEach(input => {
    const counter = document.getElementById(`${input.id}-counter`);
    if (counter) {
      input.addEventListener('input', () => {
        counter.textContent = `${input.value.length}/${input.maxLength}`;
      });
    }
  });

  function showAlert(message, type) {
    const alert = document.getElementById('alert');
    if (!alert) {
      console.error("Elemento de alerta não encontrado!");
      return;
    }

    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    alert.classList.remove('hidden');

    setTimeout(() => {
      alert.style.display = 'none';
      alert.classList.add('hidden');
    }, 5000);
  }

  function replaceEmptyWithNull(obj) {
    for (const key in obj) {
      if (obj[key] === '') {
        obj[key] = null;
      }
    }
    return obj;
  }
});

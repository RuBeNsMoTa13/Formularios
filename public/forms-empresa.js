import { supabase } from '../src/supabase.js';

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

        // Verifica se o campo está vazio ou se é um grupo de rádio sem seleção
        if (
          (!input.value.trim() && input.type !== 'file' && input.type !== 'radio') ||
          (input.type === 'radio' && !form.querySelector(`input[name="${input.name}"]:checked`))
        ) {
          if (!emptyFields.includes(input.name)) {
            emptyFields.push(input.name);
          }
          if (input.type === 'radio') {
            const group = form.querySelector(`input[name="${input.name}"]`).parentElement;
            if (!group.querySelector('.error-message')) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'error-message';
              errorDiv.style.color = 'red';
              errorDiv.style.fontSize = '12px';
              errorDiv.textContent = 'Por favor, selecione uma opção.';
              group.appendChild(errorDiv);
            }
          } else if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '12px';
            errorDiv.textContent = 'Este campo está vazio.';
            input.insertAdjacentElement('afterend', errorDiv);
          }
        } else if (input.type === 'radio') {
          const group = form.querySelector(`input[name="${input.name}"]`).parentElement;
          const groupError = group.querySelector('.error-message');
          if (groupError) {
            groupError.remove(); // Remove o alerta se uma opção for selecionada
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

      // Adicionar evento para botões de rádio
      if (input.type === 'radio') {
        input.addEventListener('change', () => {
          const group = form.querySelector(`input[name="${input.name}"]`).parentElement;
          const groupError = group.querySelector('.error-message');
          if (groupError) {
            groupError.remove(); // Remove a mensagem de erro ao selecionar um rádio
          }
          if (confirmationCheckbox) {
            confirmationCheckbox.parentElement.remove();
            confirmationCheckbox = null;
            submitButton.disabled = false;
          }
        });
      }
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
        if (!confirmationCheckbox || !confirmationCheckbox.checked) {
          showAlert('Existem campos obrigatórios que não foram preenchidos. Por favor, confirme para continuar.', 'error'); // Exibe aviso de campos nulos
        }
        return;
      }

      showAlert('Enviando formulário...', 'info');

      const formData = new FormData(form);

      let data = {
        empresa: formData.get('empresa'),
        setor: formData.get('setor'),
        nicho: formData.get('nicho'),
        departamento: formData.get('departamento'),
        localizacao: formData.get('localizacao'),
        marca: formData.get('marca'),
        slogan: formData.get('slogan'),
        fundadores: formData.get('fundadores'),
        fundacao: formData.get('fundacao'),
        estagio: formData.get('estagio'),
        sede: formData.get('sede'),
        site: formData.get('site'),
        redes_sociais: formData.get('redes'),
        cores: formData.get('cores'),
        estilo_visual: formData.get('estilo'),
        sugestoes_identidade: formData.get('sugestoes'),
        descricao: formData.get('descricao'),
        ideia: formData.get('ideia'),
        solucao: formData.get('solucao'),
        entrega: formData.get('entrega'),
        receita: formData.get('receita'),
        parceiros: formData.get('parceiros'),
        publico_alvo: formData.get('publico'),
        vendas: formData.get('vendas'),
        relacionamento_clientes: formData.get('relacionamento'),
        valores: formData.get('valores'),
        crenca: formData.get('crenca'),
        objetivo: formData.get('objetivo'),
        crencas_clientes: formData.get('crencas_clientes'),
        gostos_clientes: formData.get('gostos_clientes'),
        venda_indireta: formData.get('venda_indireta'),
        modelo_negocio: formData.get('modelo_negocio'),
        canais: formData.get('canais'),
        estrategia_digital: formData.get('estrategia_digital'),
        diferencial: formData.get('diferencial'),
        concorrentes: formData.get('concorrentes'),
        concorrentes_melhor: formData.get('concorrentes_melhor'),
        desafios: formData.get('desafios'),
        opcoes_compra: formData.get('opcoes_compra'),
        ciclo_vendas: formData.get('ciclo_vendas'),
        gargalo: formData.get('gargalo'),
        descoberta: formData.get('descoberta'),
        jornada: formData.get('jornada'),
        melhorias: formData.get('melhorias'),
        produtos: formData.get('produtos'),
        diferenciais: formData.get('diferenciais'),
        tendencias: formData.get('tendencias'),
        descricao_curta: formData.get('descricao_curta'),
        palavras_associadas: formData.get('palavras_associadas'),
        conteudo: formData.get('conteudo'),
        temas: formData.get('temas'),
        produtos_definidos: formData.get('produtos_definidos'),
      };

      data = replaceEmptyWithNull(data);

      try {
        const { data: result, error } = await supabase
          .from('business_form')
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

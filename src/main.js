import axios from 'axios';

// ========================================
// 🛠️ FUNÇÕES AUXILIARES MODERNAS
// ========================================
const $ = (id) => document.getElementById(id);
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// ========================================
// 📋 REFERÊNCIAS DOS ELEMENTOS
// ========================================
const elements = {
  input: $('pokemon-input'),
  searchBtn: $('search-btn'),
  statusMessage: $('status-message'),
  pokemonCard: $('pokemon-card'),
  pokemonImage: $('pokemon-image'),
  pokemonName: $('pokemon-name'),
  pokemonTypes: $('pokemon-types'),
  pokemonHeight: $('pokemon-height'),
  pokemonWeight: $('pokemon-weight'),
  pokemonId: $('pokemon-id')
};

// ========================================
// ⚙️ CONFIGURAÇÃO DO AXIOS
// ========================================
// Configuramos uma instância do Axios com configurações padrão
const pokemonAPI = axios.create({
  baseURL: '',
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para requisições - adiciona logs
pokemonAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// Interceptor para respostas - adiciona logs
pokemonAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// ========================================
// 🚀 INICIALIZAÇÃO DA APLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  
  elements.searchBtn.addEventListener('click', buscarPokemon);
  
  elements.input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') buscarPokemon();
  });
  
  configurarExemplos();
  testarConexaoAPI();
});

// ========================================
// 🔍 FUNÇÃO PRINCIPAL: BUSCAR POKÉMON
// ========================================
const buscarPokemon = async () => {
  const nomeOuId = elements.input.value.trim().toLowerCase();
  
  if (!nomeOuId) {
    mostrarErro('Por favor, digite o nome ou número de um Pokémon!');
    return;
  }
  
  mostrarCarregamento(`Buscando ${nomeOuId}...`);
  esconderCartao();
  
  try {
    const dadosPokemon = await fazerRequisicaoAPI(nomeOuId);
    mostrarPokemon(dadosPokemon);
    mostrarSucesso(`Pokémon ${dadosPokemon.name} encontrado!`);
    
  } catch (erro) {
    
    const mensagemErro = erro.response 
      ? `Erro ${erro.response.status}: ${erro.response.data?.detail || 'Erro desconhecido'}`
      : erro.request 
        ? 'Erro de conexão. Verifique sua internet!'
        : `Pokémon "${nomeOuId}" não encontrado. Tente outro nome ou número!`;
    
    mostrarErro(mensagemErro);
  }
};

// ========================================
// 🌐 FUNÇÃO: FAZER REQUISIÇÃO À API COM AXIOS
// ========================================
async function fazerRequisicaoAPI(nomeOuId) {
  const resposta = await pokemonAPI.get
  return resposta.data;
}

// ========================================
// 🎨 FUNÇÃO: MOSTRAR POKÉMON NA TELA
// ========================================
const mostrarPokemon = (dados) => {
  
  // Preenche dados do Pokémon
  elements.pokemonImage.src = 
  elements.pokemonImage.alt = 
  elements.pokemonName.textContent = 
  elements.pokemonHeight.textContent = 
  elements.pokemonWeight.textContent = 
  elements.pokemonId.textContent = 
  
  preencherTipos(dados.types);
  mostrarCartao();
};

// ========================================
// 🏷️ FUNÇÃO: PREENCHER TIPOS DO POKÉMON
// ========================================
const preencherTipos = (types) => {
  elements.pokemonTypes.innerHTML = '';
  
  types.forEach(tipo => {
    const tipoElement = document.createElement('span');
    tipoElement.className = `type-badge ${tipo.type.name}`;
    tipoElement.textContent = capitalize(tipo.type.name);
    elements.pokemonTypes.appendChild(tipoElement);
  });
};

// ========================================
// 💬 FUNÇÕES: MENSAGENS DE STATUS
// ========================================
const mostrarCarregamento = (mensagem) => {
  elements.statusMessage.textContent = mensagem;
  elements.statusMessage.className = 'status-message loading';
  elements.statusMessage.classList.remove('hidden');
};

const mostrarSucesso = (mensagem) => {
  elements.statusMessage.textContent = mensagem;
  elements.statusMessage.className = 'status-message success';
  elements.statusMessage.classList.remove('hidden');
};

const mostrarErro = (mensagem) => {
  elements.statusMessage.textContent = mensagem;
  elements.statusMessage.className = 'status-message error';
  elements.statusMessage.classList.remove('hidden');
};

// ========================================
// 👁️ FUNÇÕES: VISIBILIDADE DO CARTÃO
// ========================================
const mostrarCartao = () => elements.pokemonCard.classList.remove('hidden');
const esconderCartao = () => elements.pokemonCard.classList.add('hidden');

// ========================================
// 🛠️ FUNÇÕES AUXILIARES
// ========================================
// (Função capitalize já está definida no início do arquivo)

// ========================================
// 💡 FUNÇÃO: CONFIGURAR EXEMPLOS
// ========================================
const configurarExemplos = () => {
  const exemploTags = document.querySelectorAll('.example-tag');
  
  exemploTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const nomePokemon = tag.getAttribute('data-pokemon');
      elements.input.value = nomePokemon;
      elements.input.focus();
    });
  });
};

// ========================================
// 🔧 FUNÇÃO: TESTAR CONEXÃO COM A API
// ========================================
const testarConexaoAPI = async () => {
  try {
    await pokemonAPI.get('/pokemon/1');
  } catch (erro) {
    
    mostrarErro('Problema na conexão com a API. Verifique sua internet.');
  }
};
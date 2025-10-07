# 🔴 Explorador de Pokémons - Aula Intermediária de APIs

![Pokémon](https://img.shields.io/badge/Pokémon-API-red?style=for-the-badge&logo=pokemon)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue?style=for-the-badge&logo=axios)
![Vite](https://img.shields.io/badge/Vite-Dev%20Tool-purple?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

## 📚 Sobre esta Aula Intermediária

Este é um projeto educacional **intermediário** para ensinar **consumo de APIs públicas** usando **JavaScript moderno** com **Axios** e **Vite**. Utilizamos a **PokéAPI** como exemplo prático, uma API gratuita e bem documentada que fornece dados sobre Pokémons.

### 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:

- ✅ Configurar um projeto moderno com npm e Vite
- ✅ Usar Axios para requisições HTTP avançadas
- ✅ Trabalhar com ES6 modules (import/export)
- ✅ Configurar interceptors para logging e transformações
- ✅ Implementar tratamento de erros robusto
- ✅ Usar ferramentas de desenvolvimento modernas
- ✅ Preparar-se para frameworks como React/Vue

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js 22.12.0** ou superior
- **npm 10.9.0** ou superior

### Instalação e Execução

```bash
# 1. Clone ou baixe o projeto
cd pokemon-api-aula

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:3000
```

### 📋 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (porta 3000)
npm run build    # Build de produção
npm run preview  # Preview do build (porta 4173)
npm start        # Alias para npm run dev
```

---

## 📁 Estrutura do Projeto

```
pokemon-api-aula/
│
├── src/
│   ├── main.js          # Lógica principal com Axios
│   └── style.css        # Estilos da aplicação
│
├── index.html           # Página principal
├── package.json         # Configurações e dependências
├── vite.config.js       # Configuração do Vite
├── node_modules/        # Dependências (gerado automaticamente)
└── README.md           # Este arquivo
```

---

## 🎓 Conteúdo Didático Intermediário

### 1. 🌐 Axios vs Fetch

#### **Por que Axios?**
```javascript
// FETCH (nativo) - mais verboso
const resposta = await fetch(url);
if (!resposta.ok) throw new Error('Erro');
const dados = await resposta.json();

// AXIOS - mais limpo e poderoso
const resposta = await axios.get(url);
const dados = resposta.data; // Já convertido!
```

#### **Vantagens do Axios:**
- ✅ **Sintaxe mais limpa** e intuitiva
- ✅ **Conversão automática** de JSON
- ✅ **Tratamento de erros** mais detalhado
- ✅ **Interceptors** para logs e transformações
- ✅ **Timeout configurável**
- ✅ **Suporte a diferentes tipos** de requisição

### 2. ⚙️ Configuração do Axios

```javascript
// Instância configurada do Axios
const pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
```

#### **Benefícios da Configuração:**
- **URL base**: Não repetir em cada requisição
- **Timeout**: Evitar travamentos
- **Headers padrão**: Configuração centralizada
- **Interceptors**: Logs automáticos

### 3. 🔍 Interceptors - Poder do Axios

```javascript
// Interceptor de requisição
pokemonAPI.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição: ${config.url}`);
    return config;
  }
);

// Interceptor de resposta
pokemonAPI.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta recebida:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error);
    return Promise.reject(error);
  }
);
```

### 4. 📦 ES6 Modules

```javascript
// Import moderno
import axios from 'axios';

// Export (quando necessário)
export function minhaFuncao() {
  // código aqui
}
```

#### **Vantagens dos ES6 Modules:**
- **Organização**: Código modular
- **Reutilização**: Importar onde precisar
- **Tree-shaking**: Otimização automática
- **Compatibilidade**: Funciona com bundlers modernos

### 5. 🎯 Tratamento de Erros Avançado

```javascript
try {
  const resposta = await pokemonAPI.get('/pokemon/inexistente');
} catch (erro) {
  if (erro.response) {
    // Erro da API (404, 500, etc.)
    const status = erro.response.status;
    const mensagem = erro.response.data?.detail;
    console.log(`Erro ${status}: ${mensagem}`);
  } else if (erro.request) {
    // Erro de rede
    console.log('Sem conexão com a internet');
  } else {
    // Outros erros
    console.log(erro.message);
  }
}
```

### 6. 🚀 Vite - Ferramenta de Desenvolvimento

#### **O que é o Vite?**
Vite é um bundler moderno que oferece:
- ⚡ **Hot Module Replacement** (HMR)
- 🔧 **Configuração zero**
- 📦 **Build otimizado**
- 🌐 **Servidor rápido**
- 📱 **Suporte a ES modules**

#### **Configuração (vite.config.js):**
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true, // Abre automaticamente
    host: true  // Acesso externo
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

---

## 🛠️ Explicação do Código

### package.json
```json
{
  "type": "module",           // Habilita ES6 modules
  "scripts": {
    "dev": "vite",            // Servidor de desenvolvimento
    "build": "vite build",    // Build de produção
    "preview": "vite preview" // Preview do build
  },
  "dependencies": {
    "axios": "^1.12.2"       // Cliente HTTP moderno
  },
  "devDependencies": {
    "vite": "^7.1.9"         // Bundler e dev server
  }
}
```

### main.js - Requisição com Axios
```javascript
import axios from 'axios';

// Configuração da instância
const pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000
});

// Função principal
async function buscarPokemon() {
  try {
    // Requisição simplificada com Axios
    const resposta = await pokemonAPI.get(`/pokemon/${nomeOuId}`);
    const dados = resposta.data; // Já convertido!
    
    mostrarPokemon(dados);
  } catch (erro) {
    // Tratamento específico de erros
    if (erro.response) {
      // Erro da API
    } else if (erro.request) {
      // Erro de rede
    }
  }
}
```

---

## 🎮 Como Usar a Aplicação

1. **Execute o projeto**: `npm run dev`
2. **Digite um nome ou número**: Pikachu, 25, charizard, etc.
3. **Clique em "Buscar Pokémon"** ou pressione Enter
4. **Veja o resultado**: Imagem, nome, tipos e informações
5. **Abra o console**: Veja os logs dos interceptors!

### 💡 Exemplos para Testar
- `pikachu` ou `25` - Pokémon elétrico famoso
- `charizard` ou `6` - Dragão de fogo
- `bulbasaur` ou `1` - Primeiro Pokémon
- `ditto` ou `132` - Pokémon que copia outros
- `mewtwo` ou `150` - Pokémon lendário

---

## 🔧 Conceitos Técnicos Avançados

### Arquitetura da Aplicação
```
Cliente (navegador)
    ↓ (Axios)
Interceptor de Request
    ↓
PokéAPI (servidor)
    ↓
Interceptor de Response
    ↓
Manipulação do DOM
```

### Fluxo de Dados
1. **Input do usuário** → Validação
2. **Axios** → Requisição HTTP
3. **Interceptor** → Log da requisição
4. **API** → Resposta JSON
5. **Interceptor** → Log da resposta
6. **JavaScript** → Processamento dos dados
7. **DOM** → Exibição na tela

### Estados da Aplicação
1. **Idle**: Aguardando input
2. **Loading**: Fazendo requisição
3. **Success**: Pokémon encontrado
4. **Error**: Erro na requisição

---

## 🚀 Desafios para Praticar

### 🥈 Nível Intermediário
1. **Cache inteligente**: Salve Pokémons pesquisados
2. **Loading skeleton**: Animações de carregamento
3. **Debounce**: Evite requisições excessivas
4. **Retry automático**: Tentar novamente em caso de erro

### 🥇 Nível Avançado
5. **Service Worker**: Funcionar offline
6. **PWA**: Transformar em app mobile
7. **TypeScript**: Adicionar tipagem
8. **Testes**: Implementar testes unitários

---

## 📚 Recursos Adicionais

### Documentação Oficial
- [Axios Docs](https://axios-http.com/docs/intro)
- [Vite Guide](https://vitejs.dev/guide/)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### APIs para Praticar
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [Dog API](https://dog.ceo/dog-api/)
- [Cat Facts API](https://catfact.ninja/)
- [Weather API](https://openweathermap.org/api)

### Ferramentas de Desenvolvimento
- [Postman](https://www.postman.com/) - Testar APIs
- [Insomnia](https://insomnia.rest/) - Cliente REST
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

---

## 🐛 Solução de Problemas

### Erro: "Cannot resolve dependency"
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Mate o processo na porta 3000
lsof -ti:3000 | xargs kill -9
# Ou use outra porta
npm run dev -- --port 3001
```

### Erro: "Module not found"
- Verifique se o Node.js é versão 22.12.0+
- Verifique se todas as dependências foram instaladas
- Verifique se o arquivo está na pasta `src/`

---

## 👥 Para Professores

### Estrutura da Aula Intermediária (120 minutos)

#### 📖 Teoria Avançada (30 min)
1. Axios vs Fetch - vantagens e desvantagens (10 min)
2. ES6 Modules e import/export (10 min)
3. Interceptors e configuração avançada (10 min)

#### 💻 Prática com Ferramentas (60 min)
1. Configuração do projeto npm (10 min)
2. Instalação e configuração do Vite (10 min)
3. Migração de fetch para Axios (20 min)
4. Implementação de interceptors (10 min)
5. Testes e debugging (10 min)

#### 🚀 Projetos Práticos (30 min)
1. Implementar cache com localStorage
2. Adicionar debounce na busca
3. Criar loading states avançados

### 🎯 Objetivos de Aprendizagem
- Dominar ferramentas modernas de desenvolvimento
- Entender conceitos de bundlers e ES6 modules
- Aplicar padrões avançados de tratamento de erros
- Preparar para frameworks modernos

---

## 📄 Licença

Este projeto é educacional e pode ser usado livremente para fins de ensino.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tem ideias para melhorar esta aula:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## 📞 Contato

Se você tem dúvidas sobre esta aula intermediária ou sugestões de melhorias, sinta-se à vontade para entrar em contato!

---

**🎉 Boa programação e que a força dos Pokémons esteja com você!**

### 🔄 Próximos Passos
Após dominar esta aula intermediária, você estará pronto para:
- **React/Vue.js** - Frameworks modernos
- **TypeScript** - JavaScript tipado
- **Testing** - Jest, Vitest
- **State Management** - Redux, Pinia
- **Backend** - Node.js, Express
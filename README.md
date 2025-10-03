# MyPills React - Aplicativo de Saúde e Vida Inteligente

## 📖 Índice
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Guia de Arquitetura](#-guia-de-arquitetura)
- [Guia de Componentes](#-guia-de-componentes)
- [Gerenciamento de Estado](#-gerenciamento-de-estado)
- [Guia para Iniciantes](#-guia-para-iniciantes)
- [Deployment](#-deployment)
- [Contribuição](#-contribuição)

## 🌟 Visão Geral

MyPills é um aplicativo completo de saúde e vida inteligente desenvolvido em React com TypeScript. O aplicativo oferece funcionalidades integradas para gerenciamento de medicamentos, lembretes, finanças pessoais, transporte público, lista de compras e um assistente virtual inteligente.

### Características Principais
- **Progressive Web App (PWA)**: Funciona offline e pode ser instalado como app nativo
- **Aplicativo Híbrido**: Compilável para Android usando Capacitor
- **Interface Moderna**: Design responsivo com animações usando Framer Motion
- **Armazenamento Local**: Sistema robusto de armazenamento offline usando IndexedDB
- **Tipagem Forte**: Desenvolvido 100% em TypeScript para maior segurança

## ✨ Funcionalidades

### 🏥 Gerenciamento de Medicamentos
- Cadastro completo de medicamentos com dosagem, quantidade e validade
- Scanner de código de barras para cadastro automatizado
- Controle de estoque com alertas de reposição
- Histórico detalhado de uso

### ⏰ Sistema de Lembretes
- Lembretes personalizáveis para medicamentos, consultas e atividades
- Sistema de recorrência (diário, semanal, mensal)
- Níveis de prioridade (baixa, média, alta, urgente)
- Notificações inteligentes

### 💰 Gestão Financeira
- Múltiplas contas (corrente, poupança, cartão de crédito, investimentos)
- Controle de transações com categorização
- Visualização de gráficos e relatórios
- Sistema de tags para organização

### 🚌 Transporte Público
- Consulta de rotas e horários de ônibus
- Localização de pontos próximos
- Rotas favoritas para acesso rápido
- Estimativas de chegada em tempo real

### 🛒 Lista de Compras
- Múltiplas listas organizadas por categoria
- Sistema de orçamento e controle de gastos
- Priorização de itens
- Histórico de compras

### 🤖 Assistente Virtual
- Chat inteligente para orientações de saúde
- Histórico de conversas
- Respostas contextuais baseadas nos dados do usuário

## 🏗 Arquitetura do Projeto

O projeto segue uma arquitetura modular baseada em features, utilizando os seguintes padrões:

### Padrão de Arquitetura
```
Clean Architecture + Feature-Based Architecture + Redux Toolkit Pattern
```

### Stack Tecnológica
- **Frontend**: React 18 + TypeScript
- **Roteamento**: React Router DOM v6
- **Estado Global**: Redux Toolkit
- **Cache/Queries**: React Query (TanStack Query)
- **Estilização**: Styled Components
- **Animações**: Framer Motion
- **Formulários**: React Hook Form
- **Build Tool**: Vite
- **Mobile**: Capacitor para Android
- **PWA**: Vite PWA Plugin + Workbox

### Fluxo de Dados
```
UI Components → React Query → Redux Store → Local Storage (IndexedDB)
```

## 🛠 Tecnologias Utilizadas

### Core Technologies
- **React**: `^18.2.0` - Biblioteca principal para UI
- **TypeScript**: `^5.2.2` - Tipagem estática
- **Vite**: `^7.1.3` - Build tool moderno e rápido

### Estado e Dados
- **@reduxjs/toolkit**: `^2.0.1` - Gerenciamento de estado
- **react-redux**: `^9.1.0` - Conectar React ao Redux
- **react-query**: `^3.39.3` - Cache e sincronização de dados
- **localforage**: `^1.10.0` - Armazenamento offline

### UI e UX
- **styled-components**: `^6.1.6` - CSS-in-JS
- **framer-motion**: `^10.16.16` - Animações
- **react-hot-toast**: `^2.4.1` - Notificações
- **react-hook-form**: `^7.48.2` - Gerenciamento de formulários

### Funcionalidades Especiais
- **react-webcam**: `^7.2.0` - Acesso à câmera
- **@tensorflow/tfjs**: `^4.15.0` - Machine Learning
- **recharts**: `^2.8.0` - Gráficos e visualizações
- **date-fns**: `^3.0.6` - Manipulação de datas

### Mobile e PWA
- **@capacitor/core**: `^7.4.3` - Framework híbrido
- **@capacitor/android**: `^7.4.3` - Build para Android
- **workbox-***: `^7.0.0` - Service Worker para PWA

### Desenvolvimento
- **eslint**: `^8.55.0` - Linting
- **jest**: `^27.5.1` - Testes
- **@testing-library/react**: `^13.4.0` - Testes de componentes
- **msw**: `^2.0.11` - Mock de APIs para testes

## 📋 Pré-requisitos

### Software Necessário
- **Node.js**: versão 18.0.0 ou superior
- **npm**: versão 8.0.0 ou superior (ou yarn/pnpm)
- **Git**: para controle de versão

### Para Desenvolvimento Android (Opcional)
- **Android Studio**: com SDK atualizado
- **JDK**: versão 11 ou superior
- **Gradle**: incluído com Android Studio

### Verificar Instalações
```bash
# Verificar versões
node --version
npm --version
git --version
```

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/MyPills-React.git
cd MyPills-React
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Aliases TypeScript
O projeto utiliza path mapping configurado em `tsconfig.json`:
```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
    "@features/*": ["src/features/*"],
    "@utils/*": ["src/utils/*"],
    "@services/*": ["src/services/*"],
    "@store/*": ["src/store/*"],
    "@types/*": ["src/types/*"]
  }
}
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:3000`

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

### Qualidade de Código
```bash
npm run lint         # Executar ESLint
npm run type-check   # Verificar tipos TypeScript
```

### Testes
```bash
npm run test         # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com cobertura
```

### Mobile (Android)
```bash
npm run build:android      # Build e abre no Android Studio
npm run build:android:apk  # Gerar APK de debug
```

## 📁 Estrutura de Pastas

```
MyPills-React/
├── android/                    # Configuração Capacitor Android
├── dist/                      # Build de produção
├── node_modules/              # Dependências
├── public/                    # Arquivos públicos estáticos
├── src/                       # Código fonte principal
│   ├── components/            # Componentes reutilizáveis
│   │   ├── AppLayout.tsx      # Layout principal da aplicação
│   │   ├── Header.tsx         # Cabeçalho global
│   │   ├── LoadingScreen.tsx  # Tela de carregamento
│   │   └── Navigation.tsx     # Menu de navegação
│   ├── features/              # Funcionalidades organizadas por domínio
│   │   ├── assistant/         # Assistente virtual
│   │   ├── auth/             # Autenticação e onboarding
│   │   ├── dashboard/        # Painel principal
│   │   ├── finances/         # Gestão financeira
│   │   ├── medications/      # Gerenciamento de medicamentos
│   │   │   ├── components/   # Componentes específicos
│   │   │   │   └── BarcodeScanner.tsx  # Scanner de código de barras
│   │   │   ├── AddMedicationScreen.tsx
│   │   │   ├── MedicationDetailScreen.tsx
│   │   │   └── MedicationsScreen.tsx
│   │   ├── reminders/        # Sistema de lembretes
│   │   ├── settings/         # Configurações
│   │   ├── shopping/         # Lista de compras
│   │   └── transport/        # Transporte público
│   ├── hooks/                # Custom hooks reutilizáveis
│   ├── store/                # Gerenciamento de estado Redux
│   │   ├── slices/           # Redux slices por feature
│   │   └── store.ts          # Configuração da store
│   ├── types/                # Definições de tipos TypeScript
│   │   └── index.ts          # Tipos centralizados
│   ├── utils/                # Utilitários e helpers
│   │   ├── dateUtils.ts      # Funções para manipulação de datas
│   │   ├── storage.ts        # Sistema de armazenamento local
│   │   └── validation.ts     # Validações de formulários
│   ├── App.tsx               # Componente raiz da aplicação
│   ├── index.css             # Estilos globais
│   └── main.tsx              # Ponto de entrada da aplicação
├── capacitor.config.ts        # Configuração do Capacitor
├── package.json              # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração do Vite
└── README.md                # Este arquivo
```

## 🏛 Guia de Arquitetura

### 1. Entrada da Aplicação (`main.tsx`)
O ponto de entrada configura todos os providers necessários:
```typescript
// Configuração de providers em cascata
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>              {/* Redux Store */}
      <QueryClientProvider client={queryClient}> {/* React Query */}
        <BrowserRouter>                   {/* React Router */}
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
```

### 2. Componente Principal (`App.tsx`)
Gerencia a autenticação e roteamento:
```typescript
function App() {
  // 1. Verifica status de autenticação
  // 2. Controla fluxo: Loading → Onboarding → Login → Dashboard
  // 3. Define rotas protegidas
  // 4. Configura notificações globais
}
```

### 3. Sistema de Rotas
```typescript
// Estrutura de rotas
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<DashboardScreen />} />
  <Route path="/medications/*" element={<MedicationsScreen />} />
  <Route path="/reminders" element={<RemindersScreen />} />
  <Route path="/finances" element={<FinancesScreen />} />
  <Route path="/transport" element={<TransportScreen />} />
  <Route path="/shopping" element={<ShoppingScreen />} />
  <Route path="/assistant" element={<AssistantScreen />} />
  <Route path="/settings" element={<SettingsScreen />} />
</Routes>
```

### 4. Layout da Aplicação
```typescript
// AppLayout.tsx - Estrutura consistente
<AppLayout>
  <Header />     {/* Cabeçalho fixo */}
  <Navigation /> {/* Menu de navegação */}
  <main>
    {children} {/* Conteúdo da tela atual */}
  </main>
</AppLayout>
```

## 🧩 Guia de Componentes

### Estrutura de Features
Cada feature segue o padrão:
```
features/[nome-da-feature]/
├── components/          # Componentes específicos
├── hooks/              # Hooks customizados (opcional)
├── types/              # Tipos específicos (opcional)
├── [Nome]Screen.tsx    # Tela principal
└── index.ts            # Barrel export (opcional)
```

### Exemplo de Componente de Feature
```typescript
// MedicationsScreen.tsx
const MedicationsScreen: React.FC = () => {
  // 1. Hooks do Redux para estado
  const dispatch = useDispatch<AppDispatch>()
  const { medications, isLoading } = useSelector((state: RootState) => state.medications)
  
  // 2. React Query para dados externos
  const { data, isLoading: isLoadingData } = useQuery(['medications'], fetchMedications)
  
  // 3. Lógica de negócio
  const handleAddMedication = () => {
    // Lógica...
  }
  
  // 4. Renderização
  return (
    <ScreenContainer>
      {/* JSX */}
    </ScreenContainer>
  )
}
```

### Componente Scanner de Código de Barras
Exemplo de componente especializado:
```typescript
// src/features/medications/components/BarcodeScanner.tsx
const BarcodeScanner: React.FC = () => {
  // 1. Configuração da câmera e scanner
  // 2. Processamento de código de barras
  // 3. Interface de usuário para escaneamento
  // 4. Fallback para entrada manual
}
```

## 🗂 Gerenciamento de Estado

### Redux Store (`src/store/store.ts`)
```typescript
export const store = configureStore({
  reducer: {
    auth: authSlice,           // Autenticação e usuário
    medications: medicationsSlice,  // Medicamentos
    reminders: remindersSlice,      // Lembretes
    finances: financesSlice,        // Finanças
    transport: transportSlice,      // Transporte
    shopping: shoppingSlice,        // Compras
    assistant: assistantSlice,      // Assistente
  },
})
```

### Slices Redux
Cada slice gerencia seu próprio domínio:
```typescript
// Exemplo: medicationsSlice
const medicationsSlice = createSlice({
  name: 'medications',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    scannerOpen: false,
  },
  reducers: {
    addMedication: (state, action) => {
      state.items.push(action.payload)
    },
    toggleScanner: (state) => {
      state.scannerOpen = !state.scannerOpen
    },
    // ... outros reducers
  },
})
```

### Sistema de Armazenamento (`src/utils/storage.ts`)
```typescript
export class Storage {
  // Métodos genéricos
  static async set<T>(key: string, value: T): Promise<void>
  static async get<T>(key: string): Promise<T | null>
  static async remove(key: string): Promise<void>
  static async clear(): Promise<void>
  
  // Chaves predefinidas
  static readonly KEYS = {
    USER: 'mypills_user',
    MEDICATIONS: 'mypills_medications',
    // ... outras chaves
  }
}
```

## 🔧 Sistema de Tipos (`src/types/index.ts`)

### Tipos Principais
```typescript
// Usuário
interface User {
  id: string;
  name: string;
  email?: string;
  preferences: UserPreferences;
}

// Medicamento
interface Medication {
  id: string;
  name: string;
  dosage: string;
  currentQuantity: number;
  totalQuantity: number;
  expirationDate?: Date;
  status: MedicationStatus;
}

// Lembrete
interface Reminder {
  id: string;
  title: string;
  dueDate: Date;
  type: ReminderType;
  priority: ReminderPriority;
}

// ... outros tipos
```

## 👶 Guia para Iniciantes

### 1. Entendendo a Estrutura
Se você está começando na programação:

1. **main.tsx**: É onde tudo começa - como a porta de entrada da casa
2. **App.tsx**: É o controle principal - decide o que mostrar
3. **components/**: Peças reutilizáveis - como blocos de LEGO
4. **features/**: Cada "área" do app - como quartos de uma casa
5. **store/**: Onde guardamos informações - como um armário organizado

### 2. Como Adicionar uma Nova Funcionalidade
```bash
# 1. Criar pasta da feature
mkdir src/features/nova-feature

# 2. Criar tela principal
touch src/features/nova-feature/NovaFeatureScreen.tsx

# 3. Criar pasta de componentes (se necessário)
mkdir src/features/nova-feature/components

# 4. Adicionar rota no App.tsx
# 5. Criar slice no Redux (se necessário)
# 6. Definir tipos (se necessário)
```

### 3. Fluxo de Desenvolvimento
```
1. Identificar requisito → 
2. Criar tipos TypeScript → 
3. Criar slice Redux → 
4. Criar componentes → 
5. Implementar lógica → 
6. Testar funcionalidade → 
7. Otimizar performance
```

### 4. Conceitos Importantes

**React**: Biblioteca para criar interfaces
- **Componentes**: Peças reutilizáveis de interface
- **Props**: Informações passadas entre componentes
- **State**: Informações que mudam ao longo do tempo
- **Hooks**: Funções especiais para funcionalidades do React

**TypeScript**: JavaScript com tipos
- **Interfaces**: Contratos que definem formato de dados
- **Types**: Definições personalizadas de tipos
- **Generics**: Tipos flexíveis reutilizáveis

**Redux**: Gerenciamento de estado global
- **Store**: Local central para dados
- **Slices**: Pedaços organizados da store
- **Actions**: Eventos que modificam dados
- **Reducers**: Funções que aplicam mudanças

### 5. Comandos Essenciais para Iniciantes
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Verificar erros de código
npm run lint

# Verificar tipos TypeScript
npm run type-check

# Executar testes
npm run test

# Criar build de produção
npm run build
```

### 6. Dicas de Debugging
```typescript
// 1. Use console.log para ver valores
console.log('Valor da variável:', minhaVariavel)

// 2. Use React Developer Tools (extensão do browser)
// 3. Use Redux DevTools (extensão do browser)

// 4. Verifique erros no terminal e no browser
// 5. Leia mensagens de erro com atenção
```

### 7. Padrões de Código no Projeto
```typescript
// ✅ Bom: Componente funcional com tipos
const MeuComponente: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>
}

// ✅ Bom: Hook com tipos
const useMeuHook = (): ReturnType => {
  const [estado, setEstado] = useState<TipoEstado>(valorInicial)
  return { estado, setEstado }
}

// ✅ Bom: Função utilitária com tipos
export const minhaUtilidade = (param: TipoParam): TipoRetorno => {
  // lógica
  return resultado
}
```

## 🚀 Deployment

### Build Local
```bash
# Gerar build de produção
npm run build

# Testar build localmente
npm run preview
```

### PWA (Progressive Web App)
O projeto está configurado como PWA:
- Cache automático de recursos
- Funcionalidade offline
- Instalável como app nativo
- Service Worker para atualizações

### Android (Capacitor)
```bash
# Build e sincronização
npm run build:android

# Gerar APK
npm run build:android:apk
```

### Deploy Web
O projeto pode ser deployado em:
- **Vercel**: `npm run build` + upload da pasta `dist/`
- **Netlify**: Conectar repositório GitHub
- **GitHub Pages**: Usar GitHub Actions
- **Firebase Hosting**: `firebase deploy`

### Variáveis de Ambiente
Crie arquivo `.env` na raiz:
```
VITE_API_BASE_URL=https://sua-api.com
VITE_ANALYTICS_ID=seu-id-analytics
```

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie branch para feature: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Add nova funcionalidade'`
4. Push para branch: `git push origin feature/nova-funcionalidade`
5. Abra Pull Request

### Padrões de Código
- Use TypeScript para tudo
- Siga convenções de nomenclatura camelCase
- Documente funções complexas
- Escreva testes para novas funcionalidades
- Execute lint antes de commit

### Estrutura de Commit
```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: ajustes de formatação
refactor: refatoração sem mudança de funcionalidade
test: adiciona ou corrige testes
chore: mudanças de build/dependências
```

---

## 📱 Funcionalidades Detalhadas por Feature

### 🏥 Medications (Medicamentos)
**Localização**: `src/features/medications/`

**Arquivos principais**:
- `MedicationsScreen.tsx` - Tela principal com lista de medicamentos
- `AddMedicationScreen.tsx` - Formulário para adicionar medicamentos
- `MedicationDetailScreen.tsx` - Detalhes e edição de medicamento
- `components/BarcodeScanner.tsx` - Scanner de código de barras

**Funcionalidades**:
- ✅ Lista de medicamentos com status visual
- ✅ Cadastro manual com formulário validado
- ✅ Scanner de código de barras para cadastro automatizado
- ✅ Controle de estoque (quantidade atual vs total)
- ✅ Alertas de validade e reposição
- ✅ Histórico de uso e administração

### ⏰ Reminders (Lembretes)
**Localização**: `src/features/reminders/`

**Funcionalidades**:
- ✅ Criação de lembretes com data/hora
- ✅ Recorrência (diário, semanal, mensal)
- ✅ Categorização por tipo (medicamento, consulta, exercício)
- ✅ Níveis de prioridade com cores
- ✅ Notificações push (PWA)

### 💰 Finances (Finanças)
**Localização**: `src/features/finances/`

**Funcionalidades**:
- ✅ Múltiplas contas financeiras
- ✅ Transações categorizadas
- ✅ Gráficos de gastos (Recharts)
- ✅ Sistema de tags para organização
- ✅ Relatórios mensais/anuais

### 🚌 Transport (Transporte)
**Localização**: `src/features/transport/`

**Funcionalidades**:
- ✅ Consulta de rotas de ônibus
- ✅ Localização de pontos próximos
- ✅ Horários em tempo real
- ✅ Rotas favoritas
- ✅ Integração com GPS

### 🛒 Shopping (Compras)
**Localização**: `src/features/shopping/`

**Funcionalidades**:
- ✅ Múltiplas listas de compras
- ✅ Categorização de produtos
- ✅ Controle de orçamento
- ✅ Marcação de itens comprados
- ✅ Histórico de preços

### 🤖 Assistant (Assistente)
**Localização**: `src/features/assistant/`

**Funcionalidades**:
- ✅ Chat inteligente
- ✅ Consultas sobre medicamentos
- ✅ Lembretes automáticos
- ✅ Integração com TensorFlow.js
- ✅ Histórico de conversas

### ⚙️ Settings (Configurações)
**Localização**: `src/features/settings/`

**Funcionalidades**:
- ✅ Tema claro/escuro
- ✅ Configurações de notificação
- ✅ Backup de dados
- ✅ Autenticação biométrica
- ✅ Idioma (PT-BR/EN-US)

### 🔐 Auth (Autenticação)
**Localização**: `src/features/auth/`

**Funcionalidades**:
- ✅ Tela de onboarding
- ✅ Login/cadastro
- ✅ Recuperação de senha
- ✅ Autenticação biométrica
- ✅ Persistência de sessão

---

## 🎯 Roadmap e Próximas Funcionalidades

### Em Desenvolvimento
- [ ] Sincronização na nuvem
- [ ] Compartilhamento de listas de compras
- [ ] Integração com wearables
- [ ] Análise de padrões de saúde com IA

### Futuro
- [ ] Versão iOS
- [ ] Widget para tela inicial
- [ ] Integração com farmácias
- [ ] Telemedicina integrada

---

**Desenvolvido com ❤️ usando React + TypeScript**

*Este README foi criado para ser um guia completo tanto para desenvolvedores experientes quanto para iniciantes. Se você tem dúvidas ou sugestões, sinta-se à vontade para contribuir!*
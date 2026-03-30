# GitHub App SSR

Aplicação de portfólio GitHub construída com **Next.js 16 (App Router)**, 100% Server-Side Rendering, usando **Parallel Routes** para exibição de detalhes em Drawer.

## 🚀 Tech Stack

- **Next.js 16** — App Router com Server Components e Server Actions
- **React 19** — useActionState, startTransition
- **TypeScript** — Tipagem completa
- **Tailwind CSS v4** — Estilização utilitária
- **shadcn/ui** — Componentes base (Card, Alert, Input)
- **Vaul** — Drawer com animações suaves
- **Jest + React Testing Library** — Testes unitários e de integração

## 📁 Estrutura do Projeto

```
app/
├── page.tsx                          # Home (SSR + Cookies)
├── layout.tsx                        # Layout com slot @modal
├── @modal/
│   ├── default.tsx                   # Slot vazio (sem modal)
│   └── (.)user/[username]/page.tsx   # Intercepting Route (Drawer)
└── user/[username]/page.tsx          # Fallback (acesso direto)

components/custom/
├── card-user/                        # Card de usuário
├── searched-input/                   # Input de busca com Server Action
├── user-detail-drawer/               # Drawer de detalhes (vaul)
└── empty-state/                      # Estado vazio

services/
└── github-service.ts                 # Camada de fetch da API do GitHub

actions/
└── github-actions.ts                 # Server Action (persistência via Cookies)

utils/
└── join-date/                        # Utilitário de formatação de data
```

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` e adicione seu token:

| Variável | Descrição | Obrigatório |
|---|---|---|
| `GITHUB_API_URL` | Base URL da API do GitHub | Sim |
| `GITHUB_TOKEN` | Personal Access Token do GitHub | Recomendado |

### 2.1 Como gerar o GITHUB_TOKEN

1. Acesse seu [GitHub](https://github.com/) e faça login.
2. No canto superior direito, clique na sua foto de perfil e vá em **Settings**.
3. Na barra lateral esquerda, role até o fim e clique em **Developer settings**.
4. Clique em **Personal access tokens** e escolha **Tokens (classic)**.
5. Clique em **Generate new token** -> **Generate new token (classic)**.
6. Dê um nome ao token (ex: "My GitHub App").
7. Selecione a expiração (EX: 30 dias).
8. Em **Select scopes**, você não precisa selecionar nada para ler dados públicos, mas pode marcar `repo` se quiser que ele tenha mais acesso.
9. Clique em **Generate token** no final da página.
10. **IMPORTANTE:** Copie o token agora! Você não poderá vê-lo novamente.
11. Cole o token no seu arquivo `.env` na variável `GITHUB_TOKEN`.


### 3. Rodar em desenvolvimento

```bash
npm run dev
```

### 4. Rodar testes

```bash
npm test              # Executa todos os testes
npm run test:watch    # Modo watch
```

## 🧪 Cobertura de Testes

| Suíte | Tipo | O que testa |
|---|---|---|
| `page.test.tsx` | Integração | SSR + Cookies + fetch + EmptyState |
| `github-actions.test.ts` | Integração | Server Action + Cookies + validação |
| `card-user.test.tsx` | Unitário | Renderização do card + link de detalhes |
| `searched-input.test.tsx` | Unitário | Input de busca + useActionState |
| `user-detail-drawer.test.tsx` | Unitário | Drawer com dados do usuário |
| `empty-state.test.tsx` | Unitário | Componente de estado vazio |
| `join-date.test.ts` | Unitário | Formatação de data (12 meses) |

```
Test Suites: 7 passed, 7 total
Tests:       25 passed, 25 total
```

## 🏗️ Arquitetura

```
Cookie (persistência) → Server Component (SSR) → GitHub API (fetch)
                                                      ↓
                        Parallel Route (@modal) → Drawer (detalhes)
```

- **Persistência**: Usernames salvos em Cookies (acessíveis no servidor)
- **Busca**: Server Action valida o usuário na API antes de salvar
- **Detalhes**: Intercepting Route renderiza o Drawer sem perder o contexto da lista
- **Service Layer**: `github-service.ts` centraliza toda comunicação com a API

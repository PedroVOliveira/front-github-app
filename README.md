# GitHub App SSR

Aplicação de portfólio GitHub construída com **Next.js 16 (App Router)**, 100% Server-Side Rendering, usando **Parallel Routes** para exibição de detalhes em Drawer e operações em massa totalmente stateless.

## 🚀 Novas Funcionalidades (v0.2.0)

- **Seleção em Massa (Stateless)**: Interface de seleção múltipla gerenciada por hook customizado, sem dependência de URL Search Params.
- **Floating Action Bar**: Barra de ações flutuante com design premium (Glassmorphism + Blur) para operações de exclusão em massa.
- **Confirmação Visual**: Substituição de alertas nativos por **AlertDialog (Shadcn UI)** com tema Light para maior destaque.
- **Acessibilidade Aprimorada**: Cards interativos com suporte a clique em toda a área e controle fino de propagação de eventos.

## 🛠️ Tech Stack

- **Next.js 16** — App Router com Server Components e Server Actions
- **React 19** — useActionState, startTransition, hooks customizados
- **TypeScript** — Tipagem completa e interfaces rigorosas
- **Tailwind CSS v4** — Estilização utilitária moderna
- **shadcn/ui** — Componentes base (Card, Alert, Dialog, Checkbox, Collapsible)
- **Vaul** — Drawer com animações suaves
- **Jest + React Testing Library** — 100% de cobertura na lógica crítica

## 📁 Estrutura do Projeto (Atualizada)

```
app/
├── page.tsx                          # Home (SSR + Cookies)
├── layout.tsx                        # Layout com slot @modal
└── @modal/                           # Intercepting Route (Drawer)

components/custom/
├── card-user/                        # Card de usuário + Hook useCardUser
├── user-selection-bar/               # Barra de ações flutuante (Stateless)
├── confirm-dialog/                   # Wrapper de confirmação (Shadcn UI)
├── searched-input/                   # Input de busca com Server Action
└── user-detail-drawer/               # Drawer de detalhes

test/
├── factories/                        # Fábricas de dados para testes unitários
└── msw/                              # Mock Service Worker para API

actions/
└── github-actions.ts                 # Server Actions (Individual e Bulk Delete)
```

## 🧪 Cobertura de Testes (11 Suítes)

| Suíte | Tipo | O que testa |
|---|---|---|
| `use-card-user.test.tsx` | Unitário | Lógica de seleção, toggle all e integração com actions |
| `user-selection-bar.test.tsx` | Unitário | Renderização da barra flutuante e triggers de ações |
| `card-user.accessibility.test.tsx`| Acessibilidade | ARIA Roles, navegação por teclado e semântica |
| `page.test.tsx` | Integração | SSR + Cookies + fetch + EmptyState |
| `github-actions.test.ts` | Integração | Server Action + Cookies + validação |
| `github-service.test.ts` | Integração | Comunicação com a API do GitHub e tratamento de dados |
| `card-user.test.tsx` | Unitário | Renderização do card + link de detalhes |
| `searched-input.test.tsx` | Unitário | Input de busca + useActionState |
| `user-detail-drawer.test.tsx` | Unitário | Drawer com dados do usuário |
| `empty-state.test.tsx` | Unitário | Componente de estado vazio |
| `join-date.test.ts` | Unitário | Formatação de data (12 meses) |

```
Test Suites: 11 passed, 11 total
Tests:       47 passed, 47 total
```

```bash
# Executar todos os testes
pnpm run test
```

## 🏗️ Arquitetura

```
Cookie (persistência) → Server Component (SSR) → GitHub API (fetch)
                                                      ↓
Floating Action Bar ← useCardUser (Hook) ← CardUserList (Orquestrador)
                                                      ↓
                        Parallel Route (@modal) → Drawer (detalhes)
```

- **Stateless Hook Pattern**: Toda a lógica de seleção foi encapsulada no `useCardUser`, mantendo os componentes visuais puros e fáceis de testar.
- **Factory Pattern**: Implementamos fábricas de dados (`user-factory`, `selection-bar-factory`) para garantir testes robustos e fáceis de manter.
- **Local Context**: A persistência continua sendo via Cookies, garantindo que o SSR reflita as deleções (individuais ou em massa) instantaneamente.

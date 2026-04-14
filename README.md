# claude-code-connect
Engenharia de software na era da IA: como usar IA no fluxo real de desenvolvimento

## Estrutura do projeto

```
claude-connect/
├── api/    ← NestJS + TypeScript
├── web/    ← Vite + TypeScript (vanilla DOM)
└── ...
```

## Requisitos

- Node 18+
- pnpm 9+

## Instalação

```bash
pnpm install
```

## Comandos

### Web (Vite + TypeScript)

| Comando | Descrição |
|---|---|
| `pnpm web:dev` | Inicia o servidor de desenvolvimento |
| `pnpm web:build` | Gera o build de produção |
| `pnpm web:preview` | Visualiza o build de produção |

### API (NestJS)

| Comando | Descrição |
|---|---|
| `pnpm api:dev` | Inicia em modo watch (desenvolvimento) |
| `pnpm api:start` | Inicia em modo produção |
| `pnpm api:debug` | Inicia com debugger em modo watch |
| `pnpm api:build` | Gera o build de produção |
| `pnpm api:test` | Executa os testes unitários |
| `pnpm api:test:watch` | Executa os testes em modo watch |
| `pnpm api:test:cov` | Executa os testes com cobertura |
| `pnpm api:test:e2e` | Executa os testes end-to-end |
| `pnpm api:lint` | Analisa o código com ESLint |
| `pnpm api:format` | Formata o código com Prettier |

### Todos os apps

| Comando | Descrição |
|---|---|
| `pnpm build` | Build de todos os apps |
| `pnpm test` | Testa todos os apps |
| `pnpm lint` | Lint de todos os apps |

---

## Diretrizes do Frontend

### Atomic Design

Os componentes são organizados seguindo o Atomic Design:

| Camada | Descrição | Exemplos |
|---|---|---|
| `atoms/` | Elementos indivisíveis de UI | Button, Input, Label, Icon |
| `molecules/` | Combinações de atoms | FormField, SearchBar, Card |
| `organisms/` | Seções compostas de molecules/atoms | Header, Form, DataTable |
| `templates/` | Layouts de página sem dados reais | — |
| `pages/` | Templates preenchidos com dados reais, vinculados a rotas | — |

### Tailwind CSS

- Use classes utilitárias do Tailwind exclusivamente; evite CSS customizado salvo quando estritamente necessário
- Evite valores arbitrários (`w-[123px]`) — prefira os design tokens do Tailwind config
- Extraia combinações repetidas de classes em componentes, não em arquivos CSS

#### Paleta de cores

Todas as cores são definidas como tokens `@theme` em `web/src/style.css`. Nunca use valores hex diretamente — sempre use o nome do token:

| Token | Classe Tailwind | Uso |
|---|---|---|
| `--color-verde-destaque` | `verde-destaque` | Destaque primário / highlights |
| `--color-verde-pastel` | `verde-pastel` | Destaque suave / hover states |
| `--color-verde-petroleo` | `verde-petroleo` | Fundos verde escuro |
| `--color-grafite` | `grafite` | Fundo da página (mais escuro) |
| `--color-cinza-escuro` | `cinza-escuro` | Fundo de cards / surfaces |
| `--color-cinza` | `cinza` | Bordas e divisores |
| `--color-cinza-medio` | `cinza-medio` | Placeholder / texto secundário |
| `--color-cinza-claro` | `cinza-claro` | Texto muted |
| `--color-offwhite` | `offwhite` | Elementos claros sutis |
| `--color-branco` | `branco` | Texto primário / branco |

Use os tokens como prefixo de utilitário: `bg-grafite`, `text-branco`, `border-cinza`, etc.
Em CSS puro (fora das utilities do Tailwind), referencie a variável: `var(--color-grafite)`.

#### Tipografia

- Família de fonte: use `font-prompt` (mapeia para `"Prompt", sans-serif` via `--font-prompt`)
- Tamanhos: use a escala padrão do Tailwind (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-4xl`, …) — evite tamanhos arbitrários como `text-[14px]`

### Testes de componentes

Todo componente deve ter um arquivo de teste (`*.spec.ts` ou `*.test.ts`) cobrindo seu **comportamento essencial**:

- Renderiza sem erros
- Reflete as principais variações de prop/estado
- Dispara os eventos esperados na interação do usuário

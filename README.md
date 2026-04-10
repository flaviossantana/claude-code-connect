# claude-code-connect
Engenharia de software na era da IA: como usar IA no fluxo real de desenvolvimento

## Estrutura do projeto

```
claude-connect/
├── api/    ← NestJS + TypeScript
├── web/    ← React + Vite + TypeScript
└── ...
```

## Instalação

```bash
pnpm install
```

## Comandos

### Web (React + Vite)

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

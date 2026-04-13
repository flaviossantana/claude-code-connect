# Plano: Implementacao da Tela de Cadastro

## Context

A tela de login ja esta implementada seguindo Atomic Design. O `AuthForm` ja possui uma config `register` com heading, subtitle, campos (Nome, Email, Senha) e links. A tela de cadastro e essencialmente uma **composicao dos mesmos componentes** com `variant: 'register'`. O principal trabalho novo e criar um router SPA para navegar entre login e cadastro, criar a page de registro, e tornar o `BannerColumn` configuravel.

**Analise do Figma** confirmou que o layout do cadastro segue a mesma estrutura do login: banner a esquerda no desktop, oculto no mobile. Os campos sao Nome, Email e Senha, com checkbox "Lembrar-me" (sem link "Esqueci senha"), botao "Cadastrar", login social (GitHub/Gmail), e link "Ja tem conta? Faca seu login!".

---

## 1. Estrategia de Reutilizacao

| Componente existente | Reutilizado como esta? | Ajuste necessario |
|---------------------|----------------------|-------------------|
| `atoms/*` (Button, Input, Label, Checkbox, Link, Divider, SocialButton) | Sim | Nenhum |
| `molecules/*` (FormField, RememberForgotRow, SocialLoginGroup) | Sim | Nenhum |
| `organisms/auth-form.ts` | Sim | Alterar hrefs para hash routing (`#/login`, `#/register`) |
| `organisms/banner-column.ts` | Sim | ✅ Prop `imageSrc` ja adicionada |
| `templates/auth-template.ts` | Sim | Nenhum |
| `pages/login-page.ts` | Sim | Nenhum (usa fallback `banner-login.png`) |
| `pages/register-page.ts` | Novo | Passar `imageSrc: '/banner-cadastro.png'` ao BannerColumn |

**Nenhum atomo, molecula ou organismo novo sera criado.**

---

## 2. Diferencas Login vs Cadastro

| Aspecto | Login | Cadastro |
|---------|-------|----------|
| Banner | `banner-login.png` | `banner-cadastro.png` |
| Heading | "Login" | "Cadastro" |
| Subtitle | "Boas-vindas! Faca seu login." | "Ola! Preencha seus dados." |
| Campos | Email/usuario, Senha | Nome, Email, Senha |
| Link "Esqueci senha" | Sim | Nao |
| Texto do botao | "Login ->" | "Cadastrar ->" |
| Link inferior | "Crie seu cadastro!" -> /register | "Faca seu login!" -> /login |

Todas essas diferencas **ja estao configuradas** no objeto `configs` dentro de `auth-form.ts`.

---

## 3. Novos Componentes / Arquivos

| Arquivo | Tipo | Descricao |
|---------|------|-----------|
| `web/src/router.ts` | Utilitario | Router SPA baseado em hash (~35 linhas) |
| `web/src/components/pages/register-page.ts` | Page | Composicao do AuthTemplate + AuthForm(register) (~10 linhas) |

---

## 4. Ajustes nos Componentes Existentes

### 4.1 `organisms/banner-column.ts` ✅ (ja implementado)
- Tipo `BannerColumnProps` com `imageSrc?: string` ja existe
- Assinatura `BannerColumn(props?: BannerColumnProps)` ja existe
- Fallback `props?.imageSrc ?? '/banner-login.png'` ja funciona
- Mudanca retrocompativel — chamadas sem argumento continuam funcionando

### 4.2 `organisms/auth-form.ts`
- Login config: `bottomLinkHref: '/register'` -> `'#/register'`
- Register config: `bottomLinkHref: '/login'` -> `'#/login'`

### 4.3 `main.ts`
- Substituir mount direto do LoginPage pelo router
- Importar router, LoginPage e RegisterPage
- Configurar rotas: `#/login` e `#/register`, default para `/login`

---

## 5. Estrategia de Responsividade

O layout responsivo ja esta implementado no `AuthTemplate` e sera reutilizado integralmente:

| Breakpoint | Comportamento |
|------------|---------------|
| **Mobile** (< 1024px) | Banner oculto (`hidden`), formulario ocupa 100% da largura com padding `p-8` |
| **Desktop** (>= 1024px / `lg`) | Layout 2 colunas: banner `lg:w-1/2` a esquerda, formulario `lg:w-1/2` a direita |

O Figma mostra variantes mobile (360px), tablet (648px) e desktop (996px). No mobile/tablet a ilustracao aparece empilhada dentro do card — porem o projeto ja adotou o padrao de ocultar o banner no mobile. Manter esse padrao por consistencia com o login. Se necessario, a adaptacao pode ser feita como melhoria futura no `AuthTemplate`.

---

## 6. Estrutura de Arquivos

```
web/src/
  router.ts                          # NOVO — hash router SPA
  main.ts                            # MODIFICAR — usar router
  components/
    atoms/                           # SEM ALTERACOES
    molecules/                       # SEM ALTERACOES
    organisms/
      auth-form.ts                   # MODIFICAR — hrefs para hash
      banner-column.ts               # MODIFICAR — prop imageSrc
    templates/
      auth-template.ts               # SEM ALTERACOES
    pages/
      login-page.ts                  # SEM ALTERACOES
      register-page.ts               # NOVO — page de cadastro
```

---

## 7. Fases de Implementacao

### Fase 1: Router SPA
1. Criar `web/src/router.ts` com `createRouter(config)`
2. Funcionalidades: escutar `hashchange`, limpar container, montar page factory, redirect para rota default

### Fase 2: Register Page
1. Criar `web/src/components/pages/register-page.ts`
2. Composicao: `AuthTemplate({ bannerSlot: BannerColumn({ imageSrc: '/banner-cadastro.png' }), formSlot: AuthForm({ variant: 'register' }) })`
3. Cada tela usa sua propria imagem de banner: login usa `banner-login.png`, cadastro usa `banner-cadastro.png`

### Fase 3: Ajustar BannerColumn ✅ (ja implementado)
1. `BannerColumnProps` com `imageSrc?: string` ja existe
2. Fallback para `/banner-login.png` ja funciona

### Fase 4: Atualizar Links do AuthForm
1. Alterar `bottomLinkHref` de ambas configs para usar prefixo `#`

### Fase 5: Integrar Router no main.ts
1. Substituir mount direto por `createRouter()` com rotas login e register
2. Default path: `/login`

### Fase 6: Testes
1. Testar `register-page.ts` — renderiza sem erros, contem heading "Cadastro", contem 3 campos
2. Testar `router.ts` — rota inicial correta, navegacao por hashchange, redirect para default em rota desconhecida
3. Testar manualmente: `pnpm web:dev`, navegar entre login e cadastro via links

---

## Verificacao

1. `pnpm web:dev` — servidor inicia sem erros
2. Acessar `http://localhost:5173/#/login` — exibe tela de login com `banner-login.png`
3. Clicar "Crie seu cadastro!" — navega para `#/register`, exibe tela de cadastro com 3 campos e `banner-cadastro.png`
4. Verificar que as imagens de banner sao distintas entre login e cadastro
5. Clicar "Faca seu login!" — volta para `#/login`
5. Botao voltar/avancar do navegador funciona corretamente
6. Responsividade: em telas < lg, banner oculto e form ocupa 100%
7. `pnpm web:build` — build de producao sem erros

---

## Arquivos Criticos

- `web/src/router.ts` (novo)
- `web/src/components/pages/register-page.ts` (novo)
- `web/src/main.ts` (modificar)
- `web/src/components/organisms/auth-form.ts` (modificar)
- `web/src/components/organisms/banner-column.ts` (modificar)

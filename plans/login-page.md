# Plano: Implementacao da Tela de Login

## Context

O projeto Code Connect possui um frontend vanilla TypeScript + Vite com o template starter padrao. Precisamos implementar a tela de login seguindo o mockup fornecido, o guia de estilos (fonte Prompt, paleta de cores escura) e Atomic Design para garantir reuso com a futura tela de cadastro.

**Estado atual**: Vite starter template, sem Tailwind, sem componentes, sem roteamento.

---

## Fase 1: Setup Tailwind CSS v4

1. Instalar dependencias:
   ```bash
   pnpm --filter web add -D tailwindcss @tailwindcss/vite
   ```

2. Criar `web/vite.config.ts` com plugin `@tailwindcss/vite`

3. Substituir `web/src/style.css` com entry point Tailwind + design tokens via `@theme`:
   - Cores: verde-destaque (#81FE88), verde-pastel (#BFFFC3), verde-petroleo (#132E35), grafite (#01080E), cinza-escuro (#171D1F), cinza (#3E3E3F), cinza-medio (#888888), cinza-claro (#BCBCBC), offwhite (#E1E1E1), branco (#FFFFFF)
   - Font: `--font-prompt: "Prompt", sans-serif`

4. Atualizar `web/index.html`:
   - Adicionar Google Fonts `<link>` para fonte Prompt (weights 400, 500, 700)
   - `lang="pt-BR"`, `<title>Code Connect</title>`

---

## Fase 2: Estrutura de Componentes (Atomic Design)

```
web/src/
  components/
    atoms/
      button.ts          # Botao primario (verde)
      input.ts           # Input texto/password
      label.ts           # Label de campo
      checkbox.ts        # Checkbox com label
      link.ts            # Anchor estilizado (underline/green)
      divider.ts         # Separador "ou entre com outras contas"
      social-button.ts   # Botao de login social (icone + texto)
    molecules/
      form-field.ts      # Label + Input
      remember-forgot-row.ts  # Checkbox + link "esqueci a senha"
      social-login-group.ts   # Divider + botoes sociais
    organisms/
      auth-form.ts       # Formulario completo (login/registro via variant)
      banner-column.ts   # Coluna da imagem banner
    templates/
      auth-template.ts   # Layout 2 colunas (banner | form)
    pages/
      login-page.ts      # Compoe template + organisms
  main.ts
  style.css
```

**Padrao de componente**: funcao pura que recebe props e retorna `HTMLElement`.

---

## Fase 3: Implementacao dos Atomos

| Atomo | Responsabilidade | Classes Tailwind principais |
|-------|-----------------|---------------------------|
| `Button` | Botao submit verde | `w-full bg-verde-destaque text-grafite font-prompt font-medium text-lg py-3 rounded-lg` |
| `Input` | Campo texto/password | `w-full bg-cinza text-offwhite font-prompt py-3 px-4 rounded-lg` |
| `Label` | Rotulo de campo | `block text-offwhite font-prompt text-sm mb-1` |
| `Checkbox` | Input checkbox + label | `accent-verde-destaque text-cinza-medio text-sm` |
| `Link` | Ancora (variantes underline/green) | underline: `text-cinza-claro underline`, green: `text-verde-destaque font-medium` |
| `Divider` | HR + texto + HR | `flex items-center gap-4`, lines `border-cinza` |
| `SocialButton` | Icone + texto social | `flex-1 bg-cinza-escuro text-offwhite border border-cinza rounded-lg` |

---

## Fase 4: Moleculas

- **FormField**: Compoe `Label` + `Input` em `<div class="mb-4">`
- **RememberForgotRow**: `Checkbox` + opcionalmente `Link("Esqueci a senha")` — prop `showForgotLink` (true no login, false no cadastro)
- **SocialLoginGroup**: `Divider("ou entre com outras contas")` + row de 2x `SocialButton` (GitHub, Google)

---

## Fase 5: Organismos

- **AuthForm** (`variant: 'login' | 'register'`):
  - Login: heading "Login", subtitle "Boas-vindas! Faca seu login.", campos email+senha, RememberForgotRow com forgot link, botao "Login ->", SocialLoginGroup, link "Crie seu cadastro!"
  - Register (futuro): heading "Cadastro", campos nome+email+senha, etc.
- **BannerColumn**: Imagem `/banner-login.png` com `object-cover` + overlay do logo Code Connect

---

## Fase 6: Template + Page

- **AuthTemplate**: `<main class="flex min-h-screen bg-grafite font-prompt">` com 2 colunas (banner `hidden lg:block lg:w-1/2` | form `w-full lg:w-1/2 flex items-center justify-center p-8`)
- **LoginPage**: `AuthTemplate({ banner: BannerColumn(), form: AuthForm({ variant: 'login' }) })`

---

## Fase 7: Atualizacao de Arquivos Existentes

- **`web/src/main.ts`**: Substituir template Vite por import do LoginPage e mount no `#app`
- **Remover arquivos obsoletos**: `counter.ts`, `assets/typescript.svg`, `assets/vite.svg`, `assets/hero.png`

---

## Arquivos Criticos

- `web/src/style.css` — substituir completamente
- `web/src/main.ts` — substituir completamente
- `web/index.html` — atualizar head
- `web/vite.config.ts` — criar novo
- `web/package.json` — atualizado via pnpm install
- 15 novos arquivos de componentes em `web/src/components/`

---

## Verificacao

1. `pnpm web:dev` — servidor dev inicia sem erros
2. Visual: comparar com mockup (layout 2 colunas, cores, tipografia, inputs, botao verde)
3. Responsividade: em telas < lg, banner some e form ocupa 100%
4. `pnpm web:build` — build de producao sem erros

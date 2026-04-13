import { Button } from '../atoms/button.ts'
import { Link } from '../atoms/link.ts'
import { FormField } from '../molecules/form-field.ts'
import { RememberForgotRow } from '../molecules/remember-forgot-row.ts'
import { SocialLoginGroup } from '../molecules/social-login-group.ts'

export type AuthFormVariant = 'login' | 'register'

export type AuthFormProps = {
  variant: AuthFormVariant
}

type AuthFormConfig = {
  heading: string
  subtitle: string
  fields: Array<{
    label: string
    inputType: 'text' | 'password' | 'email'
    placeholder: string
    name: string
    id: string
  }>
  showForgotLink: boolean
  submitText: string
  bottomText: string
  bottomLinkText: string
  bottomLinkHref: string
}

const configs: Record<AuthFormVariant, AuthFormConfig> = {
  login: {
    heading: 'Login',
    subtitle: 'Boas-vindas! Faça seu login.',
    fields: [
      {
        label: 'Email ou usuário',
        inputType: 'text',
        placeholder: 'usuario123',
        name: 'identifier',
        id: 'identifier',
      },
      {
        label: 'Senha',
        inputType: 'password',
        placeholder: '******',
        name: 'password',
        id: 'password',
      },
    ],
    showForgotLink: true,
    submitText: 'Login →',
    bottomText: 'Ainda não tem conta?',
    bottomLinkText: 'Crie seu cadastro! 📋',
    bottomLinkHref: '#/register',
  },
  register: {
    heading: 'Cadastro',
    subtitle: 'Olá! Preencha seus dados.',
    fields: [
      {
        label: 'Nome',
        inputType: 'text',
        placeholder: 'Nome completo',
        name: 'name',
        id: 'name',
      },
      {
        label: 'Email',
        inputType: 'email',
        placeholder: 'Digite seu email',
        name: 'email',
        id: 'email',
      },
      {
        label: 'Senha',
        inputType: 'password',
        placeholder: '******',
        name: 'password',
        id: 'password',
      },
    ],
    showForgotLink: false,
    submitText: 'Cadastrar →',
    bottomText: 'Já tem conta?',
    bottomLinkText: 'Faça seu login! →',
    bottomLinkHref: '#/login',
  },
}

export function AuthForm(props: AuthFormProps): HTMLElement {
  const config = configs[props.variant]

  const section = document.createElement('section')
  section.className = 'w-full max-w-md'

  // Heading
  const heading = document.createElement('h1')
  heading.textContent = config.heading
  heading.className = 'text-branco font-prompt font-bold text-4xl mb-2'

  // Subtitle
  const subtitle = document.createElement('p')
  subtitle.textContent = config.subtitle
  subtitle.className = 'text-cinza-medio font-prompt text-lg mb-8'

  // Form
  const form = document.createElement('form')
  form.className = 'flex flex-col'
  form.addEventListener('submit', (e) => e.preventDefault())

  // Fields
  config.fields.forEach((field) => {
    const formField = FormField({
      label: field.label,
      inputType: field.inputType,
      placeholder: field.placeholder,
      name: field.name,
      id: field.id,
    })
    form.appendChild(formField)
  })

  // Remember / Forgot row
  const rememberRow = RememberForgotRow({ showForgotLink: config.showForgotLink })
  form.appendChild(rememberRow)

  // Submit button
  const submitBtn = Button({ text: config.submitText, type: 'submit' })
  form.appendChild(submitBtn)

  // Social login
  const socialGroup = SocialLoginGroup()
  form.appendChild(socialGroup)

  // Bottom link
  const bottomRow = document.createElement('p')
  bottomRow.className = 'text-center text-cinza-medio font-prompt text-sm mt-6'

  const bottomTextNode = document.createTextNode(config.bottomText + ' ')
  const bottomLink = Link({
    text: config.bottomLinkText,
    href: config.bottomLinkHref,
    variant: 'green',
  })

  bottomRow.appendChild(bottomTextNode)
  bottomRow.appendChild(bottomLink)
  form.appendChild(bottomRow)

  section.appendChild(heading)
  section.appendChild(subtitle)
  section.appendChild(form)

  return section
}

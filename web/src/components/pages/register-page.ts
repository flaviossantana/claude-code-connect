import { AuthTemplate } from '../templates/auth-template.ts'
import { BannerColumn } from '../organisms/banner-column.ts'
import { AuthForm } from '../organisms/auth-form.ts'

export function RegisterPage(): HTMLElement {
  return AuthTemplate({
    bannerSlot: BannerColumn({ imageSrc: '/banner-cadastro.png' }),
    formSlot: AuthForm({ variant: 'register' }),
  })
}

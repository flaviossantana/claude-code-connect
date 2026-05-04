import { AuthTemplate } from '../templates/auth-template.ts'
import { BannerColumn } from '../organisms/banner-column.ts'
import { AuthForm } from '../organisms/auth-form.ts'

export function RegisterPage(): HTMLElement {
  return AuthTemplate({
    bannerSlot: BannerColumn({ imageSrc: '/banner-cadastro.webp' }),
    formSlot: AuthForm({ variant: 'register' }),
  })
}

import { AuthTemplate } from '../templates/auth-template.ts'
import { BannerColumn } from '../organisms/banner-column.ts'
import { AuthForm } from '../organisms/auth-form.ts'

export function LoginPage(): HTMLElement {
  return AuthTemplate({
    bannerSlot: BannerColumn(),
    formSlot: AuthForm({ variant: 'login' }),
  })
}

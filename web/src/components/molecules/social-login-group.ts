import { Divider } from '../atoms/divider.ts'
import { SocialButton } from '../atoms/social-button.ts'

export function SocialLoginGroup(): HTMLDivElement {
  const wrapper = document.createElement('div')

  const divider = Divider({ text: 'ou entre com outras contas' })

  const buttonsRow = document.createElement('div')
  buttonsRow.className = 'flex gap-3'

  const githubBtn = SocialButton({
    iconSrc: '/logo-github.png',
    iconAlt: 'Logo GitHub',
    text: 'Github',
  })

  const googleBtn = SocialButton({
    iconSrc: '/logo-google.png',
    iconAlt: 'Logo Google',
    text: 'Gmail',
  })

  buttonsRow.appendChild(githubBtn)
  buttonsRow.appendChild(googleBtn)

  wrapper.appendChild(divider)
  wrapper.appendChild(buttonsRow)

  return wrapper
}

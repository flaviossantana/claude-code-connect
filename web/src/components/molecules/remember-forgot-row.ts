import { Checkbox } from '../atoms/checkbox.ts'
import { Link } from '../atoms/link.ts'

export type RememberForgotRowProps = {
  showForgotLink?: boolean
}

export function RememberForgotRow(props: RememberForgotRowProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center justify-between mb-6'

  const checkbox = Checkbox({
    label: 'Lembrar-me',
    name: 'remember',
    id: 'remember',
    checked: true,
  })

  wrapper.appendChild(checkbox)

  if (props.showForgotLink !== false) {
    const forgotLink = Link({
      text: 'Esqueci a senha',
      href: '#',
      variant: 'underline',
    })
    wrapper.appendChild(forgotLink)
  }

  return wrapper
}

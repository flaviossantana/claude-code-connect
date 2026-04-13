export type SocialButtonProps = {
  iconSrc: string
  iconAlt: string
  text: string
  onClick?: () => void
}

export function SocialButton(props: SocialButtonProps): HTMLButtonElement {
  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'flex-1 flex items-center justify-center gap-2 bg-cinza-escuro text-offwhite font-prompt text-sm py-3 px-4 rounded-lg border border-cinza hover:border-cinza-claro transition-colors duration-200 cursor-pointer'

  const icon = document.createElement('img')
  icon.src = props.iconSrc
  icon.alt = props.iconAlt
  icon.className = 'w-5 h-5 object-contain'

  const label = document.createElement('span')
  label.textContent = props.text

  button.appendChild(icon)
  button.appendChild(label)

  if (props.onClick) {
    button.addEventListener('click', props.onClick)
  }

  return button
}

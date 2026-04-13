export type ButtonProps = {
  text: string
  type?: 'submit' | 'button'
  onClick?: () => void
}

export function Button(props: ButtonProps): HTMLButtonElement {
  const button = document.createElement('button')
  button.type = props.type ?? 'button'
  button.textContent = props.text
  button.className =
    'w-full bg-verde-destaque text-grafite font-prompt font-medium text-lg py-3 px-6 rounded-lg cursor-pointer hover:brightness-95 transition-all duration-200'

  if (props.onClick) {
    button.addEventListener('click', props.onClick)
  }

  return button
}

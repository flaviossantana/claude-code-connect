export type InputProps = {
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  name: string
  id: string
}

export function Input(props: InputProps): HTMLInputElement {
  const input = document.createElement('input')
  input.type = props.type ?? 'text'
  input.name = props.name
  input.id = props.id
  if (props.placeholder) input.placeholder = props.placeholder
  input.className =
    'w-full bg-cinza text-offwhite font-prompt text-base py-3 px-4 rounded-lg border border-transparent outline-none focus:border-verde-destaque transition-colors duration-200 placeholder:text-cinza-medio'

  return input
}

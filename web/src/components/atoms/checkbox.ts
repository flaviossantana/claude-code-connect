export type CheckboxProps = {
  label: string
  name: string
  id: string
  checked?: boolean
}

export function Checkbox(props: CheckboxProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center gap-2'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.name = props.name
  input.id = props.id
  input.checked = props.checked ?? false
  input.className = 'w-4 h-4 accent-verde-destaque cursor-pointer'

  const label = document.createElement('label')
  label.htmlFor = props.id
  label.textContent = props.label
  label.className = 'text-cinza-claro font-prompt text-sm cursor-pointer'

  wrapper.appendChild(input)
  wrapper.appendChild(label)

  return wrapper
}

import { Label } from '../atoms/label.ts'
import { Input } from '../atoms/input.ts'

export type FormFieldProps = {
  label: string
  inputType?: 'text' | 'password' | 'email'
  placeholder?: string
  name: string
  id: string
}

export function FormField(props: FormFieldProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'mb-4'

  const label = Label({ text: props.label, htmlFor: props.id })
  const input = Input({
    type: props.inputType ?? 'text',
    placeholder: props.placeholder,
    name: props.name,
    id: props.id,
  })

  wrapper.appendChild(label)
  wrapper.appendChild(input)

  return wrapper
}

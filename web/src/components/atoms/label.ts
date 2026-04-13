export type LabelProps = {
  text: string
  htmlFor: string
}

export function Label(props: LabelProps): HTMLLabelElement {
  const label = document.createElement('label')
  label.htmlFor = props.htmlFor
  label.textContent = props.text
  label.className = 'block text-offwhite font-prompt text-sm mb-1'

  return label
}

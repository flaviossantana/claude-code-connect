import { describe, it, expect } from 'vitest'
import { RegisterPage } from './register-page'

describe('RegisterPage', () => {
  it('renders without errors', () => {
    const page = RegisterPage()
    expect(page).toBeInstanceOf(HTMLElement)
  })

  it('contains the heading "Cadastro"', () => {
    const page = RegisterPage()
    const heading = page.querySelector('h1')
    expect(heading?.textContent).toBe('Cadastro')
  })

  it('contains 3 form fields', () => {
    const page = RegisterPage()
    const inputs = page.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')
    expect(inputs).toHaveLength(3)
  })
})

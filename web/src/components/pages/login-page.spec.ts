import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { LoginPage } from './login-page'

describe('LoginPage', () => {
  it('renders without errors', () => {
    const page = LoginPage()
    expect(page).toBeInstanceOf(HTMLElement)
  })

  it('contains the heading "Login"', () => {
    const page = LoginPage()
    const heading = page.querySelector('h1')
    expect(heading?.textContent).toBe('Login')
  })

  it('contains 2 form fields', () => {
    const page = LoginPage()
    const inputs = page.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')
    expect(inputs).toHaveLength(2)
  })

  describe('acessibilidade (WCAG 2 AA)', () => {
    it('não deve ter violações de acessibilidade', async () => {
      const page = LoginPage()
      document.body.appendChild(page)

      const results = await axe(document.body, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      })

      expect(results).toHaveNoViolations()

      document.body.removeChild(page)
    })
  })
})

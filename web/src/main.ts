import './style.css'
import { createRouter } from './router.ts'
import { LoginPage } from './components/pages/login-page.ts'
import { RegisterPage } from './components/pages/register-page.ts'

const app = document.querySelector<HTMLDivElement>('#app')!

createRouter({
  container: app,
  defaultPath: '/login',
  routes: {
    '/login': LoginPage,
    '/register': RegisterPage,
  },
})

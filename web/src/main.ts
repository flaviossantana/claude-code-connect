import './style.css'
import { LoginPage } from './components/pages/login-page.ts'

const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(LoginPage())

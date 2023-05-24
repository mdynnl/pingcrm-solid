import Layout from '@/Shared/Layout'
import { Title } from '@solidjs/meta'

export default function Index(props) {
  return (
    <div>
      <Title>Dashboard</Title>
      <h1 class="mb-8 text-3xl font-bold">Dashboard</h1>
      {/* prettier-ignore */}
      <p class="mb-8 leading-normal">Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how <a class="text-indigo-500 hover:text-orange-600 underline" href="https://inertiajs.com">Inertia.js</a> works.</p>
    </div>
  )
}

Index.layout = Layout

import { Title } from '@solidjs/meta'
import Logo from '@/Shared/Logo'
import TextInput from '@/Shared/TextInput'
import LoadingButton from '@/Shared/LoadingButton'
import { useForm } from '@inertiajs/solid'
import { prevented } from '@/Shared/utils'

export default function Login(props) {
  const form = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: false,
  })
  const login = () => {
    form.post('/login')
  }

  return (
    <>
      <Title>Login</Title>
      <div class="flex items-center justify-center p-6 min-h-screen bg-indigo-800">
        <div class="w-full max-w-md">
          <Logo class="block mx-auto w-full max-w-xs fill-white" height="50" />
          <form class="mt-8 bg-white rounded-lg shadow-xl overflow-hidden" onSubmit={prevented(login)}>
            <div class="px-10 py-12">
              <h1 class="text-center text-3xl font-bold">Welcome Back!</h1>
              <div class="mt-6 mx-auto w-24 border-b-2" />
              <TextInput value={form.email} onInput={(e) => form.setData((data) => ({ ...data, email: e.target.value }))} error={form.errors.email} class="mt-10" label="Email" type="email" autofocus autocapitalize="off" />
              <TextInput value={form.password} onInput={(e) => form.setData((data) => ({ ...data, password: e.target.value }))} error={form.errors.password} class="mt-6" label="Password" type="password" />
              <label class="flex items-center mt-6 select-none" for="remember">
                <input id="remember" value={form.remember} onInput={(e) => form.setData((data) => ({ ...data, remember: e.target.value }))} class="mr-1" type="checkbox" />
                <span class="text-sm">Remember Me</span>
              </label>
            </div>
            <div class="flex px-10 py-4 bg-gray-100 border-t border-gray-100">
              <LoadingButton loading={form.processing} class="btn-indigo ml-auto" type="submit">
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

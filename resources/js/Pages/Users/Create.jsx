import FileInput from '@/Shared/FileInput'
import Layout from '@/Shared/Layout'
import LoadingButton from '@/Shared/LoadingButton'
import SelectInput from '@/Shared/SelectInput'
import TextInput from '@/Shared/TextInput'
import { prevented } from '@/Shared/utils'
import { Link, useForm } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'

export default function Create(props) {
  // remember: 'form',

  const form = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: false,
    photo: null,
  })

  const store = () => form.post('/users')
  return (
    <div>
      <Title>Create User</Title>
      <h1 class="mb-8 text-3xl font-bold">
        <Link class="text-indigo-400 hover:text-indigo-600" href="/users">
          Users
        </Link>
        <span class="text-indigo-400 font-medium">/</span> Create
      </h1>
      <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={prevented(store)}>
          <div class="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput value={form.first_name} error={form.errors.first_name} class="pb-8 pr-6 w-full lg:w-1/2" label="First name" />
            <TextInput value={form.last_name} error={form.errors.last_name} class="pb-8 pr-6 w-full lg:w-1/2" label="Last name" />
            <TextInput value={form.email} error={form.errors.email} class="pb-8 pr-6 w-full lg:w-1/2" label="Email" />
            <TextInput value={form.password} error={form.errors.password} class="pb-8 pr-6 w-full lg:w-1/2" type="password" autocomplete="new-password" label="Password" />
            <SelectInput value={form.owner} error={form.errors.owner} class="pb-8 pr-6 w-full lg:w-1/2" label="Owner">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </SelectInput>
            <FileInput value={form.photo} error={form.errors.photo} class="pb-8 pr-6 w-full lg:w-1/2" type="file" accept="image/*" label="Photo" />
          </div>
          <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton loading={form.processing} class="btn-indigo" type="submit">
              Create User
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}
Create.layout = Layout

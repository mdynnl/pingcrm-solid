import { Link, useForm } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'
import Layout from '@/Shared/Layout'
import LoadingButton from '@/Shared/LoadingButton'
import SelectInput from '@/Shared/SelectInput'
import TextInput from '@/Shared/TextInput'
import { prevented } from '@/Shared/utils'

export default function Create(props) {
  // remember: 'form',
  const form = useForm({
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postal_code: null,
  })

  const store = () => {
    form.post('/organizations')
  }
  return (
    <div>
      <Title>Create Organization</Title>
      <h1 class="mb-8 text-3xl font-bold">
        <Link class="text-indigo-400 hover:text-indigo-600" href="/organizations">
          Organizations
        </Link>
        <span class="text-indigo-400 font-medium">/</span> Create
      </h1>
      <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={prevented(store)}>
          <div class="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput value={form.name} error={form.errors.name} class="pb-8 pr-6 w-full lg:w-1/2" label="Name" />
            <TextInput value={form.email} error={form.errors.email} class="pb-8 pr-6 w-full lg:w-1/2" label="Email" />
            <TextInput value={form.phone} error={form.errors.phone} class="pb-8 pr-6 w-full lg:w-1/2" label="Phone" />
            <TextInput value={form.address} error={form.errors.address} class="pb-8 pr-6 w-full lg:w-1/2" label="Address" />
            <TextInput value={form.city} error={form.errors.city} class="pb-8 pr-6 w-full lg:w-1/2" label="City" />
            <TextInput value={form.region} error={form.errors.region} class="pb-8 pr-6 w-full lg:w-1/2" label="Province/State" />
            <SelectInput value={form.country} error={form.errors.country} class="pb-8 pr-6 w-full lg:w-1/2" label="Country">
              <option value={null} />
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput value={form.postal_code} error={form.errors.postal_code} class="pb-8 pr-6 w-full lg:w-1/2" label="Postal code" />
          </div>
          <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton loading={form.processing} class="btn-indigo" type="submit">
              Create Organization
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}
Create.layout = Layout

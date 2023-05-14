import { Link, useForm } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'
import Layout from '@/Shared/Layout'
import TextInput from '@/Shared/TextInput'
import SelectInput from '@/Shared/SelectInput'
import LoadingButton from '@/Shared/LoadingButton'
import { prevented } from '@/Shared/utils'

/**
 *
 * @param {{organizations: []}} props
 */
export default function Create(props) {
  // remember: 'form',
  const form = useForm({
    first_name: '',
    last_name: '',
    organization_id: null,
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: '',
  })
  const store = () => {
    form.post('/contacts')
  }
  return (
    <div>
      <Title>Create Contact</Title>
      <h1 class="mb-8 text-3xl font-bold">
        <Link class="text-indigo-400 hover:text-indigo-600" href="/contacts">
          Contacts
        </Link>
        <span class="text-indigo-400 font-medium">/</span> Create
      </h1>
      <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={prevented(store)}>
          <div class="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput value={form.first_name} error={form.errors.first_name} class="pb-8 pr-6 w-full lg:w-1/2" label="First name" />
            <TextInput value={form.last_name} error={form.errors.last_name} class="pb-8 pr-6 w-full lg:w-1/2" label="Last name" />
            <SelectInput value={form.organization_id} error={form.errors.organization_id} class="pb-8 pr-6 w-full lg:w-1/2" label="Organization">
              <option value="null" />
              <For each={props.organizations}>{(organization) => <option value={organization.id}>{organization.name}</option>}</For>
            </SelectInput>
            <TextInput value={form.email} error={form.errors.email} class="pb-8 pr-6 w-full lg:w-1/2" label="Email" />
            <TextInput value={form.phone} error={form.errors.phone} class="pb-8 pr-6 w-full lg:w-1/2" label="Phone" />
            <TextInput value={form.address} error={form.errors.address} class="pb-8 pr-6 w-full lg:w-1/2" label="Address" />
            <TextInput value={form.city} error={form.errors.city} class="pb-8 pr-6 w-full lg:w-1/2" label="City" />
            <TextInput value={form.region} error={form.errors.region} class="pb-8 pr-6 w-full lg:w-1/2" label="Province/State" />
            <SelectInput value={form.country} error={form.errors.country} class="pb-8 pr-6 w-full lg:w-1/2" label="Country">
              <option value="null" />
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput value={form.postal_code} error={form.errors.postal_code} class="pb-8 pr-6 w-full lg:w-1/2" label="Postal code" />
          </div>
          <div class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton loading={form.processing} class="btn-indigo" type="submit">
              Create Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}

Create.layout = Layout

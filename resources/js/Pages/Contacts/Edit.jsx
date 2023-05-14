import Layout from '@/Shared/Layout'
import LoadingButton from '@/Shared/LoadingButton'
import SelectInput from '@/Shared/SelectInput'
import TextInput from '@/Shared/TextInput'
import TrashedMessage from '@/Shared/TrashedMessage'
import { prevented } from '@/Shared/utils'
import { Link, useForm, router } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'
import { For, Show } from 'solid-js'

/**
 * @typedef Contact
 * @prop {number} id
 * @prop {string} first_name
 * @prop {string} last_name
 * @prop {number} organization_id
 * @prop {any} organization
 * @prop {string} email
 * @prop {string} phone
 * @prop {string} address
 * @prop {string} city
 * @prop {string} region
 * @prop {string} country
 * @prop {string} postal_code
 *
 * @param {{organizations: [],contact: Contact}} props
 */
export default function Edit(props) {
  // remember: 'form',

  const form = useForm({
    first_name: props.contact.first_name,
    last_name: props.contact.last_name,
    organization_id: props.contact.organization_id,
    email: props.contact.email,
    phone: props.contact.phone,
    address: props.contact.address,
    city: props.contact.city,
    region: props.contact.region,
    country: props.contact.country,
    postal_code: props.contact.postal_code,
  })

  const update = () => {
    form.put(`/contacts/${props.contact.id}`)
  }
  const destroy = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      router.delete(`/contacts/${props.contact.id}`)
    }
  }
  const restore = () => {
    if (confirm('Are you sure you want to restore this contact?')) {
      router.put(`/contacts/${props.contact.id}/restore`)
    }
  }
  return (
    <>
      <div>
        <Title>
          {form.first_name} {form.last_name}
        </Title>
        <h1 class="mb-8 text-3xl font-bold">
          <Link class="text-indigo-400 hover:text-indigo-600" href="/contacts">
            Contacts
          </Link>
          <span class="text-indigo-400 font-medium">/</span>
          {form.first_name} {form.last_name}
        </h1>
        {contact.deleted_at && (
          <TrashedMessage class="mb-6" onRestore={restore}>
            This contact has been deleted.
          </TrashedMessage>
        )}
        <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
          <form onSubmit={prevented(update)}>
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
            <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
              <Show when={!contact.deleted_at}>
                <button class="text-red-600 hover:underline" tabindex="-1" type="button" onClick={destroy}>
                  Delete Contact
                </button>
              </Show>
              <LoadingButton loading={form.processing} class="btn-indigo ml-auto" type="submit">
                Update Contact
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

Edit.layout = Layout

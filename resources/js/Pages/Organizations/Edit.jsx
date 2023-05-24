import Icon from '@/Shared/Icon'
import Layout from '@/Shared/Layout'
import LoadingButton from '@/Shared/LoadingButton'
import SelectInput from '@/Shared/SelectInput'
import TextInput from '@/Shared/TextInput'
import TrashedMessage from '@/Shared/TrashedMessage'
import { prevented } from '@/Shared/utils'
import { Link, router, useForm } from '@inertiajs/solid'

/**
 *
 * @typedef Organization
 * @prop {string} name
 * @prop {string} email
 * @prop {string} phone
 * @prop {string} address
 * @prop {string} city
 * @prop {string} region
 * @prop {string} country
 * @prop {string} postal_code
 *
 * @param {{organization: Organization}} props
 */
export default function Edit(props) {
  // remember: 'form',
  const form = useForm({
    name: props.organization.name,
    email: props.organization.email,
    phone: props.organization.phone,
    address: props.organization.address,
    city: props.organization.city,
    region: props.organization.region,
    country: props.organization.country,
    postal_code: props.organization.postal_code,
  })

  const update = () => {
    form.put(`/organizations/${props.organization.id}`)
  }
  const destroy = () => {
    if (confirm('Are you sure you want to delete this organization?')) {
      router.delete(`/organizations/${props.organization.id}`)
    }
  }
  const restore = () => {
    if (confirm('Are you sure you want to restore this organization?')) {
      router.put(`/organizations/${props.organization.id}/restore`)
    }
  }

  return (
    <>
      <div>
        <Title>{form.name}</Title>
        <h1 class="mb-8 text-3xl font-bold">
          <Link class="text-indigo-400 hover:text-indigo-600" href="/organizations">
            Organizations
          </Link>
          <span class="text-indigo-400 font-medium">/</span>
          {form.name}
        </h1>
        {props.organization.deleted_at && (
          <TrashedMessage class="mb-6" onRestore={restore}>
            This organization has been deleted.
          </TrashedMessage>
        )}
        <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
          <form onSubmit={prevented(update)}>
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
            <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
              {!organization.deleted_at && (
                <button class="text-red-600 hover:underline" tabindex="-1" type="button" onClick={destroy}>
                  Delete Organization
                </button>
              )}
              <LoadingButton loading={form.processing} class="btn-indigo ml-auto" type="submit">
                Update Organization
              </LoadingButton>
            </div>
          </form>
        </div>
        <h2 class="mt-12 text-2xl font-bold">Contacts</h2>
        <div class="mt-6 bg-white rounded shadow overflow-x-auto">
          <table class="w-full whitespace-nowrap">
            <thead>
              <tr class="text-left font-bold">
                <th class="pb-4 pt-6 px-6">Name</th>
                <th class="pb-4 pt-6 px-6">City</th>
                <th class="pb-4 pt-6 px-6" colspan="2">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={props.organization.contacts}>
                {(contact) => (
                  <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
                    <td class="border-t">
                      <Link class="flex items-center px-6 py-4 focus:text-indigo-500" href={`/contacts/${contact.id}/edit`}>
                        {contact.name}
                        <Icon v-if="contact.deleted_at" name="trash" class="flex-shrink-0 ml-2 w-3 h-3 fill-gray-400" />
                      </Link>
                    </td>
                    <td class="border-t">
                      <Link class="flex items-center px-6 py-4" href={`/contacts/${contact.id}/edit`} tabindex="-1">
                        {contact.city}
                      </Link>
                    </td>
                    <td class="border-t">
                      <Link class="flex items-center px-6 py-4" href={`/contacts/${contact.id}/edit`} tabindex="-1">
                        {contact.phone}
                      </Link>
                    </td>
                    <td class="w-px border-t">
                      <Link class="flex items-center px-4" href={`/contacts/${contact.id}/edit`} tabindex="-1">
                        <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
                      </Link>
                    </td>
                  </tr>
                )}
              </For>
              {props.organization.contacts.length === 0 && (
                <tr>
                  <td class="px-6 py-4 border-t" colspan="4">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
Edit.layout = Layout

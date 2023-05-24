import Icon from '@/Shared/Icon'
import pickBy from 'lodash/pickBy'
import Layout from '@/Shared/Layout'
import throttle from 'lodash/throttle'
import mapValues from 'lodash/mapValues'
import Pagination from '@/Shared/Pagination'
import SearchFilter from '@/Shared/SearchFilter'
import { router, Link } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'
import { createStore } from 'solid-js/store'
import { For, createEffect, on } from 'solid-js'

/**
 * @typedef Filters
 * @prop {string} search
 * @prop {string} trashed
 *
 * @typedef Contacts
 * @prop {import('./Edit').Contact[]} data
 * @prop {{url?: string, label: string}[]} links
 *
 * @typedef Props
 * @prop {Filters} filters
 * @prop {Contacts} contacts
 *
 * @param {Props} props
 */
export default function Index(props) {
  const [form, setForm] = createStore(props.filters)
  const reset = () => setForm((form) => mapValues(form, () => null))
  createEffect(
    on(
      () => pickBy(form),
      (form) => throttle(() => router.get('/contacts', form, { preserveState: true }), 150),
    ),
  )

  return (
    <>
      <div>
        <Title>Contacts</Title>
        <h1 class="mb-8 text-3xl font-bold">Contacts</h1>
        <div class="flex items-center justify-between mb-6">
          <SearchFilter value={form.search} onInput={(e) => setForm('search', e)} class="mr-4 w-full max-w-md" onReset={reset}>
            <label class="block text-gray-700">Trashed:</label>
            <select value={form.trashed} onChange={(e) => setForm('trashed', e.target.value)} class="form-select mt-1 w-full">
              <option value="null" />
              <option value="with">With Trashed</option>
              <option value="only">Only Trashed</option>
            </select>
          </SearchFilter>
          <Link class="btn-indigo" href="/contacts/create">
            <span>Create</span>
            <span class="hidden md:inline">&nbsp;Contact</span>
          </Link>
        </div>
        <div class="bg-white rounded-md shadow overflow-x-auto">
          <table class="w-full whitespace-nowrap">
            <thead>
              <tr class="text-left font-bold">
                <th class="pb-4 pt-6 px-6">Name</th>
                <th class="pb-4 pt-6 px-6">Organization</th>
                <th class="pb-4 pt-6 px-6">City</th>
                <th class="pb-4 pt-6 px-6" colspan="2">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={props.contacts.data}>
                {(contact) => (
                  <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
                    <td class="border-t">
                      <Link class="flex items-center px-6 py-4 focus:text-indigo-500" href={`/contacts/${contact.id}/edit`}>
                        {contact.name}
                        <icon v-if="contact.deleted_at" name="trash" class="flex-shrink-0 ml-2 w-3 h-3 fill-gray-400" />
                      </Link>
                    </td>
                    <td class="border-t">
                      <Link class="flex items-center px-6 py-4" href={`/contacts/${contact.id}/edit`} tabindex="-1">
                        <div v-if="contact.organization">{contact.organization.name}</div>
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
                        <icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
                      </Link>
                    </td>
                  </tr>
                )}
              </For>
              {props.contacts.data.length === 0 && (
                <tr>
                  <td class="px-6 py-4 border-t" colspan="4">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination class="mt-6" links={props.contacts.links} />
      </div>
    </>
  )
}

Index.layout = Layout

import Icon from '@/Shared/Icon'
import Layout from '@/Shared/Layout'
import SearchFilter from '@/Shared/SearchFilter'
import { Link, router } from '@inertiajs/solid'
import { Title } from '@solidjs/meta'
import mapValues from 'lodash/mapValues'
import pickBy from 'lodash/pickBy'
import throttle from 'lodash/throttle'
import { For, createEffect, on } from 'solid-js'
import { createStore } from 'solid-js/store'

/**
 * @typedef Filters
 * @prop {string} search
 * @prop {string} role
 * @prop {string} trashed
 *
 * @param {{filters: Filters, users: []}} props
 */
export default function Index(props) {
  const [form, setForm] = createStore(props.filters)

  createEffect(
    on(
      () => pickBy(form),
      (form) => throttle(() => router.get('/users', form, { preserveState: true }), 150),
    ),
  )

  const reset = () => setForm((form) => mapValues(form, () => null))
  return (
    <div>
      <Title>Users</Title>
      <h1 class="mb-8 text-3xl font-bold">Users</h1>
      <div class="flex items-center justify-between mb-6">
        <SearchFilter value={form.search} class="mr-4 w-full max-w-md" onInput={(v) => setForm('search', v)} onReset={reset}>
          <label class="block text-gray-700">Role:</label>
          <select value={form.role} onChange={(e) => setForm('role', e.target.value)} class="form-select mt-1 w-full">
            <option value="null" />
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
          <label class="block mt-4 text-gray-700">Trashed:</label>
          <select value={form.trashed} onChange={(e) => setForm('trashed', e.target.value)} class="form-select mt-1 w-full">
            <option value="null" />
            <option value="with">With Trashed</option>
            <option value="only">Only Trashed</option>
          </select>
        </SearchFilter>
        <Link class="btn-indigo" href="/users/create">
          <span>Create</span>
          <span class="hidden md:inline">&nbsp;User</span>
        </Link>
      </div>
      <div class="bg-white rounded-md shadow overflow-x-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-bold">
              <th class="pb-4 pt-6 px-6">Name</th>
              <th class="pb-4 pt-6 px-6">Email</th>
              <th class="pb-4 pt-6 px-6" colspan="2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={props.users}>
              {(user) => (
                <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
                  <td class="border-t">
                    <Link class="flex items-center px-6 py-4 focus:text-indigo-500" href={`/users/${user.id}/edit`}>
                      {user.photo && <img class="block -my-2 mr-2 w-5 h-5 rounded-full" src={user.photo} />}
                      {user.name}
                      {user.deleted_at && <Icon name="trash" class="flex-shrink-0 ml-2 w-3 h-3 fill-gray-400" />}
                    </Link>
                  </td>
                  <td class="border-t">
                    <Link class="flex items-center px-6 py-4" href={`/users/${user.id}/edit`} tabindex="-1">
                      {user.email}
                    </Link>
                  </td>
                  <td class="border-t">
                    <Link class="flex items-center px-6 py-4" href={`/users/${user.id}/edit`} tabindex="-1">
                      {user.owner ? 'Owner' : 'User'}
                    </Link>
                  </td>
                  <td class="w-px border-t">
                    <Link class="flex items-center px-4" href={`/users/${user.id}/edit`} tabindex="-1">
                      <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
                    </Link>
                  </td>
                </tr>
              )}
            </For>
            {props.users.length === 0 && (
              <tr>
                <td class="px-6 py-4 border-t" colspan="4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Index.layout = Layout

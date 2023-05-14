import { Link, useForm } from '@inertiajs/solid'
import Layout from '@/Shared/Layout'
import TextInput from '@/Shared/TextInput'
import FileInput from '@/Shared/FileInput'
import SelectInput from '@/Shared/SelectInput'
import LoadingButton from '@/Shared/LoadingButton'
import TrashedMessage from '@/Shared/TrashedMessage'
import { Title } from '@solidjs/meta'
import { prevented } from '@/Shared/utils'

/**
 *
 * @param {{user: Object}} props
 */
export default function Edit(props) {
  // remember: 'form',
  const form = useForm({
    _method: 'put',
    first_name: this.user.first_name,
    last_name: this.user.last_name,
    email: this.user.email,
    password: '',
    owner: this.user.owner,
    photo: null,
  })
  const update = () => {
    form.post(`/users/${this.user.id}`, {
      onSuccess: () => form.reset('password', 'photo'),
    })
  }
  const destroy = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      this.$inertia.delete(`/users/${this.user.id}`)
    }
  }
  const restore = () => {
    if (confirm('Are you sure you want to restore this user?')) {
      this.$inertia.put(`/users/${this.user.id}/restore`)
    }
  }
  return (
    <>
      <div>
        <Title>
          {form.first_name} {form.last_name}
        </Title>
        <div class="flex justify-start mb-8 max-w-3xl">
          <h1 class="text-3xl font-bold">
            <Link class="text-indigo-400 hover:text-indigo-600" href="/users">
              Users
            </Link>
            <span class="text-indigo-400 font-medium">/</span>
            {form.first_name} {form.last_name}
          </h1>
          {user.photo && <img class="block ml-4 w-8 h-8 rounded-full" src={user.photo} />}
        </div>
        {user.deleted_at && (
          <TrashedMessage class="mb-6" onRestore={restore}>
            This user has been deleted.
          </TrashedMessage>
        )}
        <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
          <form onSubmit={prevented(update)}>
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
            <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
              {!user.deleted_at && (
                <button class="text-red-600 hover:underline" tabindex="-1" type="button" onClick={destroy}>
                  Delete User
                </button>
              )}
              <LoadingButton loading={form.processing} class="btn-indigo ml-auto" type="submit">
                Update User
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
Edit.layout = Layout

import Icon from '@/Shared/Icon'
import { Link, usePage } from '@inertiajs/solid'

export default function MainMenu(props) {
  const page = usePage()
  const isUrl = (...urls) => {
    let currentUrl = page.url.substr(1)
    if (urls[0] === '') {
      return currentUrl === ''
    }
    return urls.filter((url) => currentUrl.startsWith(url)).length
  }
  return (
    <div {...props}>
      <div class="mb-4">
        <Link class="group flex items-center py-3" href="/">
          <Icon name="dashboard" class="mr-2 w-4 h-4" classList={{ [isUrl('') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white']: true }} />
          <div classList={{ [isUrl('') ? 'text-white' : 'text-indigo-300 group-hover:text-white']: true }}>Dashboard</div>
        </Link>
      </div>
      <div class="mb-4">
        <Link class="group flex items-center py-3" href="/organizations">
          <Icon name="office" class="mr-2 w-4 h-4" classList={{ [isUrl('organizations') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white']: true }} />
          <div classList={{ [isUrl('organizations') ? 'text-white' : 'text-indigo-300 group-hover:text-white']: true }}>Organizations</div>
        </Link>
      </div>
      <div class="mb-4">
        <Link class="group flex items-center py-3" href="/contacts">
          <Icon name="users" class="mr-2 w-4 h-4" classList={{ [isUrl('contacts') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white']: true }} />
          <div classList={{ [isUrl('contacts') ? 'text-white' : 'text-indigo-300 group-hover:text-white']: true }}>Contacts</div>
        </Link>
      </div>
      <div class="mb-4">
        <Link class="group flex items-center py-3" href="/reports">
          <Icon name="printer" class="mr-2 w-4 h-4" classList={{ [isUrl('reports') ? 'fill-white' : 'fill-indigo-400 group-hover:fill-white']: true }} />
          <div classList={{ [isUrl('reports') ? 'text-white' : 'text-indigo-300 group-hover:text-white']: true }}>Reports</div>
        </Link>
      </div>
    </div>
  )
}

import { Link } from '@inertiajs/solid'
import Icon from '@/Shared/Icon'
import Logo from '@/Shared/Logo'
import Dropdown from '@/Shared/Dropdown'
import MainMenu from '@/Shared/MainMenu'
import FlashMessages from '@/Shared/FlashMessages'

export default function Layout(props) {
  return (
    <div>
      <div id="dropdown" />
      <div class="md:flex md:flex-col">
        <div class="md:flex md:flex-col md:h-screen">
          <div class="md:flex md:flex-shrink-0">
            <div class="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:justify-center md:w-56">
              <Link class="mt-1" href="/">
                <Logo class="fill-white" width="120" height="28" />
              </Link>
              <Dropdown
                class="md:hidden"
                placement="bottom-end"
                dropdown={
                  <div class="mt-2 px-8 py-4 bg-indigo-800 rounded shadow-lg">
                    <MainMenu />
                  </div>
                }
              >
                {/* prettier-ignore */}
                <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
              </Dropdown>
            </div>
            <div class="md:text-md flex items-center justify-between p-4 w-full text-sm bg-white border-b md:px-12 md:py-0">
              <div class="mr-4 mt-1">{props.auth?.user.account.name}</div>
              <Dropdown
                class="mt-1"
                placement="bottom-end"
                dropdown={
                  <div class="mt-2 py-2 text-sm bg-white rounded shadow-xl">
                    {/* prettier-ignore */}
                    <Link class="block px-6 py-2 hover:text-white hover:bg-indigo-500" href={`/users/${props.auth?.user.id}/edit`}>My Profile</Link>
                    {/* prettier-ignore */}
                    <Link class="block px-6 py-2 hover:text-white hover:bg-indigo-500" href="/users">Manage Users</Link>
                    {/* prettier-ignore */}
                    <Link class="block px-6 py-2 w-full text-left hover:text-white hover:bg-indigo-500" href="/logout" method="delete" as="button">Logout</Link>
                  </div>
                }
              >
                <div class="group flex items-center cursor-pointer select-none">
                  <div class="mr-1 text-gray-700 group-hover:text-indigo-600 focus:text-indigo-600 whitespace-nowrap">
                    <span>{props.auth?.user.first_name}</span>
                    <span class="hidden md:inline">&nbsp;{props.auth?.user.last_name}</span>
                  </div>
                  <Icon class="w-5 h-5 fill-gray-700 group-hover:fill-indigo-600 focus:fill-indigo-600" name="cheveron-down" />
                </div>
              </Dropdown>
            </div>
          </div>
          <div class="md:flex md:flex-grow md:overflow-hidden">
            <MainMenu class="hidden flex-shrink-0 p-12 w-56 bg-indigo-800 overflow-y-auto md:block" />
            <div class="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto" scroll-region>
              <FlashMessages />
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

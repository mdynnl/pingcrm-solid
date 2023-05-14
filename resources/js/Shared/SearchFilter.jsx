import Dropdown from '@/Shared/Dropdown'
import { mergeProps } from 'solid-js'

/**
 * @typedef Props
 * @prop {string} value
 * @prop {(v: string) => void} onInput
 * @prop {Function} onReset
 *
 * @param {Props} props
 */
export default function SearchFilter(props) {
  const defaults = mergeProps({ maxWidth: 300 }, props)
  return (
    <div class="flex items-center">
      <div class="flex w-full bg-white rounded shadow">
        <Dropdown
          dropdown={
            <div class="mt-2 px-4 py-6 w-screen bg-white rounded shadow-xl" style={{ 'max-width': `${defaults.maxWidth}px` }}>
              {defaults.children}
            </div>
          }
          auto-close="false"
          class="focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring md:px-6"
          placement="bottom-start"
        >
          <div class="flex items-baseline">
            <span class="hidden text-gray-700 md:inline">Filter</span>
            <svg class="w-2 h-2 fill-gray-700 md:ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961.243 599.998">
              <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
            </svg>
          </div>
        </Dropdown>
        <input class="relative px-6 py-3 w-full rounded-r focus:shadow-outline" autocomplete="off" type="text" name="search" placeholder="Search…" value={defaults.value} onInput={(e) => defaults.onInput?.(e.target.value)} />
      </div>
      <button class="ml-3 text-gray-500 hover:text-gray-700 focus:text-indigo-500 text-sm" type="button" onClick={defaults.onReset}>
        Reset
      </button>
    </div>
  )
}

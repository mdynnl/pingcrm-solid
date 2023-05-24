import { Link } from '@inertiajs/solid'
import { For, Show } from 'solid-js'

/**
 * @param {{links: {url?: string, label: string}[]}} props
 */
export default function Pagination(props) {
  return (
    <Show when={props.links.length > 3}>
      <div>
        <div class="flex flex-wrap -mb-1">
          <For each={props.links}>
            {(link) => (
              <Show when={link.url} fallback={<div class="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded">{link.label}</div>}>
                <Link class="mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-white border focus:border-indigo-500 rounded" classList={{ 'bg-white': link.active }} href={link.url}>
                  {link.label}
                </Link>
              </Show>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}

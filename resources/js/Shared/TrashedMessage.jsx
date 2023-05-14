import Icon from '@/Shared/Icon'

/**
 * @param {import('solid-js').ParentProps<{onRestore: () => void}>} props
 */
export default function TrashedMessage(props) {
  return (
    <div class="flex items-center justify-between p-4 max-w-3xl bg-yellow-400 rounded">
      <div class="flex items-center">
        <Icon name="trash" class="flex-shrink-0 mr-2 w-4 h-4 fill-yellow-800" />
        <div class="text-yellow-800 text-sm font-medium">{props.children}</div>
      </div>
      <button class="text-yellow-800 hover:underline text-sm" tabindex="-1" type="button" onClick={props.onRestore}>
        Restore
      </button>
    </div>
  )
}

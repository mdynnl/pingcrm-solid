import { Show, createSignal, mergeProps } from 'solid-js'

/**
 *
 * @param {{value?: File, label: string, accept: string, errors: []}} props
 * @returns
 */
export default function FileInput(props) {
  const defaults = mergeProps({ errors: [] }, props)

  const [file, setFile] = createSignal()

  const filesize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }
  const browse = () => file().click()
  const change = (e) => props.onChange(e.target.files[0])
  const remove = () => props.onChange(null)

  return (
    <div>
      {defaults.label && <label class="form-label">{props.label}:</label>}
      <div class="form-input p-0" classList={{ error: defaults.errors.length }}>
        <input ref={setFile} value={defaults.value ?? ''} type="file" accept={defaults.accept} class="hidden" onChange={change} />
        <Show
          when={defaults.value}
          fallback={
            <div class="p-2">
              <button type="button" class="px-4 py-1 text-white text-xs font-medium bg-gray-500 hover:bg-gray-700 rounded-sm" onClick={browse}>
                Browse
              </button>
            </div>
          }
        >
          <div class="flex items-center justify-between p-2">
            <div class="flex-1 pr-1">
              {defaults.value.name} <span class="text-gray-500 text-xs">({filesize(defaults.value.size)})</span>
            </div>
            <button type="button" class="px-4 py-1 text-white text-xs font-medium bg-gray-500 hover:bg-gray-700 rounded-sm" onClick={remove}>
              Remove
            </button>
          </div>
        </Show>
      </div>
      {defaults.errors.length && <div class="form-error">{defaults.errors[0]}</div>}
    </div>
  )
}

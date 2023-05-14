import { splitProps } from 'solid-js'
/**
 *
 * @param {{loading: boolean}} props
 */
export default function LoadingButton(props) {
  const [local, rest] = splitProps(props, ['loading', 'children', 'class'])
  return (
    <button disabled={local.loading} class="flex items-center" classList={{[local.class]: true}} {...rest}>
      {local.loading && <div class="btn-spinner mr-2" />}
      {local.children}
    </button>
  )
}

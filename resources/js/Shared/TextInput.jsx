import { mergeProps, splitProps } from 'solid-js'
import { v4 as uuid } from 'uuid'

/**
 * @typedef Props
 * @prop {string} id
 * @prop {string} error
 * @prop {string} label
 *
 * @param {import('solid-js').ComponentProps<'input'> & Props} props
 */
export default function TextInput(props) {
  let _id;
  const [local, rest] = splitProps(
    mergeProps(
      {
        get id() {
          return (_id ??= `text-input-${uuid()}`)
        },
      },
      props,
    ),
    ['label', 'error', 'class', 'classList'],
  )

  return (
    <div classList={mergeProps({ [local.class]: true }, () => local.classList)}>
      {local.label && (
        <label class="form-label" for={rest.id}>
          {local.label}:
        </label>
      )}
      <input class="form-input" classList={{ error: local.error }} {...rest} />
      {local.error && <div class="form-error">{local.error}</div>}
    </div>
  )
}

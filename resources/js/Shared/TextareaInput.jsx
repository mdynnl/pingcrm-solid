import { mergeProps, splitProps } from 'solid-js'
import { v4 as uuid } from 'uuid'

/**
 * @typedef Props
 * @prop {string} id
 * @prop {string} error
 * @prop {string} label
 *
 * @param {import('solid-js').ComponentProps<'textarea'> & Props} props
 */
export default function TextareaInput(props) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        get id() {
          return (_id ??= `textarea-input-${uuid()}`)
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
      <textarea class="form-textarea" classList={{ error: local.error }} {...rest} />
      {local.error && <div class="form-error">{local.error}</div>}
    </div>
  )
}

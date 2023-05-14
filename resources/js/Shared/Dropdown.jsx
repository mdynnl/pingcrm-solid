import { createPopper } from '@popperjs/core'
import { Show, createEffect, createSignal, mergeProps, splitProps, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'

/**
 * @typedef Props
 * @prop {import('@popperjs/core').Placement} placement
 * @prop {boolean} autoClose
 * @prop {import('solid-js').JSX.Element} dropdown
 *
 * @param {import('solid-js').ParentProps<Props>} props
 */
export default function Dropdown(props) {
  const defaults = mergeProps(
    {
      placement: 'bottom-end',
      autoClose: true,
    },
    props,
  )
  const [local, rest] = splitProps(props, ['placement', 'autoClose'])
  const [el, setEl] = createSignal()
  const [dropdown, setDropdown] = createSignal()
  const [popper, setPopper] = createSignal()
  const [show, setShow] = createSignal(false)

  onMount(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setShow(false)
      }
    })
  })

  createEffect(() => {
    if (show()) {
      setPopper(
        createPopper(el(), dropdown(), {
          placement: defaults.placement,
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altBoundary: true,
              },
            },
          ],
        }),
      )
    } else if (popper()) {
      setTimeout(() => popper().destroy(), 100)
    }
  })

  return (
    <button ref={setEl} type="button" onClick={[setShow, true]} {...props}>
      {props.children}
      <Show when={show()}>
        <Portal mount={document.getElementById("dropdown")}>
          <div>
            <div style="position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99998; background: black; opacity: 0.2" onClick={[setShow, false]} />
            <div ref={setDropdown} style="position: absolute; z-index: 99999" onClick={[setShow, () => !defaults.autoClose]}>
              {props.dropdown}
            </div>
          </div>
        </Portal>
      </Show>
    </button>
  )
}

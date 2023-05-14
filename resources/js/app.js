import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/solid'
import { MetaProvider } from '@solidjs/meta'
import { render } from 'solid-js/web'

import * as s from 'solid-js'
globalThis.s = s

InertiaProgress.init()
createInertiaApp({
  resolve: (name) => require(`./Pages/${name}`),
  title: (title) => (title ? `${title} - Ping CRM` : 'Ping CRM'),
  setup({ el, App, props }) {
    render(
      () => (
        <MetaProvider>
          <App {...props} />
        </MetaProvider>
      ),
      el,
    )
  },
})


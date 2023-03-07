import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { message } from 'antd'
import { fetchJson } from '@/libs/swrHelpers'

import 'antd/dist/reset.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
          // message.open({
          //   type: 'error',
          //   content: err.message,
          // })
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

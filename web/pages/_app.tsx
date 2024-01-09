import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import Header from '@/components/Header'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div>
        <Header />
        <main className='h-full min-h-screen grid'>
          <Component {...pageProps} />
        </main>
      </div>
    </RecoilRoot>
  )
}

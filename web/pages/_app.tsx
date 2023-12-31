import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <main className='pt-16 min-h-screen flex items-center justify-center'>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

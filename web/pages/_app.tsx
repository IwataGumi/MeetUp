import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import Header from '@/components/Header'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <div>
          <Header />
          <main className='h-full min-h-screen grid'>
            <Component {...pageProps} />
          </main>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </div>
      </ThemeProvider>
    </RecoilRoot>
  )
}

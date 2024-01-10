import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import Header from '@/components/Header'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <div>
          <Header />
          <main className='h-full min-h-screen grid'>
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </RecoilRoot>
  )
}

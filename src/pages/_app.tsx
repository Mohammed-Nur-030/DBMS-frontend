import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {Toaster} from 'react-hot-toast'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const inter = Inter({ subsets: ['latin'] })

const queryClient=new QueryClient();


// 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




export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}> 
    <GoogleOAuthProvider clientId='63871630369-u56oe8itcrqr65rp4bdeja2uld2ummk5.apps.googleusercontent.com'>
      <div className={inter.className}>
        <Component {...pageProps} />
        <Toaster/>
        <ReactQueryDevtools/>
      </div>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

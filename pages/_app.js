import { ExpenXProvider } from '../context/ExpenXContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ExpenXProvider>
      <Component {...pageProps} />
    </ExpenXProvider>
  )
}

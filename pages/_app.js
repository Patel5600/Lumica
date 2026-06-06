import { ExpenXProvider } from '../context/ExpenXContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ExpenXProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ExpenXProvider>
  )
}

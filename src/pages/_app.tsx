import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/custom.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Head from 'next/head';
import AuthGuard from '@/utils/AuthGuard';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Provider store={store.reduxStore}>
          <PersistGate loading={null} persistor={store.persistor}>
            <AuthGuard>
            <Head>
              <title>Aaloo Admin</title>
              <link rel="icon" href="/images/favicon-black.png" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
            </AuthGuard>
          </PersistGate>
        </Provider>
    </>
  )
}

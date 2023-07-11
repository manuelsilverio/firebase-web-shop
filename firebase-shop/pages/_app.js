import Layout from '../components/layout'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { UserAuthContextProvider } from '../firebase/UserAuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </UserAuthContextProvider>
  );
}

export default MyApp

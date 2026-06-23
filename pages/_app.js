import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

    </>
  );
}

export default App;

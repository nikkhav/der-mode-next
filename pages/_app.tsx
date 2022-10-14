import "/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Der Mode</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;

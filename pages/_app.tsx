import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />

      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

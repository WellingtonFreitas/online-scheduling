import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React from 'react';
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

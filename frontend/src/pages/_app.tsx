import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { client } from '../graphql/apollo-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ApolloProvider>
    </AuthProvider>
  );
}

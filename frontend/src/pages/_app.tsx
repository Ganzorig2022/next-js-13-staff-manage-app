import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { client } from '../graphql/apollo-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthProvider>
    </ApolloProvider>
  );
}

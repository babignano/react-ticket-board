import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { useMemo, ReactNode } from 'react';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

interface ApolloProviderWithAuthProps {
  children: ReactNode;
}

export function ApolloProviderWithAuth({ children }: ApolloProviderWithAuthProps) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useMemo(() => {
    const authLink = setContext(async (_, { headers }) => {
      // Only get token if user is authenticated
      if (!isAuthenticated) {
        return { headers };
      }

      try {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      } catch (error) {
        console.error('Error getting access token:', error);
        return { headers };
      }
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

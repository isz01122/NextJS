import React, { useEffect } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useGetUser, useStoreIntoAPP } from 'app.store/intoAPP/store.intoAPP';
import {
  initializeStore,
  useCreateStore,
  StoreProvider,
} from 'app.store/rootStore';
import AppLayout from 'app.layout/AppLayout';
import PageSign from 'pages/sign';
import { GlobalStyle } from 'app.styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      cacheTime: 1,
    },
  },
});

const App = ({ Component, pageProps }) => {
  const getUser = useGetUser();
  const requestAuthUser = useStoreIntoAPP((state) => state.requestAuthUser);

  useEffect(() => {
    requestAuthUser();
  }, []);

  if (getUser.isLoading) return null;
  if (!getUser.login) return <PageSign />;
  return <AppLayout contentsComponent={<Component {...pageProps} />} />;
};

const AppContainer = (props) => {
  const store = initializeStore();
  const initialZustandState = store.getState();
  const createStore = useCreateStore(initialZustandState);

  return (
    <>
      <Head>
        <title>Dori</title>
      </Head>
      <GlobalStyle />
      <StoreProvider createStore={createStore}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App {...props} />
        </QueryClientProvider>
      </StoreProvider>
    </>
  );
};

export default AppContainer;

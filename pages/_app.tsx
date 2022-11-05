import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  // Prevents errors and allows a smoother workflow in the future
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <SessionProvider session={session}>
      <div className="mx-auto overflow-hidden max-h-screen lg:max-w-6xl">
        <div className="grid grid-cols-10">
          <Sidebar />
          <div className="col-span-8 border-l lg:col-span-5 lg:border-x">
            <Component {...pageProps} />
          </div>
          <Widgets />
        </div>
      </div>
    </SessionProvider >
  );
};

export default App;
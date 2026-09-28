'use client';


import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <SkeletonTheme baseColor="var(--skeleton-baseColor)" highlightColor="var(--skeleton-highlight)" >
        {children}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          z-index="5"
        />
      </SkeletonTheme>
    </Provider>
  );
}
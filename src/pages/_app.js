import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';

import "@/styles/scss/style.scss";
import "@/styles/globals.scss";
import { HomeLayout } from '@/components';

export default function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <HomeLayout
        hasSubheader={pageProps.hasSubheader}
        hasFooter={pageProps.hasFooter}
      >
        {page}
      </HomeLayout>
    ));

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </RecoilRoot>
  );
}

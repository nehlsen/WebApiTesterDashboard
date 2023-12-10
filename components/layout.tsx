import Head from 'next/head';
export const siteTitle = 'Web API Tester Dashboard';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
          <h1>{siteTitle}</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

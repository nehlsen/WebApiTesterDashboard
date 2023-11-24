import Head from 'next/head';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
export const siteTitle = 'Web API Tester Dashboard';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
          <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

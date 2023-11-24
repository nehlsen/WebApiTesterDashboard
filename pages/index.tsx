import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import PlanList from "../components/PlanList";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PlanList />
    </Layout>
  );
}

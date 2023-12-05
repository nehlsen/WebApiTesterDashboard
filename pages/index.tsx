import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import PlanList from "../components/PlanList";
import PlanDetailsView from "../components/PlanDetailsView";
import {useState} from "react";
import {PlanListItem} from "../lib/PlanListItem";

export default function Home() {
    const [selectedPlan, setSelectedPlan] = useState<PlanListItem>();

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <PlanList onSelectPlan={(plan) => setSelectedPlan(plan)} />
            <PlanDetailsView planListItem={selectedPlan} onClose={() => setSelectedPlan(null)}/>
        </Layout>
    );
}

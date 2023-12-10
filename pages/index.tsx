import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import PlanList from "../components/PlanList";
import PlanDetailsView from "../components/PlanDetailsView";
import {useState} from "react";
import {PlanListItem} from "../lib/PlanListItem";
import ExecutionRecordList from "../components/ExecutionRecordList";
import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import ExecutionRecordDetailsView from "../components/ExecutionRecordDetailsView";

export default function Home() {
    const [selectedPlan, setSelectedPlan] = useState<PlanListItem>();
    const [selectedExecutionRecord, setSelectedExecutionRecord] = useState<PlanExecutionRecord>();

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div>
                <PlanList
                    onSelectPlan={plan => setSelectedPlan(plan)} />
                {selectedPlan ?
                    <PlanDetailsView
                        planListItem={selectedPlan}
                        onClose={() => {setSelectedPlan(null); setSelectedExecutionRecord(null);}} />
                    :
                    <></>
                }

                {selectedPlan ?
                    <ExecutionRecordList
                        plan={selectedPlan}
                        onSelectExecutionRecord={record => setSelectedExecutionRecord(record)} />
                    :
                    <></>
                }
                {selectedExecutionRecord ?
                    <ExecutionRecordDetailsView
                        record={selectedExecutionRecord} />
                    :
                    <></>
                }
            </div>
        </Layout>
    );
}

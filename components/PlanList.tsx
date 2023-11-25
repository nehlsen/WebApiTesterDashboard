import useSWR from "swr";
import {PlanListItem} from "../lib/PlanListItem";
import fetcher from "../lib/fetch";
import PlanView from "./PlanView";
import {apiHost} from "../lib/api";
import styles from '../styles/layout.module.css';
import {useState} from "react";
import PlanDetailsView from "./PlanDetailsView";

export default function PlanList() {
    const [selectedPlan, setSelectedPlan] = useState<PlanListItem>();

    const { data, error } = useSWR<PlanListItem[], Error>(
        `${apiHost}/plans/`,
        fetcher/*,
        { refreshInterval: 60000 }*/
    );
    const isLoading = !error && !data;
    const allPlans = data;

    if (isLoading) {
        return (<div>Loading ...</div>)
    }
    if (error) {
        return (<div>
            <strong>ERROR :(</strong> <br/>
            <small>{error.message}</small>
        </div>)
    }

    return (
        <div>
            {selectedPlan ?
                <PlanDetailsView planListItem={selectedPlan} onClose={() => setSelectedPlan(null)} />
                :
                <div className={styles.planList}>
                    {allPlans.map((plan: PlanListItem) => {
                        return (<PlanView plan={plan} onClick={() => setSelectedPlan(plan)} key={plan.uuid} />)
                    })}
                </div>
            }
        </div>
    )
}

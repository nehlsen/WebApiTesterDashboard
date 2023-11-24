import {Plan} from "../lib/Plan";
import useSWR from "swr";
import {apiHost} from "../lib/api";
import fetcher from "../lib/fetch";
import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import styles from "../styles/layout.module.css";
import ExecutionRecordView from "./ExecutionRecordView";
import BtnRunPlan from "./BtnRunPlan";

export default function PlanView({plan}: {plan: Plan}) {
    const { data, error } = useSWR<PlanExecutionRecord, Error>(
        `${apiHost}/plans/${plan.uuid}/execution-records/latest`,
        fetcher/*,
        { refreshInterval: 60000 }*/
    );
    const isLoading = !error && !data;
    const executionRecord = data;

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
        <div className={styles.planView}>
            <strong>{plan.name}</strong>
            {executionRecord ?
                <ExecutionRecordView record={executionRecord} />
                : <div>NO RECORD</div>
            }
            <BtnRunPlan plan={plan} />
        </div>
    )
}

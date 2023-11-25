import {PlanListItem} from "../lib/PlanListItem";
import useSWR from "swr";
import {apiHost} from "../lib/api";
import fetcher from "../lib/fetch";
import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import styles from "../styles/layout.module.css";
import ExecutionRecordView from "./ExecutionRecordView";
import BtnRunPlan from "./BtnRunPlan";
import {MouseEventHandler} from "react";

export default function PlanView({plan, onClick}: {plan: PlanListItem, onClick: MouseEventHandler<HTMLElement>}) {
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
            <a onClick={onClick}>{plan.name}</a>
            {executionRecord ?
                <ExecutionRecordView record={executionRecord} />
                : <div>NO RECORD</div>
            }
            <BtnRunPlan plan={plan} />
        </div>
    )
}

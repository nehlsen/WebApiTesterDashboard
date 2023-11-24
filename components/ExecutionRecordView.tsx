import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import styles from "../styles/layout.module.css";
import Date from "./date";

export default function ExecutionRecordView({record}: {record: PlanExecutionRecord}) {
    // FIXME until we really know when its missing ...
    if (!record.uuid) {
        return (<div>NO RECORD</div>)
    }

    return (
        <div className={styles.planExecutionRecord}>
            Last run <span className={styles.runtime}>{record.runtimeMillis < 1 ? "-" : record.runtimeMillis}ms</span>
            <span className={styles.resultPositive}>{record.resultPositive ? "🍀" : "💩"}</span>
            <Date dateString={record.timestamp} />
        </div>
    )
}
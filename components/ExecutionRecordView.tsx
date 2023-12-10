import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import Date from "./date";

export default function ExecutionRecordView({record}: {record: PlanExecutionRecord}) {
    // FIXME until we really know when its missing ...
    if (!record.uuid) {
        return (<div>NO RECORD</div>)
    }

    return (
        <div>
            Last run <span>{record.runtimeMillis < 1 ? "-" : record.runtimeMillis}ms</span>
            <span>{record.resultPositive ? "🍀" : "💩"}</span>
            <Date dateString={record.timestamp} />
        </div>
    )
}
import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import {TaskExecutionRecord} from "../lib/TaskExecutionRecord";

function TaskExecutionRecordView({record}: {record: TaskExecutionRecord}) {
    return (
        <div>
            Runtime {record.runtimeMillis}ms
            <br/>
            <strong>Request</strong>
            <br/>
            <code>
                {record.request.method} {record.request.uri} <br/>
                {record.request.body}
            </code>
            <br/>
            <strong>Response</strong><code>{record.response.statusCode}</code>
        </div>
    )
}

export default function ExecutionRecordDetailsView({record}: {record: PlanExecutionRecord}) {
    return (
        <div>
            ExecutionRecordDetailsView
            <ul>
            {record.taskExecutionRecords.map(
                task => <li><TaskExecutionRecordView record={task} /></li>
            ) }
            </ul>
        </div>
    )
}

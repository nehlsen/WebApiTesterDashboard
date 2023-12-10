import {Plan} from "../lib/Plan";
import useSWR from "swr";
import {apiHost} from "../lib/api";
import fetcher from "../lib/fetch";
import {PlanExecutionRecord} from "../lib/PlanExecutionRecord";
import {tr} from "date-fns/locale";
import Date from "./date";
import {PlanListItem} from "../lib/PlanListItem";

export default function ExecutionRecordList({plan, onSelectExecutionRecord}: {plan: PlanListItem, onSelectExecutionRecord: (record: PlanExecutionRecord) => void}) {
    const { data, error } = useSWR<PlanExecutionRecord[], Error>(
        `${apiHost}/plans/${plan.uuid}/execution-records/`,
        fetcher/*,
        { refreshInterval: 60000 }*/
    );
    const isLoading = !error && !data;
    const executionRecords = data;

    if (isLoading || !executionRecords) {
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
            <h2>execution records</h2>
            <table>
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Runtime</th>
                    <th>Success</th>
                </tr>
                </thead>
                <tbody>
                {executionRecords.map(record =>
                    <tr>
                        <td onClick={() => onSelectExecutionRecord(record)}>
                            <Date dateString={record.timestamp} />
                        </td>
                        <td>
                            <span>{record.runtimeMillis < 1 ? "-" : record.runtimeMillis}ms</span>
                        </td>
                        <td>
                            <span>{record.resultPositive ? "🍀" : "💩"}</span>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

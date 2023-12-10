import {TaskExecutionRecord} from "./TaskExecutionRecord";

export interface PlanExecutionRecord {
    uuid: string,
    runtimeMillis: number,
    resultPositive: boolean,
    timestamp: Date
    taskExecutionRecords: TaskExecutionRecord[]
}

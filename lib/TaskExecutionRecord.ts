import {RequestRecord} from "./RequestRecord";
import {ResponseRecord} from "./ResponseRecord";

export interface TaskExecutionRecord {
    uuid: string,
    runtimeMillis: number,
    resultPositive: boolean,
    request: RequestRecord,
    response: ResponseRecord,
}

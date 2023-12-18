import {HeadersRecord} from "./HeadersRecord";

export interface ResponseRecord {
    statusCode: number
    headers: HeadersRecord
    body: string
}

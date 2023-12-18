import {HeadersRecord} from "./HeadersRecord";

export interface RequestRecord {
    method: string
    uri: string
    headers: HeadersRecord
    body: string
}

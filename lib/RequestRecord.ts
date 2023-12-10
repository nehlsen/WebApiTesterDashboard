export interface RequestRecord {
    method: string
    uri: string
    headers: Map<string, string[]>
    body: string
}

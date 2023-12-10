export interface ResponseRecord {
    statusCode: number
    headers: Map<string, string[]>
    body: string
}

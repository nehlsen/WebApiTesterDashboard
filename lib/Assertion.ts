export interface Assertion {
    uuid: String
    type: String
    // parameters: { [key: string]: string }
    parameters: Map<string, string>
}

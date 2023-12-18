import {Assertion} from "./Assertion";
import {Parameters} from "./Parameters";

export interface Task {
    uuid: string
    type: string
    name: string
    uri: string
    assertions: Assertion[]
    parameters: Parameters
}

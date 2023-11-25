import {Assertion} from "./Assertion";

export interface Task {
    uuid: String
    type: String
    name: String
    uri: String
    assertions: Assertion[]
}
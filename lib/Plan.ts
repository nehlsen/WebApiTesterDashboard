import {PlanListItem} from "./PlanListItem";
import {Task} from "./Task";

export interface Plan extends PlanListItem {
    tasks: Task[]
    schedule: String | null
    scheduleActive: boolean
}
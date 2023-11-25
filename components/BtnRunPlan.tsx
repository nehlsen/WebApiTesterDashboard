import {PlanListItem} from "../lib/PlanListItem";
import {apiHost} from "../lib/api";

export default function BtnRunPlan({plan}: {plan: PlanListItem}) {
    return (
        <button onClick={() => {
            fetch(`${apiHost}/plans/${plan.uuid}/run`, {method: "POST"});
        }}>
            🏇🏽 Run
        </button>
    )
}

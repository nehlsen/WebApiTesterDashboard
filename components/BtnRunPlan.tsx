import {Plan} from "../lib/Plan";
import {apiHost} from "../lib/api";

export default function BtnRunPlan({plan}: {plan: Plan}) {
    return (
        <button onClick={() => {
            fetch(`${apiHost}/plans/${plan.uuid}/run`, {method: "POST"});
        }}>
            🏇🏽 Run
        </button>
    )
}

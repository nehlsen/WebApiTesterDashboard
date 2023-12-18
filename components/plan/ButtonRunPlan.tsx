import {PlanListItem} from "../../lib/PlanListItem";
import {Button} from "@chakra-ui/react";
import {apiHost} from "../../lib/api";

export function ButtonRunPlan({plan}: {plan: PlanListItem}) {
    return (
        <Button onClick={() => fetch(`${apiHost}/plans/${plan.uuid}/run`, {method: "POST"})}>
            🏇🏽 Run
        </Button>
    );
}
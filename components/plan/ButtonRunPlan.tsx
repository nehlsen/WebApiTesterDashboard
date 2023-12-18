import {PlanListItem} from "../../lib/PlanListItem";
import {Button, useToast} from "@chakra-ui/react";
import {apiHost} from "../../lib/api";

export function ButtonRunPlan({plan}: {plan: PlanListItem}) {
    const toast = useToast()

    return (
        <Button onClick={() => {
            const runPlanRequest = fetch(`${apiHost}/plans/${plan.uuid}/run`, {method: "POST"})

            toast.promise(runPlanRequest, {
                success: { title: 'Successfully scheduled', description: 'The Plan has been scheduled for Execution' },
                error: { title: 'Failed', description: 'Failed to schedule Plan execution' },
                loading: { title: 'Loading', description: 'Please wait' },
            })
        }}>
            🏇🏽 Run
        </Button>
    );
}
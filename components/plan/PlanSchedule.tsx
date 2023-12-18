import {Plan} from "../../lib/Plan";

export function PlanSchedule({plan}: {plan: Plan}) {
    if (!plan.schedule) {
        return (
            <em>not scheduled</em>
        )
    }

    return (
        <>
            ⏰
            <span>{plan.schedule}</span>
            <span>{plan.scheduleActive ? "active" : "not-active"}</span>
        </>
    )
}
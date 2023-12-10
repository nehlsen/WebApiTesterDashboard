import useSWR from "swr";
import {PlanListItem} from "../lib/PlanListItem";
import fetcher from "../lib/fetch";
import PlanView from "./PlanView";
import {apiHost} from "../lib/api";

export default function PlanList({onSelectPlan}: {onSelectPlan: (PlanListItem) => void}) {
    const { data, error } = useSWR<PlanListItem[], Error>(
        `${apiHost}/plans/`,
        fetcher/*,
        { refreshInterval: 60000 }*/
    );
    const isLoading = !error && !data;
    const allPlans = data;

    if (isLoading) {
        return (<div>Loading ...</div>)
    }
    if (error) {
        return (<div>
            <strong>ERROR :(</strong> <br/>
            <small>{error.message}</small>
        </div>)
    }

    return (
        <div>
            {allPlans.map((plan: PlanListItem) => {
                return (<PlanView plan={plan} onClick={() => onSelectPlan(plan)} key={plan.uuid}/>)
            })}
        </div>
    )
}

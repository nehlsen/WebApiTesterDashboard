import useSWR from "swr";
import {Plan} from "../lib/Plan";
import fetcher from "../lib/fetch";
import PlanView from "./PlanView";
import {apiHost} from "../lib/api";
import styles from '../styles/layout.module.css';

export default function PlanList() {
    const { data, error } = useSWR<Plan[], Error>(
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
        <div className={styles.planList}>
            {allPlans.map((plan: Plan) => {
                return (<PlanView plan={plan} />)
            })}
        </div>
    )
}

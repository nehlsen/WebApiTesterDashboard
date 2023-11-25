import {PlanListItem} from "../lib/PlanListItem";
import useSWR from "swr";
import {apiHost} from "../lib/api";
import fetcher from "../lib/fetch";
import {Plan} from "../lib/Plan";
import {MouseEventHandler} from "react";
import styles from "../styles/layout.module.css";
import {Task} from "../lib/Task";
import {Assertion} from "../lib/Assertion";

function PlanSchedule({plan}: {plan: Plan}) {
    if (plan.schedule) {
        return (
            <div>
                ⏰
                <span>{plan.schedule}</span>
                <span>{plan.scheduleActive ? "active" : "not-active"}</span>
            </div>
        )
    } else {
        return (
            <span>not scheduled</span>
        )
    }
}

function TaskList({tasks}: {tasks: Task[]}) {
    return (
        <div>
            <h3>{tasks.length} Tasks</h3>
            {tasks.map(task =>
                <TaskView task={task} key={task.uuid} />
            )}
        </div>
    )
}

function TaskView({task}: {task: Task}) {
    return (
        <div>
            <h4>{task.name}</h4>
            <small>{task.type}</small>
            <small>{task.uri}</small>
            <AssertionList assertions={task.assertions} />
        </div>
    )
}

function AssertionList({assertions}: {assertions: Assertion[]}) {
    return (
        <div>
            <h3>{assertions.length} Assertions</h3>
            {assertions.map(assertion =>
                <AssertionView assertion={assertion} key={assertion.uuid} />
            )}
        </div>
    )
}

function AssertionView({assertion}: {assertion: Assertion}) {
    return (
        <div>
            <h4>{assertion.type}</h4>

            <ul>
                {Object.keys(assertion.parameters).map(k => {
                    return (
                        <li key={k}>{k}: {assertion.parameters[k]}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function PlanDetailsView({planListItem, onClose}: {planListItem: PlanListItem, onClose: MouseEventHandler<HTMLElement>}) {
    const { data, error } = useSWR<Plan, Error>(
        `${apiHost}/plans/${planListItem.uuid}`,
        fetcher/*,
        { refreshInterval: 60000 }*/
    );
    const isLoading = !error && !data;
    const plan = data;

    if (isLoading || !plan) {
        return (<div>Loading ...</div>)
    }
    if (error) {
        return (<div>
            <strong>ERROR :(</strong> <br/>
            <small>{error.message}</small>
        </div>)
    }

    return (
        <div className={styles.planDetails}>
            <h2>
                <a onClick={onClose} className={styles.closeBtn}>❌ close</a>
                {plan.name}
            </h2>
            <PlanSchedule plan={plan} />
            <TaskList tasks={plan.tasks} />
        </div>
    )
}
import {PlanListItem} from "../lib/PlanListItem";
import useSWR from "swr";
import {apiHost} from "../lib/api";
import fetcher from "../lib/fetch";
import {Plan} from "../lib/Plan";
import {MouseEventHandler} from "react";
import {Task} from "../lib/Task";
import {Assertion} from "../lib/Assertion";

function PlanSchedule({plan}: {plan: Plan}) {
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

function TaskList({tasks}: {tasks: Task[]}) {
    return (
        <>
            {tasks.length == 0 ? <h3>No Tasks</h3> : <></> }
            {/*<h3>{tasks.length} Tasks</h3>*/}
            <ul>
            {tasks.map(task =>
                <li>
                    <TaskView task={task} key={task.uuid} />
                </li>
            )}
            </ul>
        </>
    )
}

function TaskView({task}: {task: Task}) {
    return (
        <div>
            <h4>{task.name}</h4>
            <code>
                {task.type} {task.uri} <br/>
                {task.parameters['body']}
            </code>
            <AssertionList assertions={task.assertions} />
        </div>
    )
}

function AssertionList({assertions}: {assertions: Assertion[]}) {
    return (
        <div>
            {assertions.length == 0 ? <h3>No Assertions</h3> : <></> }
            {/*<h3>{assertions.length} Assertions</h3>*/}
            <ul>
            {assertions.map(assertion =>
                <li>
                    <AssertionView assertion={assertion} key={assertion.uuid} />
                </li>
            )}
            </ul>
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
                        <li key={k}><code>{k}: {assertion.parameters[k]}</code></li>
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
        <div>
            <div>
                <div>
                    <strong>{plan.name}</strong>
                    <a onClick={onClose}>❌ close</a>
                </div>
                <div>
                    <PlanSchedule plan={plan} />
                </div>
                <div>
                    <TaskList tasks={plan.tasks} />
                </div>
            </div>
        </div>
    )
}
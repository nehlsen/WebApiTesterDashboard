import {Task} from "../../lib/Task";
import {Box, Code, Text, ListItem, UnorderedList} from "@chakra-ui/react";
import {Assertion} from "../../lib/Assertion";

export function TaskList({tasks}: {tasks: Task[]}) {
    if (tasks.length == 0) {
        return (
            <h3>No Tasks</h3>
        )
    }

    return (
        <UnorderedList>
            {tasks.map(task =>
                <ListItem key={task.uuid}>
                    <TaskView task={task}  />
                </ListItem>
            )}
        </UnorderedList>
    )
}

function TaskView({task}: {task: Task}) {
    return (
        <Box>
            <Text fontSize='lg'>🧩 {task.name}</Text>
            <Code>
                {task.type} {task.uri} <br/>
                {task.parameters['body']}
            </Code>
            <AssertionList assertions={task.assertions} />
        </Box>
    )
}

function AssertionList({assertions}: {assertions: Assertion[]}) {
    if (assertions.length == 0) {
        return (
            <h3>No Assertions</h3>
        )
    }

    return (
        <Box>
            <UnorderedList>
                {assertions.map(assertion =>
                    <ListItem key={assertion.uuid}>
                        <AssertionView assertion={assertion} />
                    </ListItem>
                )}
            </UnorderedList>
        </Box>
    )
}

function AssertionView({assertion}: {assertion: Assertion}) {
    return (
        <Box>
            <h4>🔬 {assertion.type}</h4>

            <UnorderedList>
                {Object.keys(assertion.parameters).map(k => {
                    return (
                        <ListItem key={k}>
                            <Code>{k}: {assertion.parameters[k]}</Code>
                        </ListItem>
                    )
                })}
            </UnorderedList>
        </Box>
    )
}

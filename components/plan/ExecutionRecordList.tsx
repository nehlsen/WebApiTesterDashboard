import {PlanListItem} from "../../lib/PlanListItem";
import useSWR from "swr";
import {PlanExecutionRecord} from "../../lib/PlanExecutionRecord";
import {apiHost} from "../../lib/api";
import fetcher from "../../lib/fetch";
import {ErrorFailedToFetch} from "../ErrorFailedToFetch";
import {SwrLoading} from "../SwrLoading";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Code,
    Heading,
    ListItem,
    OrderedList
} from "@chakra-ui/react";
import {HeadersRecordView} from "./HeadersRecordView";
import {ExecutionRecordStatusView} from "./ExecutionRecordStatusView";

export function ExecutionRecordList({plan}: {plan: PlanListItem}) {
    const { data, error } = useSWR<PlanExecutionRecord[], Error>(
        `${apiHost}/plans/${plan.uuid}/execution-records/`,
        fetcher,
        { refreshInterval: 15000 }
    );

    if (error) {
        return <ErrorFailedToFetch error={error} />
    }
    if (!data) {
        return <SwrLoading />
    }

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {data.map(record =>
                <AccordionItem key={record.uuid}>
                    <Heading>
                        <AccordionButton>
                            <ExecutionRecordStatusView record={record} />
                            <AccordionIcon/>
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <OrderedList>
                            {record.taskExecutionRecords.map(task =>
                                <ListItem key={task.uuid}>
                                    Runtime <Badge colorScheme='purple'>{task.runtimeMillis}ms</Badge>
                                    <br/>
                                    <strong>Request</strong>
                                    <br/>
                                    <HeadersRecordView headers={task.request.headers} />
                                    <br/>
                                    <Code overflowX={'auto'} maxW={`5xl`}>
                                        {task.request.method} {task.request.uri} <br/>
                                        {task.request.body}
                                    </Code>
                                    <br/>
                                    <strong>Response</strong><Code>{task.response.statusCode}</Code>
                                    <HeadersRecordView headers={task.response.headers} />
                                    <Code overflowX={'auto'} maxW={`5xl`}>
                                        {task.response.body}
                                    </Code>
                                </ListItem>
                            ) }
                        </OrderedList>
                    </AccordionPanel>
                </AccordionItem>
            )}
        </Accordion>
    );
}
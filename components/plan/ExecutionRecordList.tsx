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
    Box,
    Code,
    Heading,
    ListItem,
    OrderedList
} from "@chakra-ui/react";
import Date from "../Date";
import {HeadersRecordView} from "./HeadersRecordView";

export function ExecutionRecordList({plan}: {plan: PlanListItem}) {
    const { data, error } = useSWR<PlanExecutionRecord[], Error>(
        `${apiHost}/plans/${plan.uuid}/execution-records/`,
        fetcher/*,
        { refreshInterval: 60000 }*/
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
                            <Box as="span" flex='1' textAlign='left'>
                                <Date date={record.timestamp}/>
                                <Badge colorScheme='purple'>{record.runtimeMillis < 1 ? "-" : record.runtimeMillis}ms</Badge>
                                {record.resultPositive ?
                                    <Badge colorScheme='green'>🍀 Success</Badge>
                                    :
                                    <Badge colorScheme='red'>💩 Failure</Badge>
                                }
                            </Box>
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
                                    <Code overflowX={'auto'}>
                                        {task.request.method} {task.request.uri} <br/>
                                        {task.request.body}
                                    </Code>
                                    <br/>
                                    <strong>Response</strong><Code>{task.response.statusCode}</Code>
                                    <HeadersRecordView headers={task.response.headers} />
                                    <Code overflowX={'auto'}>
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
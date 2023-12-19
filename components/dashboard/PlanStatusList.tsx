import useSWR from "swr";
import {PlanListItem} from "../../lib/PlanListItem";
import {apiHost} from "../../lib/api";
import fetcher from "../../lib/fetch";
import {ErrorFailedToFetch} from "../ErrorFailedToFetch";
import {SwrLoading} from "../SwrLoading";
import {Box, Flex, VStack} from "@chakra-ui/react";
import {PlanExecutionRecord} from "../../lib/PlanExecutionRecord";
import {ExecutionRecordStatusView} from "../plan/ExecutionRecordStatusView";
import Link from "next/link";

export function PlanStatusList() {
    const { data, error } = useSWR<PlanListItem[], Error>(
        `${apiHost}/plans/`,
        fetcher,
        { refreshInterval: 60000 }
    )

    if (error) {
        return <ErrorFailedToFetch error={error} />
    }
    if (!data) {
        return <SwrLoading />
    }

    return (
        <VStack m={3} minW={`200px`}>
            {data.map(plan => <PlanStatusView plan={plan} key={plan.uuid} /> )}
        </VStack>
    )
}

function PlanStatusView({plan}: {plan: PlanListItem}) {
    const { data, error } = useSWR<PlanExecutionRecord, Error>(
        `${apiHost}/plans/${plan.uuid}/execution-records/latest`,
        fetcher,
        { refreshInterval: 60000 }
    )

    if (error) {
        return <ErrorFailedToFetch error={error} />
    }
    if (!data) {
        return <SwrLoading />
    }

    return (
        <Flex>
            <Box><Link href={`/plans/${plan.uuid}`}>{plan.name}</Link></Box>
            <ExecutionRecordStatusView record={data} />
        </Flex>
    )
}

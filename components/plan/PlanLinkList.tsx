import useSWR from "swr";
import {PlanListItem} from "../../lib/PlanListItem";
import {apiHost} from "../../lib/api";
import fetcher from "../../lib/fetch";
import Link from "next/link";
import {Box} from "@chakra-ui/react";
import {ErrorFailedToFetch} from "../ErrorFailedToFetch";
import {SwrLoading} from "../SwrLoading";

export function PlanLinkList() {
    const { data, error } = useSWR<PlanListItem[], Error>(
        `${apiHost}/plans/`,
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
        <Box m={3}>
            {data.map(plan =>
                <Box
                    key={plan.uuid}
                    p={3}
                    _hover={{bg: 'tomato'}}
                >
                    <Link href={`/plans/${plan.uuid}`}>{plan.name}</Link>
                </Box>
            )}
        </Box>
    )
}

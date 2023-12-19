import useSWR from "swr";
import {Plan} from "../../lib/Plan";
import {apiHost} from "../../lib/api";
import fetcher from "../../lib/fetch";
import {PlanSchedule} from "./PlanSchedule";
import {Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";
import {TaskList} from "./TaskList";
import {ExecutionRecordList} from "./ExecutionRecordList";
import {ErrorFailedToFetch} from "../ErrorFailedToFetch";
import {SwrLoading} from "../SwrLoading";
import {ButtonRunPlan} from "./ButtonRunPlan";

export function PlanDetailsView({uuid}: {uuid: String}) {
    const { data, error } = useSWR<Plan, Error>(
        `${apiHost}/plans/${uuid}`,
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
        <Box m={3} flex={`1`}>
            <Flex>
                <Box as="span" flex='1' textAlign='left'>
                    <Heading>{data.name}</Heading>
                </Box>
                <ButtonRunPlan plan={data} />
            </Flex>

            <Tabs>
                <TabList>
                    <Tab>Executions</Tab>
                    <Tab>Tasks</Tab>
                    <Tab>Scheduling</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ExecutionRecordList plan={data} />
                    </TabPanel>
                    <TabPanel>
                        <TaskList tasks={data.tasks} />
                    </TabPanel>
                    <TabPanel>
                        <PlanSchedule plan={data} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
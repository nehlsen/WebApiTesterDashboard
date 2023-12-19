import Date from "../Date";
import {Badge, Box} from "@chakra-ui/react";
import {PlanExecutionRecord} from "../../lib/PlanExecutionRecord";

export function ExecutionRecordStatusView({record}: {record: PlanExecutionRecord}) {
    return (
        <Box as="span" flex='1' textAlign='left'>
            <Date date={record.timestamp}/>
            <Badge colorScheme='purple'>{record.runtimeMillis < 1 ? "-" : record.runtimeMillis}ms</Badge>
            {record.resultPositive ?
                <Badge colorScheme='green'>🍀 Success</Badge>
                :
                <Badge colorScheme='red'>💩 Failure</Badge>
            }
        </Box>
    );
}
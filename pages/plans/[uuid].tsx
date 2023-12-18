import {useRouter} from "next/router";
import {PlanDetailsView} from "../../components/plan/PlanDetailsView";
import {PlanLinkList} from "../../components/plan/PlanLinkList";
import {Flex} from "@chakra-ui/react";

export default function Page() {
    const router = useRouter()
    const uuidOfPlan = router.query.uuid as String;

    if (!uuidOfPlan) {
        return <div>ERROR</div>
    }

    return (
        <Flex m={3}>
            <PlanLinkList />
            <PlanDetailsView uuid={uuidOfPlan} />
        </Flex>
    )
}

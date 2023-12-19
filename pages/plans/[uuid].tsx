import {useRouter} from "next/router";
import {PlanDetailsView} from "../../components/plan/PlanDetailsView";
import {PlanLinkList} from "../../components/plan/PlanLinkList";
import {Flex, VStack} from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
    const router = useRouter()
    const uuidOfPlan = router.query.uuid as String;

    if (!uuidOfPlan) {
        return <div>ERROR</div>
    }

    return (
        <Flex>
            <VStack pt={'5'}>
                <Link href={'/'}>📟 DASHBOARD</Link>
                <PlanLinkList />
            </VStack>
            <PlanDetailsView uuid={uuidOfPlan} />
        </Flex>
    )
}

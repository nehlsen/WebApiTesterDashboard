import Head from 'next/head';
import {PlanLinkList} from "../components/plan/PlanLinkList";
import {Center, Heading} from "@chakra-ui/react";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Web API Tester Dashboard</title>
            </Head>
            <Center>
                <Heading>Web API Tester Dashboard</Heading>
            </Center>
            <Center>
                <PlanLinkList />
            </Center>
        </div>
    );
}

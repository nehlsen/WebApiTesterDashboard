import Head from 'next/head';
import {Container, Heading, VStack} from "@chakra-ui/react";
import Link from "next/link";
import {PlanStatusList} from "../components/dashboard/PlanStatusList";

export default function Home() {
    return (
        <Container maxW='8xl' p={'8'}>
            <Head>
                <title>Web API Tester Dashboard</title>
            </Head>
            <VStack>
                <Heading>Web API Tester Dashboard</Heading>
                <PlanStatusList />
                <Link href={'/plans'}>All Plans</Link>
            </VStack>
        </Container>
    );
}

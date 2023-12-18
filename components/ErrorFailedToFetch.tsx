import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

export function ErrorFailedToFetch({error}: {error?: Error}) {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Failed to fetch Data!</AlertTitle>
            {error ? <AlertDescription>{error.message}</AlertDescription> : <></> }
        </Alert>
    )
}
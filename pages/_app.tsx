import {AppProps} from 'next/app';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../dev";
import { ChakraProvider } from '@chakra-ui/react'

export default function App({Component, pageProps}: AppProps) {
    return (
        // <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        // </DevSupport>
    );
}

import {HeadersRecord} from "../../lib/HeadersRecord";
import {ListItem, UnorderedList} from "@chakra-ui/react";

export function HeadersRecordView({headers}: {headers: HeadersRecord}) {
    return (
        <UnorderedList>
            {Object.keys(headers).map(key => headers[key].map(value =>
                <ListItem>
                    {key}: {value}
                </ListItem>
            ))}
        </UnorderedList>
    );
}

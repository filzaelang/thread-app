import CreateThread from "../feature/Thread/components/CreateThread"
import { Flex } from "@chakra-ui/react"

function CreatePost() {
    return (
        <Flex flexDirection={"column"} wrap={"wrap"} paddingLeft={"30px"} paddingRight={"30px"}>
            <CreateThread />
        </Flex>
    )
}

export default CreatePost
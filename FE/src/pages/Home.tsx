import { Heading, Flex } from "@chakra-ui/react"

//components
import CreateThread from "../feature/Thread/components/CreateThread";
import Thread from "../feature/Thread/components/Thread";


function Home() {

    return (
        <Flex flexDirection={"column"} wrap={"wrap"} paddingLeft={"30px"} paddingRight={"30px"}>
            <Heading as={"h1"} color={"white"} mb={"20px"}>Home</Heading>
            <CreateThread />
            <Thread />
        </Flex>
    )
}

export default Home
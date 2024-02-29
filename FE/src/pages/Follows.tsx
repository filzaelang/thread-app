import { Flex, Heading } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Followers, Following } from "../feature/Follow/components/Follow"

function Follows() {
    return (
        <>
            <Flex ms={"10px"} me={"10px"}>
                <Heading as={"h1"} color={"white"} mb={"20px"}>Follow</Heading>
            </Flex>
            <Tabs isFitted>
                <TabList>
                    <Tab color={"white"}>Followers</Tab>
                    <Tab color={"white"}>Following</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Followers />
                    </TabPanel>
                    <TabPanel>
                        <Following />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Follows
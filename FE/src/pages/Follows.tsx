import { Flex, Heading } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Follow } from "../feature/Follow/components/Follow"
import { useDispatch } from "react-redux"
import { SET_FOLLOW_STATE } from "../store/rootReducer"

function Follows() {
    const dispatch = useDispatch()

    return (
        <>
            <Flex ms={"10px"} me={"10px"}>
                <Heading as={"h1"} color={"white"} mb={"20px"}>Follow</Heading>
            </Flex>
            <Tabs isFitted variant='unstyled' defaultIndex={0} ms={"10px"} me={"10px"}>
                <TabList>
                    <Tab color={"white"} _selected={{ color: 'white', bg: '#262626' }} onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>Followers</Tab>
                    <Tab color={"white"} _selected={{ color: 'white', bg: '#262626' }} onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>Following</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Follow />
                    </TabPanel>
                    <TabPanel>
                        <Follow />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Follows
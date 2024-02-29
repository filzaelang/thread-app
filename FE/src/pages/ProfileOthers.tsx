import {
    Text,
    Card,
    CardBody,
    Heading,
    Flex,
    Image,
    Avatar,
    Stack,
} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { OtherUserThreads } from "../feature/Thread/components/UserThreads"
import { useProfileOthers } from "../feature/UserProfile/hooks/useProfileOthers"

function ProfileOthers() {
    const { user } = useProfileOthers()

    return (
        <>
            <Card bg="#1d1d1d" ms={"10px"} me={"10px"}>
                <CardBody bg={"#262626"} borderRadius={"20px"}>
                    <Heading as={"h3"} fontSize={"md"} color={"white"}>My Profile</Heading>
                    <Flex flexDirection='column' marginTop={"10px"} mb={4}>
                        <Image
                            borderRadius={"10px"}
                            width={"100%"}
                            height={"200px"}
                            objectFit={"cover"}
                            src='https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=900&t=st=1707182435~exp=1707183035~hmac=b0a570c2efd11753a18424e5a952eccdfbcaec5db7781bd5600c3bb1b88f3e1c'
                        />
                        <Avatar
                            size={"lg"}
                            name='Photo Profile'
                            src={user?.photo_profile ? user?.photo_profile : ''}
                            position={"relative"}
                            bottom={"30"}
                            left={"5"}
                            border={'5px solid black'}
                        />
                    </Flex>
                    <Stack spacing='0.5' marginTop={"-10"}>
                        <Text color={"white"} fontSize={"xl"} fontWeight={"bold"}>{user?.full_name}</Text>
                        <Text color={"#606060"}>@{user?.username}</Text>
                        <Text color={"white"}>{user?.description}</Text>
                        <Flex>
                            <Flex gap={3}>
                                <Flex gap={0.5}>
                                    <Text color={"white"}>{user?.following_count}</Text>
                                    <Text color={"#606060"}>Following</Text>
                                </Flex>
                                <Flex gap={0.5}>
                                    <Text color={"white"}>{user?.followers_count}</Text>
                                    <Text color={"#606060"}>Follower</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card >
            <Tabs isFitted variant='enclosed' mt={"10px"}>
                <TabList>
                    <Tab color={"white"}>Threads</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <OtherUserThreads />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ProfileOthers
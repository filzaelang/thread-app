import {
    Text,
    Card,
    Flex,
    Image,
    Box
} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { OtherUserThreads } from "../feature/Thread/components/UserThreads"
import { useProfileOthers } from "../feature/UserProfile/hooks/useProfileOthers"

function ProfileOthers() {
    const { user } = useProfileOthers()

    return (
        <>
            <Card my={2} bg={"#262626"} borderRadius={"10px"} ms={"10px"} me={"10px"}>
                <Flex
                    borderRadius="20px"
                    bg={"#262626"}
                    px="20px"
                    pt="10px"
                    direction="column"
                    h="fit-content"
                >
                    <Image
                        src={'https://img.freepik.com/free-vector/gradient-black-background-with-golden-textures_52683-76746.jpg?t=st=1712107484~exp=1712111084~hmac=777ecbf26f7d86001ca4a1b93e829fbc896dedf226ab878064a0d197d9494975&w=826'}
                        maxW="100%"
                        h={"200px"}
                        borderRadius="20px"
                        mt={"10px"}
                    />
                    <Flex w="full">
                        <Flex flexDirection="column" ms={"20px"} mb="30px" w="full" px={4} className="photo-profile">
                            <Image
                                src={user?.photo_profile}
                                border="5px solid red"
                                borderColor={"#262626"}
                                width="100px"
                                height="100px"
                                mt="-50px"
                                borderRadius="50%"
                            />
                        </Flex>
                    </Flex>
                    <Box mt={-7} mb={5}>
                        <Text fontWeight="600" color={"white"} fontSize="xl">
                            {user?.full_name}
                        </Text>
                        <Text color="gray">@{user?.username}</Text>
                        <Text color={"white"}>{user?.description}</Text>
                        <Flex gap={4} alignItems="center">
                            <Flex alignItems="center" gap={1}>
                                <Text fontWeight="bold" fontSize={"15px"} color={"white"}>
                                    {user?.following_count ? user?.following_count : 0}
                                </Text>
                                <Text fontSize="14px" color={"#606060"}>
                                    Following
                                </Text>
                            </Flex>

                            <Flex alignItems="center" gap={1}>
                                <Text fontWeight="bold" fontSize={"15px"} color={"white"}>
                                    {user?.followers_count ? user?.followers_count : 0}
                                </Text>
                                <Text fontSize="14px" color={"#606060"}>
                                    Follower
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Card >
            <Tabs isFitted variant='unstyled' mt={"10px"} ms={"10px"} me={"10px"}>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: '#262626' }} color={"white"}>Threads</Tab>
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
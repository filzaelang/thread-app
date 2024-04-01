import {
    Text,
    Card,
    Flex,
    Image,
    Button,
    Box,
    useDisclosure,
    Input
} from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import EditProfile from "../feature/UserProfile/components/EditProfile"
import { UserThreads } from "../feature/Thread/components/UserThreads"
import { useSelector } from "react-redux"
import { RootState } from "../store/types/rootStates"
import { useEditPP } from "../feature/UserProfile/hooks/useEditPP"


function Profile() {
    const user = useSelector((state: RootState) => state.auth.data)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { fileInputRef, handleChange, handleUpdatePP } = useEditPP()

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"#262626"}>
                    <ModalHeader color={"white"}>Change Profile Picture</ModalHeader>
                    <ModalCloseButton color={"white"} />
                    <form onSubmit={handleUpdatePP} encType="multipart/form-data">
                        <ModalBody>
                            <Input
                                id="photo_profile"
                                name='photo_profile'
                                type="file"
                                accept="image/*"
                                color={"white"}
                                onChange={handleChange}
                                ref={fileInputRef}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='whiteAlpha' variant='outline' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme="teal" variant='solid' type='submit' onClick={onClose}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <Card my={2} bg={"#262626"} borderRadius={"10px"} ms={"10px"} me={"10px"}>
                <Flex
                    borderRadius="20px"
                    bg={"#262626"}
                    px="20px"
                    pt="10px"
                    direction="column"
                    h="fit-content"
                >
                    <Text my={1} fontSize={18} fontWeight="bold" color={"white"}>
                        My Profile
                    </Text>
                    <Image
                        src={user.background_image ? user.background_image : 'https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=900&t=st=1707182435~exp=1707183035~hmac=b0a570c2efd11753a18424e5a952eccdfbcaec5db7781bd5600c3bb1b88f3e1c'}
                        maxW="100%"
                        h={"200px"}
                        borderRadius="20px"
                    />
                    <Flex w="full">
                        <Flex flexDirection="column" ms={"20px"} mb="30px" w="full" px={4} className="photo-profile">
                            <Image
                                src={user.photo_profile}
                                border="5px solid red"
                                borderColor={"#262626"}
                                width="100px"
                                height="100px"
                                mt="-50px"
                                borderRadius="50%"
                                onClick={onOpen}
                                sx={{
                                    '.photo-profile:hover &': {
                                        filter: 'blur(8px)',
                                    },
                                }}
                            />
                        </Flex>
                    </Flex>
                    <Box mt={-7} mb={5}>
                        <Text fontWeight="600" color={"white"} fontSize="xl">
                            {user.full_name}
                        </Text>
                        <Text color="gray">@{user.username}</Text>
                        <Text color={"white"}>{user.description}</Text>
                        <Flex gap={4} alignItems="center">
                            <Flex alignItems="center" gap="2px">
                                <Text fontWeight="bold" fontSize={"15px"} color={"white"}>
                                    {user.following_count ? user.following_count : 0}
                                </Text>
                                <Text fontSize="14px" color={"#606060"}>
                                    Following
                                </Text>
                            </Flex>

                            <Flex alignItems="center" gap="2px">
                                <Text fontWeight="bold" fontSize={"15px"} color={"white"}>
                                    {user.followers_count ? user.followers_count : 0}
                                </Text>
                                <Text fontSize="14px" color={"#606060"}>
                                    Follower
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Card >
            <Tabs isFitted variant='enclosed' mt={"10px"}>
                <TabList>
                    <Tab color={"white"}>Threads</Tab>
                    <Tab color={"white"}>Edit Profile</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel onClick={() => window.location.reload()}>
                        <UserThreads />
                    </TabPanel>
                    <TabPanel>
                        <Card bg="#1d1d1d" ms={"10px"} me={"10px"}>
                            <EditProfile />
                        </Card >
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Profile
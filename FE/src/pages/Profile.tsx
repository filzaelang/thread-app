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
import { useEditBg } from "../feature/UserProfile/hooks/useEditBg"


function Profile() {
    const user = useSelector((state: RootState) => state.auth.data)
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    // const { isOpen: isBgOpen, onOpen: onBgOpen, onClose: onBgClose } = useDisclosure();
    const { fileInputRef, handleChange, handleUpdatePP } = useEditPP()
    // const { fileBgInputRef, handleBgChange, handleUpdateBg } = useEditBg()

    return (
        <>
            <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
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
                            <Button colorScheme='whiteAlpha' variant='outline' mr={3} onClick={onProfileClose}>
                                Close
                            </Button>
                            <Button colorScheme="teal" variant='solid' type='submit' onClick={onProfileClose}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            {/* <Modal isOpen={isBgOpen} onClose={onBgClose}>
                <ModalOverlay />
                <ModalContent bg={"#262626"}>
                    <ModalHeader color={"white"}>Change Background Picture</ModalHeader>
                    <ModalCloseButton color={"white"} />
                    <form onSubmit={handleUpdateBg} encType="multipart/form-data">
                        <ModalBody>
                            <Input
                                id="background_image"
                                name='background_image'
                                type="file"
                                accept="image/*"
                                color={"white"}
                                onChange={handleBgChange}
                                ref={fileBgInputRef}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='whiteAlpha' variant='outline' mr={3} onClick={onBgClose}>
                                Close
                            </Button>
                            <Button colorScheme="teal" variant='solid' type='submit' onClick={onBgClose}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal> */}

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
                        src={'https://img.freepik.com/free-vector/gradient-black-background-with-golden-textures_52683-76746.jpg?t=st=1712107484~exp=1712111084~hmac=777ecbf26f7d86001ca4a1b93e829fbc896dedf226ab878064a0d197d9494975&w=826'}
                        maxW="100%"
                        h={"200px"}
                        borderRadius="20px"
                    // onClick={onBgOpen}
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
                                onClick={onProfileOpen}
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
                            <Flex alignItems="center" gap={1}>
                                <Text fontWeight="bold" fontSize={"15px"} color={"white"}>
                                    {user.following_count ? user.following_count : 0}
                                </Text>
                                <Text fontSize="14px" color={"#606060"}>
                                    Following
                                </Text>
                            </Flex>

                            <Flex alignItems="center" gap={1}>
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
            <Tabs isFitted variant='unstyled' m={"10px"} defaultIndex={0}>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: '#262626' }} color={"white"}>Threads</Tab>
                    <Tab _selected={{ color: 'white', bg: '#262626' }} color={"white"}>Edit Profile</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
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
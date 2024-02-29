import { Heading, Flex, Image, Text } from '@chakra-ui/react'
import { Card, CardBody, Stack, Button, Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types/rootStates'

function MyProfile() {
    const user = useSelector((state: RootState) => state.auth)

    return (

        <Card bg="#1d1d1d" >
            <CardBody bg={"#262626"} borderRadius={"20px"}>
                <Heading as={"h3"} fontSize={"md"} color={"white"}>My Profile</Heading>
                <Flex flexDirection='column' marginTop={"10px"} mb={4}>
                    <Image
                        borderRadius={"10px"}
                        width={"100%"}
                        height={"80px"}
                        objectFit={"cover"}
                        src='https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?w=900&t=st=1707182435~exp=1707183035~hmac=b0a570c2efd11753a18424e5a952eccdfbcaec5db7781bd5600c3bb1b88f3e1c'
                    />
                    <Avatar
                        size={"lg"}
                        name='Photo Profile'
                        src={user.data.photo_profile ? user.data.photo_profile : ''}
                        position={"relative"}
                        bottom={"30"}
                        left={"5"}
                        border={'5px solid black'}
                    />
                </Flex>
                <Stack spacing='0.5' marginTop={"-10"}>
                    <Button
                        backgroundColor="#1d1d1d"
                        border={'2px solid white'}
                        borderRadius={"10px"}
                        height={"20px"}
                        bottom={"0"}
                        ml="auto"
                    >
                        <Text fontSize={"10px"} color={"white"}>Edit Profile</Text>
                    </Button>
                    <Text color={"white"} fontSize={"xl"} fontWeight={"bold"}>{user.data.full_name}</Text>
                    <Text color={"#606060"}>@{user.data.username}</Text>
                    <Text color={"white"}>{user.data.description}</Text>
                    <Flex>
                        <Flex gap={3}>
                            <Flex gap={0.5}>
                                <Text color={"white"}>{user.data.following_count}</Text>
                                <Text color={"#606060"}>Following</Text>
                            </Flex>
                            <Flex gap={0.5}>
                                <Text color={"white"}>{user.data.followers_count}</Text>
                                <Text color={"#606060"}>Follower</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Stack>
            </CardBody>
        </Card >
    )
}

export default MyProfile
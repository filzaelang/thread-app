import {
    Box,
    Button,
    Card,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types/rootStates";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const user = useSelector((state: RootState) => state.auth.data)

    return (
        <Card my={2} bg={"#262626"} borderRadius={"10px"}>
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
                <Image src={'https://img.freepik.com/free-vector/gradient-black-background-with-golden-textures_52683-76746.jpg?t=st=1712107484~exp=1712111084~hmac=777ecbf26f7d86001ca4a1b93e829fbc896dedf226ab878064a0d197d9494975&w=826'} maxW="100%" h={"100px"} borderRadius="20px" />
                <Flex w="full">
                    <Flex flexDirection="column" mb="30px" w="full" px={4}>
                        <Image
                            src={user.photo_profile}
                            border="5px solid red"
                            borderColor={"#262626"}
                            width="68px"
                            height="68px"
                            mt="-38px"
                            borderRadius="50%"
                        />
                    </Flex>
                    <Link to={`/profile`}>
                        <Button
                            fontSize="13px"
                            fontWeight="bold"
                            bg="transparent"
                            border="1px"
                            my="5px"
                            h="30px"
                            rounded="16px"
                        >
                            <Text color={"white"}>
                                Edit Profile
                            </Text>
                        </Button>
                    </Link>
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
        </Card>
    );
};

export default MyProfile;
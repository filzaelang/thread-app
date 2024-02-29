import { Text, Image, Flex, Divider, Box, Avatar } from '@chakra-ui/react'
import { IThreadCard } from '../../../interface/ThreadInterface';
import { useThreads } from '../hooks/useThreads';
import { useUserThreads } from '../hooks/useUserThreads';

//icon
import { TbPointFilled } from "react-icons/tb";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export function UserThreads() {
    const { updateLikesCount } = useThreads()
    const { userThreads } = useUserThreads()
    const navigate = useNavigate()

    return (
        <>
            {
                userThreads?.data.map((data: IThreadCard) => (
                    <Box key={data.id}>
                        <Divider />
                        <Flex gap={3} mt={"10px"} mb={"10px"}>
                            {/* image */}
                            <Avatar
                                size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                                src={''}
                            />
                            {/* Thread */}
                            <Flex flexDirection={"column"}>
                                <Flex alignItems={"center"} gap={1}>
                                    <Text color="white" fontWeight="bold" fontSize={"14px"}>{data.created_by?.full_name}</Text>
                                    <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
                                    <TbPointFilled color="#606060" fontSize={"14px"} />
                                    <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
                                </Flex>
                                <Text color={"white"}>{data.content}</Text>
                                {data.image && <Image src={data.image} />}
                                <Flex gap={3}>
                                    <Flex gap={0.5} alignItems={"center"}>
                                        <Text
                                            onClick={() => updateLikesCount(data.id, data.is_liked)}
                                        >
                                            <FaHeart color={data.is_liked ? "red" : "grey"} />
                                        </Text>
                                        <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
                                    </Flex>
                                    <Flex gap={0.5} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
                                        <BiMessageAltDetail color="#606060" />
                                        <Text color="#606060" fontSize={"14px"}>{data.number_of_replies}</Text>
                                        <Text color="#606060" fontSize={"14px"}>Replies</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Divider />
                    </Box>
                ))
            }

        </>
    )
}

export function OtherUserThreads() {
    const { updateLikesCount } = useThreads()
    const { otherUserThreads } = useUserThreads()
    const navigate = useNavigate()

    return (
        <>
            {
                otherUserThreads?.map((data: IThreadCard) => (
                    <Box key={data.id}>
                        <Divider />
                        <Flex gap={3} mt={"10px"} mb={"10px"}>
                            {/* image */}
                            <Avatar
                                size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                                src={''}
                            />
                            {/* Thread */}
                            <Flex flexDirection={"column"}>
                                <Flex alignItems={"center"} gap={1}>
                                    <Text color="white" fontWeight="bold" fontSize={"14px"}>{data.created_by?.full_name}</Text>
                                    <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
                                    <TbPointFilled color="#606060" fontSize={"14px"} />
                                    <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
                                </Flex>
                                <Text color={"white"}>{data.content}</Text>
                                {data.image && <Image src={data.image} />}
                                <Flex gap={3}>
                                    <Flex gap={0.5} alignItems={"center"}>
                                        <Text
                                            onClick={() => updateLikesCount(data.id, data.is_liked)}
                                        >
                                            <FaHeart color={data.is_liked ? "red" : "grey"} />
                                        </Text>
                                        <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
                                    </Flex>
                                    <Flex gap={0.5} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
                                        <BiMessageAltDetail color="#606060" />
                                        <Text color="#606060" fontSize={"14px"}>{data.number_of_replies}</Text>
                                        <Text color="#606060" fontSize={"14px"}>Replies</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Divider />
                    </Box>
                ))
            }

        </>
    )
}

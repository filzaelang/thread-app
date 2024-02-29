import { Box, Divider, Avatar, Flex, Text, Image } from '@chakra-ui/react'
import { useReply } from '../hooks/useReply';
import { IReply } from '../../../interface/ReplyInterface';

//icon
import { TbPointFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";

interface RepliesProps {
    id: number;
}

export default function Replies({ id }: RepliesProps) {
    const { replies, updateLikesCount, isLiked } = useReply(id)

    return (
        <>
            {replies?.data.map((data: IReply) => (
                <Box key={data.id}>
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
                                <Text
                                    onClick={() => updateLikesCount(data.id, isLiked)}
                                >
                                    <FaHeart color={isLiked ? "red" : "grey"} />
                                </Text>
                                <Text color="#606060" fontSize={"14px"}>30</Text>
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

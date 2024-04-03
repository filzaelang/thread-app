import { Box, Card, Flex, Avatar, Text, Spacer, Image } from '@chakra-ui/react'
import { IThreadCard } from '../interface/ThreadInterface'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store/types/rootStates';
import { API, setAuthTokenLogin } from '../libs/api';
import { SET_THREADS_LIKES } from '../store/rootReducer';
import { useEffect } from 'react';

//icon
import { TbPointFilled } from "react-icons/tb";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";


interface thread {
    data: IThreadCard
}

export default function ManyThreads(props: thread) {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.data)
    setAuthTokenLogin(localStorage.token)
    const dispatch = useDispatch()

    async function updateLikesCount(id: number, is_liked: boolean) {
        try {
            if (!is_liked) {
                await API.post("/like", { thread_id: id })
            } else if (is_liked) {
                await API.delete(`/like/${id}`)
            }
            dispatch(SET_THREADS_LIKES({ id: id, is_liked: is_liked }))
        } catch (error) {
            console.error("Error updating likes count:", error);
            throw error
        }
    }

    useEffect(() => {

    }, [dispatch])

    return (
        <Box key={props.data.id}>
            <Card my={2} bg={"#262626"} borderRadius={"10px"} padding={"10px"}>
                <Flex gap={3} mt={"10px"} mb={"10px"}>
                    <Flex width={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}>
                        {/* image */}
                        <Avatar
                            size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                            src={props.data.created_by?.photo_profile ? props.data.created_by?.photo_profile : ''}
                        />
                    </Flex>
                    {/* Thread */}
                    <Flex flexDirection={"column"} gap={2}>
                        <Flex alignItems={"center"} gap={1}>
                            <Text
                                onClick={() => navigate(`/profile/${props.data.created_by?.id}`)}
                                color="white"
                                fontWeight="bold"
                                fontSize={"14px"}>
                                {props.data.created_by?.full_name}
                            </Text>
                            <Text color="#606060" fontSize={"14px"}>@{props.data.created_by?.username}</Text>
                            <TbPointFilled color="#606060" fontSize={"14px"} />
                            <Text color="#606060" fontSize={"14px"}>{props.data.created_at}</Text>
                        </Flex>
                        <Text color={"white"}>{props.data.content}</Text>
                        {props.data.image &&
                            <Flex width={"90%"}>
                                <Image src={props.data.image} borderRadius={"10px"} />
                            </Flex>
                        }
                        <Flex gap={3}>
                            <Flex gap={1} alignItems={"center"}>
                                <Text
                                    onClick={() => updateLikesCount(props.data.id, props.data.is_liked)}
                                >
                                    <FaHeart color={props.data.is_liked ? "red" : "grey"} />
                                </Text>
                                <Text color="#606060" fontSize={"14px"}>{props.data.number_of_likes}</Text>
                            </Flex>
                            <Flex gap={1} alignItems={"center"} onClick={() => navigate(`/thread/${props.data.id}`)}>
                                <BiMessageAltDetail color="#606060" />
                                <Text color="#606060" fontSize={"14px"}>{props.data.number_of_replies} Replies</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Spacer />
                    {props.data.created_by?.id === user.id &&
                        <Flex me={"10px"}>
                            <Text color={"white"}>
                                <BsThreeDots />
                            </Text>
                        </Flex>
                    }
                </Flex>
            </Card>
        </Box>
    )
}

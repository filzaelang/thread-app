import { Text, Image, Flex, Box, Avatar, Card, Spacer, } from '@chakra-ui/react'
import { IThreadCard } from '../../../interface/ThreadInterface';
import { useUserThreads } from '../hooks/useUserThreads';
import { useOtherUserThreads } from '../hooks/useOtherUserThreads';
import { RootState } from '../../../store/types/rootStates';
import { useSelector } from "react-redux";

//icon
import { TbPointFilled } from "react-icons/tb";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";



export function UserThreads() {
    const user = useSelector((state: RootState) => state.auth.data)
    const { userThreads, updateLikesCount } = useUserThreads()
    const navigate = useNavigate()
    return (
        <>
            {
                userThreads?.data.map((data: IThreadCard) => (
                    <Box key={data.id}>
                        <Card my={2} bg={"#262626"} borderRadius={"10px"} padding={"10px"}>
                            <Flex gap={3} mt={"10px"} mb={"10px"}>
                                <Flex width={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}>
                                    {/* image */}
                                    <Avatar
                                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                                        src={data.created_by?.photo_profile ? data.created_by?.photo_profile : ''}
                                    />
                                </Flex>
                                {/* Thread */}
                                <Flex flexDirection={"column"} gap={2}>
                                    <Flex alignItems={"center"} gap={1}>
                                        <Text
                                            onClick={() => navigate(`/profile/${data.created_by?.id}`)}
                                            color="white"
                                            fontWeight="bold"
                                            fontSize={"14px"}>
                                            {data.created_by?.full_name}
                                        </Text>
                                        <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
                                        <TbPointFilled color="#606060" fontSize={"14px"} />
                                        <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
                                    </Flex>
                                    <Text color={"white"}>{data.content}</Text>
                                    {data.image &&
                                        <Flex width={"90%"}>
                                            <Image src={data.image} borderRadius={"10px"} />
                                        </Flex>
                                    }
                                    <Flex gap={3}>
                                        <Flex gap={1} alignItems={"center"}>
                                            <Text
                                                onClick={() => updateLikesCount(data.id, data.is_liked)}
                                            >
                                                <FaHeart color={data.is_liked ? "red" : "grey"} />
                                            </Text>
                                            <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
                                        </Flex>
                                        <Flex gap={1} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
                                            <BiMessageAltDetail color="#606060" />
                                            <Text color="#606060" fontSize={"14px"}>{data.number_of_replies} Replies</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Spacer />
                                {data.created_by?.id === user.id &&
                                    <Flex me={"10px"}>
                                        <Text color={"white"}>
                                            <BsThreeDots />
                                        </Text>
                                    </Flex>
                                }
                            </Flex>
                        </Card>
                    </Box>
                ))
            }

        </>
    )
}

export function OtherUserThreads() {
    const { otherUserThreads, updateLikesCount } = useOtherUserThreads()
    const navigate = useNavigate()
    return (
        <>
            {
                otherUserThreads?.data.map((data: IThreadCard) => (
                    <Box key={data.id}>
                        <Card my={2} bg={"#262626"} borderRadius={"10px"} padding={"10px"}>
                            <Flex gap={3} mt={"10px"} mb={"10px"}>
                                <Flex width={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}>
                                    {/* image */}
                                    <Avatar
                                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                                        src={data.created_by?.photo_profile ? data.created_by?.photo_profile : ''}
                                    />
                                </Flex>
                                {/* Thread */}
                                <Flex flexDirection={"column"} gap={2}>
                                    <Flex alignItems={"center"} gap={1}>
                                        <Text
                                            onClick={() => navigate(`/profile/${data.created_by?.id}`)}
                                            color="white"
                                            fontWeight="bold"
                                            fontSize={"14px"}>
                                            {data.created_by?.full_name}
                                        </Text>
                                        <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
                                        <TbPointFilled color="#606060" fontSize={"14px"} />
                                        <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
                                    </Flex>
                                    <Text color={"white"}>{data.content}</Text>
                                    {data.image &&
                                        <Flex width={"90%"}>
                                            <Image src={data.image} borderRadius={"10px"} />
                                        </Flex>
                                    }
                                    <Flex gap={3}>
                                        <Flex gap={1} alignItems={"center"}>
                                            <Text
                                                onClick={() => updateLikesCount(data.id, data.is_liked)}
                                            >
                                                <FaHeart color={data.is_liked ? "red" : "grey"} />
                                            </Text>
                                            <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
                                        </Flex>
                                        <Flex gap={1} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
                                            <BiMessageAltDetail color="#606060" />
                                            <Text color="#606060" fontSize={"14px"}>{data.number_of_replies} Replies</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Spacer />
                            </Flex>
                        </Card>
                    </Box>
                ))
            }

        </>
    )
}

// import { Text, Image, Flex, Divider, Box, Avatar } from '@chakra-ui/react'
// import { IThreadCard } from '../../../interface/ThreadInterface';
// import { useThreads } from '../hooks/useThreads';
// import { useUserThreads } from '../hooks/useUserThreads';
// import { useOtherUserThreads } from '../hooks/useOtherUserThreads';

// //icon
// import { TbPointFilled } from "react-icons/tb";
// import { BiMessageAltDetail } from "react-icons/bi";
// import { FaHeart } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// export function UserThreads() {
//     const { updateLikesCount } = useThreads()
//     const { userThreads } = useUserThreads()
//     const navigate = useNavigate()

//     return (
//         <>
//             {
//                 userThreads?.data.map((data: IThreadCard) => (
//                     <Box key={data.id}>
//                         <Divider />
//                         <Flex gap={3} mt={"10px"} mb={"10px"}>
//                             {/* image */}
//                             <Avatar
//                                 size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
//                                 src={data.created_by?.photo_profile ? data.created_by?.photo_profile : ""}
//                             />
//                             {/* Thread */}
//                             <Flex flexDirection={"column"}>
//                                 <Flex alignItems={"center"} gap={1}>
//                                     <Text color="white" fontWeight="bold" fontSize={"14px"}>{data.created_by?.full_name}</Text>
//                                     <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
//                                     <TbPointFilled color="#606060" fontSize={"14px"} />
//                                     <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
//                                 </Flex>
//                                 <Text color={"white"}>{data.content}</Text>
//                                 {data.image && <Image src={data.image} />}
//                                 <Flex gap={3}>
//                                     <Flex gap={0.5} alignItems={"center"}>
//                                         <Text
//                                             onClick={() => updateLikesCount(data.id, data.is_liked)}
//                                         >
//                                             <FaHeart color={data.is_liked ? "red" : "grey"} />
//                                         </Text>
//                                         <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
//                                     </Flex>
//                                     <Flex gap={0.5} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
//                                         <BiMessageAltDetail color="#606060" />
//                                         <Text color="#606060" fontSize={"14px"}>{data.number_of_replies}</Text>
//                                         <Text color="#606060" fontSize={"14px"}>Replies</Text>
//                                     </Flex>
//                                 </Flex>
//                             </Flex>
//                         </Flex>
//                         <Divider />
//                     </Box>
//                 ))
//             }

//         </>
//     )
// }

// export function OtherUserThreads() {
//     const { updateLikesCount } = useThreads()
//     const { otherUserThreads } = useOtherUserThreads()
//     const navigate = useNavigate()

//     return (
//         <>
//             {
//                 otherUserThreads?.map((data: IThreadCard) => (
//                     <Box key={data.id}>
//                         <Divider />
//                         <Flex gap={3} mt={"10px"} mb={"10px"}>
//                             {/* image */}
//                             <Avatar
//                                 size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
//                                 src={data.created_by?.photo_profile}
//                             />
//                             {/* Thread */}
//                             <Flex flexDirection={"column"}>
//                                 <Flex alignItems={"center"} gap={1}>
//                                     <Text color="white" fontWeight="bold" fontSize={"14px"}>{data.created_by?.full_name}</Text>
//                                     <Text color="#606060" fontSize={"14px"}>@{data.created_by?.username}</Text>
//                                     <TbPointFilled color="#606060" fontSize={"14px"} />
//                                     <Text color="#606060" fontSize={"14px"}>{data.created_at}</Text>
//                                 </Flex>
//                                 <Text color={"white"}>{data.content}</Text>
//                                 {data.image && <Image src={data.image} />}
//                                 <Flex gap={3}>
//                                     <Flex gap={0.5} alignItems={"center"}>
//                                         <Text
//                                             onClick={() => updateLikesCount(data.id, data.is_liked)}
//                                         >
//                                             <FaHeart color={data.is_liked ? "red" : "grey"} />
//                                         </Text>
//                                         <Text color="#606060" fontSize={"14px"}>{data.number_of_likes}</Text>
//                                     </Flex>
//                                     <Flex gap={0.5} alignItems={"center"} onClick={() => navigate(`/thread/${data.id}`)}>
//                                         <BiMessageAltDetail color="#606060" />
//                                         <Text color="#606060" fontSize={"14px"}>{data.number_of_replies}</Text>
//                                         <Text color="#606060" fontSize={"14px"}>Replies</Text>
//                                     </Flex>
//                                 </Flex>
//                             </Flex>
//                         </Flex>
//                         <Divider />
//                     </Box>
//                 ))
//             }

//         </>
//     )
// }


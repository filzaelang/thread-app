import { Box, Flex, Divider, Avatar, Text, Image } from '@chakra-ui/react'
import { Grid, GridItem, FormControl, Input, Button } from '@chakra-ui/react';
import { useDetailThreads } from '../feature/Thread/hooks/useDetailThreads';
import { IReply } from '../interface/ReplyInterface';
import { RootState } from '../store/types/rootStates';
import { useSelector } from 'react-redux'

//icon
import { BiMessageAltDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { TbPointFilled } from "react-icons/tb";
import { useEffect, useState } from 'react';

export default function ThreadDetail() {
    const {
        updateLikesCount,
        thread,
        fileInputRef,
        handleChange,
        handlePostReply,
        replies, isLiked,
        handleNavigate
    } = useDetailThreads()

    const [randomNumber, setRandomNumber] = useState<number>(0);
    const user = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 100));
    }, []);

    return (
        <Flex flexDirection={"column"} wrap={"wrap"}>
            <Box key={thread?.id} marginLeft={"10px"} marginRight={"10px"} width={"100%"}>
                <Flex gap={3} mt={"10px"} mb={"10px"}>
                    {/* image */}
                    <Avatar
                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                        src={thread?.created_by?.photo_profile}
                    />
                    {/* Thread */}
                    <Flex flexDirection={"column"}>
                        <Flex flexDirection={"column"} mb={"10px"}>
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize={"14px"}
                                onClick={() => handleNavigate(thread?.created_by?.id)}
                            >
                                {thread?.created_by?.full_name}
                            </Text>
                            <Text color="#606060" fontSize={"14px"}>@{thread?.created_by?.username}</Text>
                            {/* <TbPointFilled color="#606060" fontSize={"14px"} />
                        <Text color="#606060" fontSize={"14px"}>{oneThread.data.created_at}</Text> */}
                        </Flex>
                        <Text color={"white"}>{thread?.content}</Text>
                        {thread?.image && <Image src={thread?.image} />}
                        <Text color={"white"}>{thread?.created_at}</Text>
                        <Flex gap={3}>
                            <Flex gap={0.5} alignItems={"center"}>
                                <Text
                                    onClick={() => updateLikesCount(thread?.id, thread?.is_liked)}
                                >
                                    <FaHeart color={thread?.is_liked ? "red" : "grey"} />
                                </Text>
                                <Text color="#606060" fontSize={"14px"}>{thread?.number_of_likes}</Text>
                            </Flex>
                            <Flex gap={0.5} alignItems={"center"}>
                                <BiMessageAltDetail color="#606060" />
                                <Text color="#606060" fontSize={"14px"}>{thread?.number_of_replies}</Text>
                                <Text color="#606060" fontSize={"14px"}>Replies</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Divider />
            <Grid templateColumns="repeat(12, 1fr)" mt={'15px'} mb={"15px"} ms={"10px"} me={"10px"} alignItems={"center"}>
                {/* image */}

                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} padding="0" position="relative" zIndex={1}>
                    <Avatar
                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                        src={user.data.photo_profile ? user.data.photo_profile : ''}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 11, lg: 11, xl: 11 }} position="relative" zIndex={2}>
                    <form onSubmit={handlePostReply} encType='multipart/form-data'>
                        <FormControl>
                            <Grid
                                templateColumns="repeat(12, 1fr)"
                                gap={4}
                            >
                                {/* Input */}
                                <GridItem colSpan={{ base: 9, lg: 9, xl: 9 }} position="relative">
                                    <Input
                                        placeholder='Type yor reply!'
                                        name='content'
                                        id='content'
                                        color={"white"}
                                        onChange={handleChange}
                                    />
                                </GridItem>

                                {/* Image */}
                                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
                                    <label htmlFor="image">
                                        <LuImagePlus color='04a51e' fontSize={40} />
                                    </label>
                                    <Input
                                        id="image"
                                        name='image'
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                        ref={fileInputRef}
                                    />
                                </GridItem>

                                {/* Button Post */}
                                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
                                    <Button
                                        colorScheme="orange"
                                        padding="20px"
                                        backgroundColor="#04a51e"
                                        borderRadius={100}
                                        type='submit'
                                    >
                                        <Text>Post</Text>
                                    </Button>
                                </GridItem>
                            </Grid>
                        </FormControl>
                    </form>
                </GridItem>
            </Grid >
            <Divider />
            {replies?.map((data: IReply) => (
                <Box key={data.id} ms={"10px"} me={"10px"}>
                    <Flex gap={3} mt={"10px"} mb={"10px"}>
                        {/* image */}
                        <Avatar
                            size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                            src={data.created_by?.photo_profile}
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
                            <Flex gap={3} alignItems={"center"}>
                                <Text
                                    onClick={() => updateLikesCount(data.id, isLiked)}
                                >
                                    <FaHeart color={isLiked ? "red" : "grey"} />
                                </Text>
                                <Text color="#606060" fontSize={"14px"}>{randomNumber}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider />
                </Box>
            ))
            }
        </Flex>
    )
}

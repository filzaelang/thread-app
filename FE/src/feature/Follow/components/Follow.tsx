import { Flex, Avatar, Spacer, Button, Text } from '@chakra-ui/react'
import useFollow from '../hooks/useFollow'
import { IFollow } from '../../../interface/FollowInterface'


export function Follow() {
    const { follow, handleFollow } = useFollow()
    console.log(follow)

    return (
        <>
            {follow?.map((data: IFollow) => (
                <Flex gap={3} mt={"15px"} mb={"15px"} key={data.id}>
                    {/* image */}
                    <Avatar
                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                        src={data.photo_profile ? data.photo_profile : ""}
                    />
                    <Flex flexDirection={"column"}>
                        <Text color={"white"}>{data.full_name}</Text>
                        <Text color={"grey"}>@{data.username}</Text>
                        <Text color={"white"}>{data.description}</Text>
                    </Flex>
                    <Spacer />
                    <Button onClick={() => handleFollow(data.user_id, data.is_followed)}>{data.is_followed ? "Following" : "Follow"}</Button>
                </Flex>
            ))}
        </>
    )
}
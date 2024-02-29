import { Flex, Avatar, Spacer, Button, Text } from '@chakra-ui/react'
import useFollow from '../hooks/useFollow'
import { IFollower, IFollowing } from '../../../interface/FollowInterface'


export function Followers() {
    const { followers, handleFollowFollowers } = useFollow()

    return (
        <>
            {followers?.map((data: IFollower) => (
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
                    <Button onClick={() => handleFollowFollowers(data.follower_id, data.is_followed)}>{data.is_followed ? "Following" : "Follow"}</Button>
                </Flex>
            ))}
        </>
    )
}

export function Following() {
    const { followings, handleFollowFollowings } = useFollow()
    return (
        <>
            {
                followings?.map((following: IFollowing) => (
                    <Flex gap={3} mt={"15px"} mb={"15px"} key={following.id}>
                        {/* image */}
                        <Avatar
                            size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                            src={following.photo_profile ? following.photo_profile : ""}
                        />
                        <Flex flexDirection={"column"}>
                            <Text color={"white"}>{following.full_name}</Text>
                            <Text color={"grey"}>@{following.username}</Text>
                            <Text color={"white"}>{following.description}</Text>
                        </Flex>
                        <Spacer />
                        <Button onClick={() => handleFollowFollowings(following.following_id, following.is_followed)}>{following.is_followed ? "Following" : "Follow"}</Button>
                    </Flex>
                ))
            }
        </>
    )
}

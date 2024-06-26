import { Flex, Text, Spacer } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import { useSugestedAccount } from '../hooks/useSugestedAccount'
import { IUserSugested } from '../../../interface/UserInterface'

function SugestedAccount() {

    const { sugestedAccount, handleFollow } = useSugestedAccount()

    return (
        <>
            {
                sugestedAccount?.map((data: IUserSugested) => (
                    <Flex bg={"#262626"} wrap={"wrap"} alignItems={"center"} key={data.id}>
                        <Avatar
                            size={"sm"}
                            name='photo profile'
                            src={data.photo_profile ? data.photo_profile : 'https://www.bodyandsoulhealthclub.com/wp-content/uploads/2019/01/null-user.jpg'}
                        />
                        <Flex flexDirection={'column'} gap={0}>
                            <Text color={"white"}>{data.full_name}</Text>
                            <Text color={"#606060"}>@{data.username}</Text>
                        </Flex>
                        <Spacer />
                        <Button
                            onClick={() => handleFollow(data.id, data.is_followed)}
                            backgroundColor="#1d1d1d"
                            border={'2px solid white'}
                            borderRadius={"10px"}
                        >
                            <Text color={"white"}>{data.is_followed ? "Folloing" : "Follow"}</Text>
                        </Button>
                    </Flex>
                ))
            }
        </>

    )
}

export default SugestedAccount
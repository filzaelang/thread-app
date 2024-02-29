import { Flex, Text, Spacer } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'

function SugestedAccount() {
    return (
        <Flex bg={"#262626"} wrap={"wrap"} alignItems={"center"}>

            <Avatar
                size={"sm"}
                name='photo profile'
                src='https://bit.ly/dan-abramov'
            />

            <Flex flexDirection={'column'} gap={0}>
                <Text color={"white"}>Mohammed Jawahir</Text>
                <Text color={"#606060"}>@em.jawahir</Text>
            </Flex>
            <Spacer />
            <Button
                backgroundColor="#1d1d1d"
                border={'2px solid white'}
                borderRadius={"10px"}
            >
                <Text color={"white"}>Follow</Text>
            </Button>
        </Flex>
    )
}

export default SugestedAccount
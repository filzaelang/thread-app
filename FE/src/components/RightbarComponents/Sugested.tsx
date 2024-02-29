import { Heading } from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/react'

//components
import SugestedAccount from '../../feature/SugestedAccount/components/SugestedAccount'

function Sugested() {
    return (
        <Card bg="#1d1d1d" mt={"20px"}>
            <CardBody bg={"#262626"} borderRadius={"10px"}>
                <Heading as={"h3"} fontSize={"md"} color={"white"} marginBottom={"10px"}>Sugested for you</Heading>
                <SugestedAccount />
                <SugestedAccount />
                <SugestedAccount />
            </CardBody>
        </Card>
    )
}

export default Sugested
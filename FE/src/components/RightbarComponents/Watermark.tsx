import { Flex, Text } from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/react'

//icons
import { TbPointFilled } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function Watermark() {
    return (
        <Card bg={"#262626"} mt={"20px"} mb={"5px"} borderRadius={"10px"}>
            <CardBody>
                <Flex flexDirection={'column'}>
                    <Flex flexDirection={"row"} gap={1} alignItems={"center"}>
                        <Text color={"white"} fontSize={"medium"}>Developed by</Text>
                        <Text fontWeight={"bold"} color={"white"}>Filza</Text>
                        <TbPointFilled color='#b2b2b2' />
                        <FaGithub color='#b2b2b2' />
                        <FaLinkedin color='#b2b2b2' />
                        <FaFacebook color='#b2b2b2' />
                        <AiFillInstagram color='#b2b2b2' />
                    </Flex>
                    <Flex flexDirection={"row"} gap={1}>
                        <Text color={"#686868"}>Powered by Dumbways Indonesia #1 Coding Bootcamp</Text>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default Watermark
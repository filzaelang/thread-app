import { Heading, Input, Text, Button, Flex } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { FormControl } from '@chakra-ui/react'
import { useRegister } from "../hooks/useRegister"

function FormRegister() {

    const { handleChange, handleRegister } = useRegister();

    return (
        <>
            <Heading color={"#04a51e"} fontWeight={"Bold"} mb={3}>circle</Heading>
            <Text color={"white"} fontSize={"larger"} fontWeight={"bold"} mb={3}>Create account Circle</Text>
            <FormControl isRequired>
                <Input id="fullname" name="full_name" type="text" placeholder="Full Name" mb={2}
                    onChange={handleChange} color={"white"}
                />
                <Input id="username" name="username" type="text" placeholder="Username" mb={2}
                    onChange={handleChange} color={"white"}
                />
                <Input id="email" name="email" type="email" placeholder="Email" mb={2}
                    onChange={handleChange} color={"white"}
                />
                <Input id="password" name="password" type="password" placeholder="Password" mb={2} minLength={8}
                    onChange={handleChange} color={"white"}
                />
            </FormControl>
            <Button
                colorScheme="orange"
                padding="20px"
                width="100%"
                backgroundColor="#04a51e"
                borderRadius={100}
                mb={2}
                onClick={handleRegister}
            >
                Create
            </Button>
            <Flex gap={1} alignItems={"center"}>
                <Text fontSize={"12px"} color={"white"}>Already have account?</Text>
                <NavLink to={"/login"}>
                    <Text fontSize={"12px"} color={"#04a51e"}>Login</Text>
                </NavLink>
            </Flex>
        </>
    )
}

export default FormRegister
import { Input, Text, Button, Flex, Spacer } from "@chakra-ui/react"
import {
    FormControl
} from '@chakra-ui/react'
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { RootState } from "../../../store/types/rootStates"


function FormLogin() {
    const auth = useSelector((state: RootState) => state.auth)
    const { handleChange, handleLogin } = useLogin()

    return (
        <>
            <Text fontSize={"40px"} color={"#04a51e"} fontWeight={"Bold"} mb={3}>circle</Text>
            <Text color={"white"} fontSize={"larger"} fontWeight={"bold"} mb={3}>Login to Circle</Text>
            <FormControl color={"white"} isRequired>
                <Input id="username" name="username" type="text" placeholder="Email/Username"
                    color={"white"} mb={2} onChange={handleChange}
                />
                <Input id="password" name="password" type="password" placeholder="Password"
                    color={"white"} mb={2} onChange={handleChange}
                />
                <Flex>
                    <Spacer />
                    <Text color={"white"} mb={2}>Forgot Password?</Text>
                </Flex>
            </FormControl>
            <Button
                colorScheme="orange"
                padding="20px"
                width="100%"
                backgroundColor="#04a51e"
                borderRadius={100}
                mb={2}
                onClick={handleLogin}
            >
                Login
            </Button>
            <Flex gap={1} alignItems={"center"}>
                <Text fontSize={"12px"} color={"white"}>Don't have an account yet?</Text>
                <NavLink to={"/register"}>
                    <Text fontSize={"12px"} color={"#04a51e"}>Create account</Text>
                </NavLink>
            </Flex>
        </>
    )
}

export default FormLogin;
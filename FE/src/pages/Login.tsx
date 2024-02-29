import { Container, Grid } from "@chakra-ui/react"
import FormLogin from "../feature/Auth/components/FormLogin"

function Login() {

    return (
        <Grid height={"100vh"} bg="#1d1d1d">
            <Container mt={"10%"}>
                <FormLogin />
            </Container>
        </Grid>
    )
}

export default Login
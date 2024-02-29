import { Container, Grid } from "@chakra-ui/react"
import FormRegister from "../feature/Auth/components/FormRegister"

function Register() {

    return (
        <Grid height={"100vh"} bg="#1d1d1d">
            <Container mt={"10%"}>
                <FormRegister />
            </Container>
        </Grid>
    )
}

export default Register
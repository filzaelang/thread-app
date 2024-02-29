import { Container } from '@chakra-ui/react'

//component
import MyProfile from './RightbarComponents/MyProfile'
import Sugested from './RightbarComponents/Sugested'
import Watermark from './RightbarComponents/Watermark'

function Rightbar() {
    return (
        <Container>
            <MyProfile />
            <Sugested />
            <Watermark />
        </Container>
    )
}

export default Rightbar
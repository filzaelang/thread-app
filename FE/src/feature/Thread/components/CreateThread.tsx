import { Button, Text, Avatar, Input, Flex, Spacer } from '@chakra-ui/react'
import { Grid, GridItem, FormControl } from "@chakra-ui/react"
import { useThreads } from '../hooks/useThreads';
import { RootState } from '../../../store/types/rootStates';
import { useSelector } from 'react-redux';


//components
import { LuImagePlus } from "react-icons/lu";

function CreateThread() {
    const { handleChange, handlePostThread, fileInputRef } = useThreads()

    return (
        <>
            <Flex marginBottom={"10px"} alignItems={"center"} bg={"#262626"} borderRadius={"10px"}>
                <form
                    onSubmit={handlePostThread}
                    encType='multipart/form-data'
                    style={{ padding: '20px', width: '100%' }}
                >
                    <FormControl>
                        <Flex width={"full"}>
                            {/* Input */}
                            <Input
                                placeholder='What is happening ?!'
                                name='content'
                                id='content'
                                color={"white"}
                                onChange={handleChange}
                                padding={"30px"}
                                variant='flushed'
                            />
                        </Flex>

                        <Flex flexDirection={"row"} width={"100%"} mt={"10px"}>
                            {/* Image */}
                            <label htmlFor="image">
                                <LuImagePlus color='04a51e' fontSize={40} />
                            </label>
                            <Input
                                id="image"
                                name='image'
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                                ref={fileInputRef}
                            />
                            <Spacer />

                            {/* Button Post */}
                            <Button
                                colorScheme="orange"
                                padding="20px"
                                backgroundColor="#04a51e"
                                borderRadius={100}
                                type='submit'
                            >
                                <Text>Post</Text>
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
            </Flex>
        </>
    )
}

export default CreateThread


// import { Button, Text, Avatar, Input } from '@chakra-ui/react'
// import { Grid, GridItem, FormControl } from "@chakra-ui/react"
// import { useThreads } from '../hooks/useThreads';
// import { RootState } from '../../../store/types/rootStates';
// import { useSelector } from 'react-redux';


// //components
// import { LuImagePlus } from "react-icons/lu";

// function CreateThread() {
//     const { handleChange, handlePostThread, fileInputRef } = useThreads()
//     const auth = useSelector((state: RootState) => state.auth)

//     return (
//         <>
//             <Grid templateColumns="repeat(12, 1fr)" bg="#1d1d1d" marginBottom={"10px"} alignItems={"center"}>
//                 {/* image */}

//                 <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} padding="0" position="relative" zIndex={1}>
//                     <Avatar
//                         size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
//                         src={auth.data.photo_profile}
//                     />
//                 </GridItem>

//                 <GridItem colSpan={{ base: 11, lg: 11, xl: 11 }} position="relative" zIndex={2}>
//                     <form onSubmit={handlePostThread} encType='multipart/form-data'>
//                         <FormControl>
//                             <Grid
//                                 templateColumns="repeat(10, 1fr)" // Adjust the number based on your layout requirements
//                                 gap={4} // Adjust the gap as needed
//                             >
//                                 {/* Input */}
//                                 <GridItem colSpan={{ base: 8, lg: 8, xl: 8 }} position="relative">
//                                     <Input
//                                         placeholder='What is happening ?!'
//                                         name='content'
//                                         id='content'
//                                         color={"white"}
//                                         onChange={handleChange}
//                                     />
//                                 </GridItem>

//                                 {/* Image */}
//                                 <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
//                                     <label htmlFor="image">
//                                         <LuImagePlus color='04a51e' fontSize={40} />
//                                     </label>
//                                     <Input
//                                         id="image"
//                                         name='image'
//                                         type="file"
//                                         accept="image/*"
//                                         style={{ display: 'none' }}
//                                         onChange={handleChange}
//                                         ref={fileInputRef}
//                                     />
//                                 </GridItem>

//                                 {/* Button Post */}
//                                 <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
//                                     <Button
//                                         colorScheme="orange"
//                                         padding="20px"
//                                         backgroundColor="#04a51e"
//                                         borderRadius={100}
//                                         type='submit'
//                                     >
//                                         <Text>Post</Text>
//                                     </Button>
//                                 </GridItem>
//                             </Grid>
//                         </FormControl>
//                     </form>
//                 </GridItem>
//             </Grid >
//         </>
//     )
// }

// export default CreateThread
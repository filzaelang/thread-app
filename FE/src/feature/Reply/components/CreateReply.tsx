import { Button, Text, Avatar, Input } from '@chakra-ui/react'
import { Grid, GridItem, FormControl } from "@chakra-ui/react"
import { useReply } from '../hooks/useReply';

//components
import { LuImagePlus } from "react-icons/lu";

interface RepliesProps {
    id: number;
}

export default function CreateReply({ id }: RepliesProps) {
    const { handleChange, handlePostReply, fileInputRef } = useReply(id)

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" mt={'15px'} mb={"15px"} ms={"10px"} me={"10px"} alignItems={"center"}>
                {/* image */}

                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} padding="0" position="relative" zIndex={1}>
                    <Avatar
                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                        src={''}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 11, lg: 11, xl: 11 }} position="relative" zIndex={2}>
                    <form onSubmit={handlePostReply} encType='multipart/form-data'>
                        <FormControl>
                            <Grid
                                templateColumns="repeat(12, 1fr)"
                                gap={4}
                            >
                                {/* Input */}
                                <GridItem colSpan={{ base: 9, lg: 9, xl: 9 }} position="relative">
                                    <Input
                                        placeholder='Type yor reply!'
                                        name='content'
                                        id='content'
                                        color={"white"}
                                        onChange={handleChange}
                                    />
                                </GridItem>

                                {/* Image */}
                                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
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
                                </GridItem>

                                {/* Button Post */}
                                <GridItem colSpan={{ base: 1, lg: 1, xl: 1 }} position="relative">
                                    <Button
                                        colorScheme="orange"
                                        padding="20px"
                                        backgroundColor="#04a51e"
                                        borderRadius={100}
                                        type='submit'
                                    >
                                        <Text>Post</Text>
                                    </Button>
                                </GridItem>
                            </Grid>
                        </FormControl>
                    </form>
                </GridItem>
            </Grid >
        </>
    )
}

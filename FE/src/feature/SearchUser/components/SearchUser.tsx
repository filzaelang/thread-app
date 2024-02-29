import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup, InputLeftElement, Avatar, Text, Spacer, Button
} from '@chakra-ui/react';
import { IUserSearchResult } from '../../../interface/UserInterface';
import useSearchUser from '../hooks/useSearchUser';

// icon
import { RiUserSearchLine } from "react-icons/ri";

export default function SearchUser() {

    const { handleChange, searchResults, searchQuery, handleFollow, handleNavigate } = useSearchUser()

    return (
        <>
            <Flex align="center" justify="center">
                <FormControl>
                    <FormLabel display={"none"}>Search</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<RiUserSearchLine color="white" />}
                        />
                        <Input
                            id='username'
                            name='username'
                            type="text"
                            placeholder="Enter your search"
                            value={searchQuery}
                            onChange={handleChange}
                            color={"white"}
                        />
                    </InputGroup>
                </FormControl>
            </Flex>
            {searchResults?.map((data: IUserSearchResult) => (
                <Flex gap={3} mt={"15px"} mb={"15px"} key={data.id}>
                    {/* image */}
                    <Avatar
                        size={{ base: "sm", md: "md", lg: "md", xl: "md", xxl: "md" }}
                        src={data.photo_profile}
                    />
                    <Flex flexDirection={"column"}>
                        <Text color={"white"} onClick={() => handleNavigate(data.id)}>{data.full_name}</Text>
                        <Text color={"grey"}>@{data.username}</Text>
                        <Text color={"white"}>{data.description}</Text>
                    </Flex>
                    <Spacer />
                    <Button onClick={() => handleFollow(data.id, data.is_followed)}>{data.is_followed ? "Following" : "Follow"}</Button>
                </Flex>
            ))}
        </>
    );
}

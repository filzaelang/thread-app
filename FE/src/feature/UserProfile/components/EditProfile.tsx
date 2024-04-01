import { FormControl, FormLabel, Input, Button, Text, Stack } from '@chakra-ui/react'
import { useEditProfile } from '../hooks/useEditProfile'


export default function EditProfile() {

    const { fileInputRef, handleUpdateUser, handleChange, form, user } = useEditProfile()

    return (
        <>
            <form onSubmit={handleUpdateUser} encType='multipart/form-data'>
                <FormControl mb={"20px"}>
                    <Stack>
                        <FormLabel color={"white"}>Username</FormLabel>
                        <Input
                            id='username'
                            type="text"
                            name="username"
                            value={user.username}
                            color={"white"}
                            readOnly
                        />
                        <FormLabel color={"white"}>Fullname</FormLabel>
                        <Input
                            id='full_name'
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            color={"white"}
                            onChange={handleChange}
                        />
                        <FormLabel color={"white"}>Description</FormLabel>
                        <Input
                            id='description'
                            type="text"
                            name="description"
                            value={form.description}
                            color={"white"}
                            onChange={handleChange}
                        />
                        {/* <FormLabel color={"white"}>Change Photo Profile</FormLabel>
                        <Input
                            id='photo_profile'
                            name="photo_profile"
                            type="file"
                            accept="image/*"
                            style={{ width: '160px', fontSize: '22px' }}
                            onChange={handleChange}
                            ref={fileInputRef}
                        /> */}
                        <Button
                            colorScheme="orange"
                            padding="20px"
                            backgroundColor="#04a51e"
                            borderRadius={100}
                            type='submit'
                            mt={2}
                        >
                            <Text>Update</Text>
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    )
}

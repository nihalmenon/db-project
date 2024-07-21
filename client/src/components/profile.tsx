import { Box, Avatar, Heading, Text, VStack, HStack, Link, IconButton, Flex, Container } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import { dateToYMD, formatGender } from '../utils/commonFunctions';
import { User, useUser } from '../hooks/useUser';
import { EditProfileModal } from './editProfileModal';
import { useState } from 'react';
import { updateUser } from '../actions/user';
import toast from "react-hot-toast";

export const Profile = () => {
  const { user, fetchUser } = useUser();
  const [isOpenModal, setIsOpenEditModal] = useState(false);

  const openModal = () => {
    setIsOpenEditModal(true);
  }

  const onCloseModal = () => {
    setIsOpenEditModal(false);
  };

  const onSaveModal = async (newUser: User) => {
    try {
      await updateUser(newUser);
      toast.success("Profile updated successfully.")
    } catch (e: any) {
      toast.error(e.response.data);
    } finally {
      fetchUser();
      onCloseModal();
    }
  };

  return (
    <>
    <Container p={10} centerContent>
      <Flex direction="column" w={"md"}>
        <Box
          p={5}
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          textAlign="center"
        >
          <Avatar
            size="2xl"
            name={`${user.first_name} ${user.last_name}`}
            src="path-to-profile-picture.jpg"
            mb={4}
          />
          <Heading as="h2" size="lg" mb={2}>
            {user.first_name} {user.last_name}
          </Heading>
          <Text fontSize="md" mb={4}>{user.email}</Text>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold">Date of Birth:</Text>
              <Text>{dateToYMD(new Date(user.dob))}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Phone:</Text>
              <Text>{user.phone}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Gender:</Text>
              <Text>{formatGender(user.gender)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Socials:</Text>
              <Link href={"https://instagram.com/" + String(user.socials).replace('@', '')} isExternal>
                {user.socials}
              </Link>
            </HStack>
          </VStack>
        </Box>
          <Flex mt={2} justifyContent="flex-end">
            <IconButton width="fit-content" aria-label='Edit' icon={<EditIcon />} onClick={openModal}/>
          </Flex>
      </Flex>
    </Container>
    <EditProfileModal onSave={onSaveModal} onClose={onCloseModal} isOpen={isOpenModal} user={user} />
    </>
  );
}

export default Profile;

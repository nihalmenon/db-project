import React, { useEffect, useState } from 'react';
import { Box, Avatar, Heading, Text, VStack, HStack, Link } from '@chakra-ui/react';
import { getUserDetails } from '../actions/user';

export const Profile = () => {
    const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    getUserDetails().then(response => {
      setUserData(response.data.user);
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      m="auto"
      mt={10}
      textAlign="center"
    >
      <Avatar
        size="2xl"
        name={`${userData.first_name} ${userData.last_name}`}
        src="path-to-profile-picture.jpg"
        mb={4}
      />
      <Heading as="h2" size="lg" mb={2}>
        {userData.first_name} {userData.last_name}
      </Heading>
      <Text fontSize="md" mb={4}>{userData.email}</Text>
      <VStack spacing={2} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold">Date of Birth:</Text>
          <Text>{new Date(userData.dob).toLocaleDateString()}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Phone:</Text>
          <Text>{userData.phone}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Gender:</Text>
          <Text>{userData.gender === 'm' ? 'Male' : 'Female'}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Socials:</Text>
          <Link href={userData.socials} isExternal>
            {userData.socials}
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Profile;

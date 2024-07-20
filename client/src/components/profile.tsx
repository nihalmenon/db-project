import { Box, Avatar, Heading, Text, VStack, HStack, Link } from '@chakra-ui/react';
import { dateToYMD } from '../utils/commonFunctions';
import { useUser } from '../hooks/useUser';

export const Profile = () => {
  const user = useUser();
  return (
    <Box p={10}>
      <Box
        p={5}
        maxW="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        m="auto"
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
            <Text>{user.gender === 'm' ? 'Male' : 'Female'}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontWeight="bold">Socials:</Text>
            <Link href={"https://instagram.com/" + String(user.socials).replace('@', '')} isExternal>
              {user.socials}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default Profile;

import { Box, Heading, useTheme, Text, Card, CardHeader, CardBody, CardFooter, Button, SimpleGrid, Stack, ButtonGroup, Divider, Image } from "@chakra-ui/react"
import { useUser } from "../hooks/useUser";
import { ConnectData, Trip, User } from "../interfaces/connectInterfaces";
import { getAge } from "../utils/commonFunctions";
import { ThemeButton } from "./themeButton";
import { useState } from "react";
import { TripDetailsModal } from "./tripDetailsModal";

const TEST_DATA: ConnectData[] = [
  {
    trip: {
      tid: 1,
      lid: 1,
      city: "Toronto",
      c_name: "Canada",
      start_date: "start_date",
      end_date: "end_date",
      bio: "a couple of lads",
      itinerary: [],
    },
    pastTrips: [],
    users: [
      {first_name: "Kieran", dob: "2004-06-06"} as User,
      {first_name: "Dhyan", dob: "2004-01-06"} as User,
      {first_name: "Nihal", dob: "2004-02-06"} as User,
      {first_name: "Daniel", dob: "2004-11-06"} as User,
    ]
  },
  {
    trip: {
      tid: 1,
      lid: 1,
      city: "Toronto",
      c_name: "Canada",
      start_date: "start_date",
      end_date: "end_date",
      bio: "a couple of lads",
      itinerary: [],
    },
    pastTrips: [],
    users: [
      {first_name: "Kieran", dob: "2004-06-06"} as User,
      {first_name: "Dhyan", dob: "2004-01-06"} as User,
      {first_name: "Nihal", dob: "2004-02-06"} as User,
      {first_name: "Daniel", dob: "2004-11-06"} as User,
    ]
  },
  {
    trip: {
      tid: 1,
      lid: 1,
      city: "Toronto",
      c_name: "Canada",
      start_date: "start_date",
      end_date: "end_date",
      bio: "a couple of lads",
      itinerary: [],
    },
    pastTrips: [],
    users: [
      {first_name: "Kieran", dob: "2004-06-06"} as User,
      {first_name: "Dhyan", dob: "2004-01-06"} as User,
      {first_name: "Nihal", dob: "2004-02-06"} as User,
      {first_name: "Daniel", dob: "2004-11-06"} as User,
    ]
  }
]

export const Connect = () => {
  const user = useUser();
  const theme = useTheme(); // Access Chakra UI theme
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState<boolean>(false);
  const [isOpenPastTripsModal, setIsOpenPastTripsModal] = useState<boolean>(false);

  const connectData: ConnectData[] = TEST_DATA;

  return (
    <Box p={5} minH="100vh">
      <Heading mb={1} color={theme.colors.primary}>Connect</Heading>
      <Text fontWeight="bold" fontSize="xl" color={theme.colors.dark} >Connect with other groups that are going to LOCATION with you!</Text>

      <SimpleGrid spacing={4} mt={10} templateColumns='repeat(auto-fill, 100%)'>
        {
          connectData.map(connect => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />

              <Stack>
                <CardBody>
                  <Heading size='md' pb={2}>{connect.trip.bio}</Heading>
                  {
                    connect.users.map(user => (
                      <Text>{user.first_name}, {getAge(new Date(user.dob))}</Text>
                    ))
                  }
                </CardBody>

                <CardFooter pt={0}>
                  <ButtonGroup spacing={4}>
                    <ThemeButton onClick={() => setIsOpenDetailsModal(true)}>View Details</ThemeButton>
                    <ThemeButton>Past Trips</ThemeButton>
                  </ButtonGroup>

                </CardFooter>
              </Stack>
            </Card>
          ))
        }
      </SimpleGrid>
      <TripDetailsModal isOpen={isOpenDetailsModal} onClose={() => setIsOpenDetailsModal(false)} trip={{} as Trip} />
    </Box>
  );
};

export default Connect;

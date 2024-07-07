import React, { useEffect, useState, useCallback } from 'react';
import { getUserDetails, getUserTrips } from '../actions/user';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Heading, Text, List, ListItem, Divider, Flex, Center, useColorModeValue, useTheme } from "@chakra-ui/react";

export const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [trips, setTrips] = useState<any[]>([]);
  const navigate = useNavigate();
  const theme = useTheme(); // Access Chakra UI theme
  const bg = useColorModeValue("white", "#1A202C");
  const cardBg = useColorModeValue("#EDF2F7", "#2D3748");

  const fetchUserDetails = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await getUserDetails(token ? token : "");
      if (response.status === 200) {
        setUser(response.data.user);
        console.log("User details fetched successfully");
        console.log(response.data);
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error fetching user details", error);
      navigate('/signin');
    }
  }, [navigate]);

  const fetchTrips = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await getUserTrips(token ? token : "");
      if (response.status === 200) {
        setTrips(response.data);
        console.log("Trips fetched successfully", response.data);
      } else {
        console.error("Error fetching trips");
      }
    } catch (error) {
      console.error("Error fetching trips", error);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchTrips();
  }, [fetchUserDetails, fetchTrips]);

  return (
    <Box p={5} bg={bg} minH="100vh">
      <Heading mb={6} color={theme.colors.accent}>Dashboard</Heading>
      
      <Flex justify="space-between" align="center" mb={6}>
        <Box flex="1">
          {/* Placeholder to push buttons to the right */}
        </Box>
        <Flex>
          <Button backgroundColor={theme.colors.dark} color={theme.colors.light} onClick={() => navigate('/update-user')} mr={2}>My Profile</Button>
          <Button backgroundColor={theme.colors.dark} color={theme.colors.light} onClick={() => navigate('/addtrip')}>Add New Trip</Button>
        </Flex>
      </Flex>

      <Divider mb={6} />

      {
        trips.length > 0 ? (
          <Box>
            <Heading size="lg" mb={4} color={theme.colors.dark}>Upcoming Trips</Heading>
            <List spacing={4}>
              {trips.map((trip, index) => (
                <ListItem key={index} bg={theme.colors.light} p={4} borderRadius="md" shadow="md">
                  <Flex align="center" justify="space-between" mb={2}>
                    <Heading size="md" color={theme.colors.highlight}>Trip {index + 1}</Heading>
                    <Text fontSize="sm" color="black">{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</Text>
                  </Flex>
                  <Text>{trip.bio}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Center mt={8}>
            <Text fontSize="lg" color="black">No trips to show</Text>
          </Center>
        )
      }

      <Divider mb={8} />

      {
        trips.length > 0 ? (
          <Box>
            <Heading size="lg" mb={4} color={theme.colors.dark}>Previous Trips</Heading>
            <List spacing={4}>
              {trips.map((trip, index) => (
                <ListItem key={index} bg={theme.colors.light} p={4} borderRadius="md" shadow="md">
                  <Flex align="center" justify="space-between" mb={2}>
                    <Heading size="md" color={theme.colors.highlight}>Trip {index + 1}</Heading>
                    <Text fontSize="sm" color="black">{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</Text>
                  </Flex>
                  <Text>{trip.bio}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Center mt={8}>
            <Text fontSize="lg" color="black">No trips to show</Text>
          </Center>
        )
      }
    </Box>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserTrips } from '../actions/user';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Heading, Text, Stack, List, ListItem, Divider } from "@chakra-ui/react";

export const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [trips, setTrips] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await getUserDetails(token ? token : "");
      if (response.status === 200) {
        setUser(response.data.user); // Assuming response.data contains 'user' object
        console.log("User details fetched successfully");
        console.log(response.data);
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error fetching user details", error);
      navigate('/signin');
    }
  }

  const fetchTrips = async () => {
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
  }

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   // Ensure time is set to midnight to avoid partial days
  //   date.setHours(0, 0, 0, 0);
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   return date.toLocaleDateString(undefined, options);
  // };
  

  useEffect(() => {
    fetchUserDetails();
    fetchTrips();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Dashboard</Heading>
      
      <Stack spacing={4} direction="row" align="center" justify="space-between">
        <Button colorScheme="teal" onClick={() => navigate('/update-user')}>Update User</Button>
        <Button colorScheme="teal" onClick={() => navigate('/addtrip')}>Add New Trip</Button>
      </Stack>

      <Divider my={4} />

      {
        trips.length > 0 ? (
          <Box mt={4}>
            <Heading size="md">My Trips</Heading>
            <List spacing={3} mt={2}>
              {trips.map((trip, index) => (
                <ListItem key={index} border="1px" borderRadius="md" p={3}>
                  <Heading size="sm">{trip.lid}</Heading>
                  <Text>{trip.start_date} - {trip.end_date}</Text>
                  <Text>{trip.bio}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Text mt={4}>No trips to show</Text>
        )
      }
    </Box>
  );
};

export default Dashboard;

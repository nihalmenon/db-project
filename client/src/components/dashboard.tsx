import React, { useEffect, useState, useCallback } from "react";
import { getUserDetails, getUserTrips } from "../actions/user";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Divider,
  Flex,
  Center,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";

export const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [trips, setTrips] = useState<any[]>([]);
  const [selectedTripId, setSelectedTripId] = useState("");
  const navigate = useNavigate();
  const theme = useTheme(); // Access Chakra UI theme

  const fetchUserDetails = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await getUserDetails(token ? token : "");
      if (response.status === 200) {
        setUser(response.data.user);
        console.log("User details fetched successfully");
        console.log(response.data);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error fetching user details", error);
      navigate("/signin");
    }
  }, [navigate]);

  const fetchTrips = useCallback(async () => {
    const token = localStorage.getItem("authToken");
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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.start_date) > new Date()
  );
  const previousTrips = trips.filter(
    (trip) => new Date(trip.start_date) < new Date()
  );

  useEffect(() => {
    fetchUserDetails();
    fetchTrips();
  }, [fetchUserDetails, fetchTrips]);

  // Determine background color for upcoming trips based on previous trips
  const upcomingBackgroundColor =
    previousTrips.length > 0 ? theme.colors.secondary : theme.colors.accent;

  const handleTripClick = (tripId: string) => {
    setSelectedTripId(tripId);
    navigate("/tripview", { state: { tripId } });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <Box p={5} minH="100vh">
      <Flex justify="space-between" alignItems="center" mb={6}>
        <Heading color={theme.colors.primary}>Dashboard</Heading>
        <Flex flexDirection="column" alignItems="flex-end">
          <Button
            backgroundColor={theme.colors.primary}
            color={theme.colors.textlight}
            onClick={handleLogout}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
            size="md"
            mb={2}
          >
            Logout
          </Button>
          <Button
            backgroundColor={theme.colors.primary}
            color={theme.colors.textlight}
            onClick={() => navigate("/profile")}
            size="md"
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
            mb={2}
          >
            My Profile
          </Button>
          <Button
            backgroundColor={theme.colors.primary}
            color={theme.colors.textlight}
            onClick={() => navigate("/addtrip")}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
            size="md"
          >
            Add New Trip
          </Button>
        </Flex>
      </Flex>

      <Divider mb={6} />

      {trips.length > 0 ? (
        <Box>
          <Heading size="lg" mb={4} color={theme.colors.secondary}>
            Upcoming Trips
          </Heading>
          <List spacing={4}>
            {upcomingTrips.map((trip, index) => (
              <ListItem
                key={index}
                bg={upcomingBackgroundColor}
                _hover={{
                  backgroundColor: theme.colors.accent,
                  transition: "background-color 0.5s ease",
                }}
                p={4}
                borderRadius="md"
                shadow="md"
                onClick={() => handleTripClick(trip.tid)}
              >
                <Flex align="center" justify="space-between" mb={2}>
                  <Heading size="md" color={theme.colors.accent2}>
                    Trip {index + 1}
                  </Heading>
                  <Text fontSize="sm" color={theme.colors.textlight}>
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </Text>
                </Flex>
                <Text color={theme.colors.primary}>{trip.bio}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Center mt={8}>
          <Text fontSize="lg" color="black">
            No trips to show
          </Text>
        </Center>
      )}

      <Divider mb={8} />

      {trips.length > 0 ? (
        <Box>
          <Heading size="lg" mb={4} color={theme.colors.secondary}>
            Previous Trips
          </Heading>
          <List spacing={4}>
            {previousTrips.map((trip, index) => (
              <ListItem
                key={index}
                bg={theme.colors.secondary}
                _hover={{
                  backgroundColor: theme.colors.accent,
                  transition: "background-color 0.5s ease",
                }}
                p={4}
                borderRadius="md"
                shadow="md"
                onClick={() => handleTripClick(trip.tid)}
              >
                <Flex align="center" justify="space-between" mb={2}>
                  <Heading size="md" color={theme.colors.accent2}>
                    Trip {index + 1}
                  </Heading>
                  <Text fontSize="sm" color={theme.colors.textlight}>
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </Text>
                </Flex>
                <Text color={theme.colors.textlight}>{trip.bio}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Center mt={8}>
          <Text fontSize="lg" color="black">
            No trips to show
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default Dashboard;

import React, { useEffect, useState, useCallback } from "react";
import { getUserDetails, getUserTrips, getItinerary } from "../actions/user";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useUser } from '../hooks/useUser';
import { ThemeButton } from "./themeButton";
import { TripDetailsModal } from "./tripDetailsModal";
import { formatDate } from "../utils/commonFunctions";
import { Trip } from "../interfaces/connectInterfaces";

export const Dashboard = () => {
  const user = useUser();
  const [trips, setTrips] = useState<Trip[]>([]);

  const [selectedTripId, setSelectedTripId] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip>({} as Trip);
  const [tripItinerary, setItinerary] = useState<any[]>([]);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const theme = useTheme(); // Access Chakra UI theme
  const bg = useColorModeValue("white", "#1A202C");
  const cardBg = useColorModeValue("#EDF2F7", "#2D3748");

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

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.start_date) > new Date()
  );
  const previousTrips = trips.filter(
    (trip) => new Date(trip.start_date) < new Date()
  );

  const handleTripClick = (tripId: string) => {
    setSelectedTripId(tripId);
    navigate("/tripview", { state: { tripId } });
  };

  const onclickModal = async (trip: Trip) => {
    setSelectedTrip(trip);
    try {
      const response = await getItinerary(
        String(trip.tid),
        localStorage.getItem("authToken") || ""
      );
      if (response.status === 200) {
        setSelectedTrip(trip => {
          return {
            ...trip,
            itinerary: response.data[0],
          };
        });
        console.log("Itinerary fetched successfully", response.data);
      } else {
        console.error("Error fetching itinerary");
      }
    } catch (error) {
      console.error("Error fetching itinerary", error);
    }
    onOpen();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <Box p={5} bg={bg} minH="200vh">
      <Flex justify="space-between" alignItems="center" mb={6}>
        <Heading color={theme.colors.primary}>Dashboard</Heading>
        <Flex flexDirection="column" alignItems="flex-end">
          <ThemeButton onClick={handleLogout}>Logout</ThemeButton>
          <ThemeButton onClick={() => navigate("/profile")}>My Profile</ThemeButton>
          <ThemeButton onClick={() => navigate("/addtrip")}>Add New Trip</ThemeButton>
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
                bg={theme.colors.secondary}
                _hover={{
                  backgroundColor: theme.colors.accent,
                  transition: "background-color 0.5s ease",
                }}
                p={4}
                borderRadius="md"
                shadow="md"
                onClick={() => onclickModal(trip)}
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
                onClick={() => onclickModal(trip)}
              >
                <Flex align="center" justify="space-between" mb={2}>
                  <Heading size="md" color={theme.colors.accent2}>
                    Trip {index + 1}
                  </Heading>
                  <Text fontSize="sm" color={theme.colors.accent2}>
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
          <Text fontSize="lg" color={theme.colors.dark}>
            No trips to show
          </Text>
        </Center>
      )}
      <TripDetailsModal isOpen={isOpen} onClose={onClose} trip={selectedTrip} />
    </Box>
  );
};

export default Dashboard;

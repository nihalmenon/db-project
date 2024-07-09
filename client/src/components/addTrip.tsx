import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getSuggestedInvitees } from "../actions/user";
import Select from "react-select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  VStack,
  Heading,
  Collapse,
  useTheme,
} from "@chakra-ui/react";
import { getLocations } from "../actions/location";
import { createTrip } from "../actions/trip";
import toast from "react-hot-toast";

export const AddTrip = () => {
  const [user, setUser] = useState<any>({});
  const [tripDetails, setTripDetails] = useState({
    startDate: "",
    endDate: "",
    bio: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locations, setLocations] = useState([] as any[]);
  const [invitees, setInvitees] = useState([] as any[]);
  const [currentInvitee, setCurrentInvitee] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([] as any[]);
  const [showSuggested, setShowSuggested] = useState(false);

  const theme = useTheme();

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails(token ? token : "");
      if (response.status === 200) {
        setUser(response.data.user); // Assuming response.data contains 'user' object
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error fetching user details", error);
      navigate("/signin");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      if (response.status === 200) setLocations(response.data);
    } catch {
      console.error("Error fetching locations");
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const response = await getSuggestedInvitees(token ? token : "");
      if (response.status === 200) setSuggestedUsers(response.data);
    } catch {
      console.error("Error fetching suggested users");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchLocations();
    fetchSuggestedUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !selectedLocation ||
      !tripDetails.startDate ||
      !tripDetails.endDate ||
      !tripDetails.bio
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    // Add trip to database
    try {
      const response = await createTrip(token ? token : "", {
        ...tripDetails,
        lid: selectedLocation.value,
        invitees,
      });
      if (response.status === 200) {
        navigate("/dashboard");
        toast.success("Trip added successfully");
      }
    } catch {
      console.error("Error adding trip");
      toast.error("Error adding trip");
    }
  };

  const handleInviteeChange = (e: any) => {
    setCurrentInvitee(e.target.value);
  };

  const addInvitee = () => {
    if (currentInvitee && !invitees.includes(currentInvitee)) {
      setInvitees([...invitees, currentInvitee]);
      setCurrentInvitee("");
    }
  };

  const removeInvitee = (email: String) => {
    setInvitees(invitees.filter((invitee) => invitee !== email));
  };

  const addSuggestedInvitee = (email: String) => {
    if (!invitees.includes(email)) {
      setInvitees([...invitees, email]);
    }
  };

  const toggleSuggestedUsers = () => {
    setShowSuggested(!showSuggested);
  };

  return (
    <Box p={5} maxWidth="600px" mx="auto">
      <Heading>Add Trip</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Location</FormLabel>
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={locations.map((loc) => ({
              value: loc.lid,
              label: loc.city + ", " + loc.c_code,
            }))}
            placeholder="Select a location"
            isSearchable
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="startDate"
            value={tripDetails.startDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            name="endDate"
            value={tripDetails.endDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Bio</FormLabel>
          <Input
            type="text"
            name="bio"
            value={tripDetails.bio}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Invitees</FormLabel>
          <VStack align="stretch">
            <HStack>
              <Input
                type="email"
                placeholder="Enter invitee's email"
                value={currentInvitee}
                onChange={handleInviteeChange}
              />
              <Button
                onClick={addInvitee}
                backgroundColor={theme.colors.primary}
                color={theme.colors.textlight}
                _hover={{
                  backgroundColor: theme.colors.secondary,
                  transition: "background-color 0.3s ease",
                }}
              >
                Add
              </Button>
            </HStack>
            <HStack wrap="wrap">
              {invitees.map((email, index) => (
                <Tag
                  key={index}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{email}</TagLabel>
                  <TagCloseButton onClick={() => removeInvitee(email)} />
                </Tag>
              ))}
            </HStack>
          </VStack>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Suggested Users</FormLabel>
          <Button
            onClick={toggleSuggestedUsers}
            mb={2}
            backgroundColor={theme.colors.light}
            color={theme.colors.dark}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
          >
            {showSuggested ? "Hide Suggested Users" : "Show Suggested Users"}
          </Button>
          <Collapse in={showSuggested}>
            <VStack align="stretch">
              {suggestedUsers.map((user, index) => (
                <Button
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.textlight}
                  _hover={{
                    backgroundColor: theme.colors.secondary,
                    transition: "background-color 0.3s ease",
                  }}
                  key={index}
                  onClick={() => addSuggestedInvitee(user.email)}
                  variant="outline"
                >
                  {user.email}
                </Button>
              ))}
            </VStack>
          </Collapse>
        </FormControl>
        <Button
          type="submit"
          backgroundColor={theme.colors.primary}
          color={theme.colors.textlight}
          _hover={{
            backgroundColor: theme.colors.secondary,
            transition: "background-color 0.3s ease",
          }}
          onClick={handleSubmit}
        >
          Add Trip
        </Button>
      </form>
    </Box>
  );
};

import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import { Form, useNavigate } from "react-router-dom";
import { getUserDetails, getSuggestedInvitees } from "../actions/user";
import { getAverageDuration, getPopularActivities } from "../actions/trip";
import { useUser } from "../hooks/useUser";
import { LocationDropdown } from "./locationDropdown";
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
  Flex,
  IconButton,
  Text
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { getLocations, searchLocations } from "../actions/location";
import { createTrip } from "../actions/trip";
import toast from "react-hot-toast";
import {debounce} from 'lodash';

export const AddTrip = () => {
  const [tripDetails, setTripDetails] = useState({
    startDate: "",
    endDate: "",
    bio: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [invitees, setInvitees] = useState([] as any[]);
  const [currentInvitee, setCurrentInvitee] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([] as any[]);
  const [showSuggested, setShowSuggested] = useState(false);
  const [itinerary, setItinerary] = useState<{ a_description: string; dte: string }[]>([{ a_description: '', dte: '' }]);
  const [averageDuration, setAverageDuration] = useState<number | null>(null);
  const [suggestedItinerary, setSuggestedItinerary] = useState<{ a_description: string }[]>([]);
	const [showSuggestedItinerary, setShowSuggestedItinerary] = useState(false);

  const theme = useTheme();

  const navigate = useNavigate();

  const user = useUser();

  const fetchSuggestedUsers = async () => {
    try {
      const response = await getSuggestedInvitees();
      if (response.status === 200) setSuggestedUsers(response.data);
    } catch {
      console.error("Error fetching suggested users");
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(selectedLocation);
    if (selectedLocation) {
      fetchAverageDuration();
      fetchSuggestedItinerary();
    }
  }, [selectedLocation])

  const fetchAverageDuration = async () => {
    try {
      const response = await getAverageDuration(selectedLocation.value);
      if (response.status === 200 && response.data[0].length > 0) {
        setAverageDuration(response.data[0][0].avg_duration);
      } else {
        setAverageDuration(null);
      }
    } catch {
      console.error("Error fetching average duration");
      setAverageDuration(null);
      setSuggestedItinerary([]);
    }
  }

  const fetchSuggestedItinerary = async () => {
    try {
      const suggestedActivitiesResponse = await getPopularActivities(selectedLocation.value, tripDetails.startDate, tripDetails.endDate);
      if (suggestedActivitiesResponse.status === 200) {
        setSuggestedItinerary(suggestedActivitiesResponse.data);
      }
    } catch {
      console.error("Error fetching suggested activities");
      setSuggestedItinerary([]);
    }
  }

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
    
    try {
      const response = await createTrip({
        ...tripDetails,
        lid: selectedLocation.value,
        invitees,
        itinerary
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

  const handleItineraryChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const newItinerary = itinerary.map((item, i) => (
			i === index ? { ...item, [e.target.name]: e.target.value } : item
		));
		setItinerary(newItinerary);
	};

	const addItineraryItem = () => {
		setItinerary([...itinerary, { a_description: '', dte: tripDetails.startDate }]);
	};

	const removeItineraryItem = (index: number) => {
		setItinerary(itinerary.filter((_, i) => i !== index));
	};

  const addSuggestedActivity = (activity: {a_description: string, dte: string }) => {
    setItinerary([...itinerary, activity]);
  }

  return (
    <Box p={5} maxWidth="600px" mx="auto">
      <Heading>Add Trip</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mt={2} mb={4}>
          <LocationDropdown setSelectedLocation={setSelectedLocation}/>
          {averageDuration !== null && (
            <Text mt={2} color="gray.500">
              Planning Tip: Trips to this location have an average duration of {averageDuration.toFixed(1)} days.
            </Text>
          )}
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
            backgroundColor={theme.colors.light}
            color={theme.colors.dark}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
            mb={2}
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
        <FormLabel>Itinerary</FormLabel>
        <Flex>
          <FormLabel flex="10" color="gray" mr={2}>Activity</FormLabel>
          <FormLabel flex="6" color="gray">Date</FormLabel>
        </Flex>
				{itinerary.map((item, index) => (
					<Flex key={index} alignItems="center" mb={2}>
						<FormControl flex="10" mr={2}>
							<Input
								name="a_description"
								value={item.a_description}
								onChange={(e) => handleItineraryChange(index, e)}
							/>
						</FormControl>
						<FormControl flex="3" mr={2}>
							<Input
								type="date"
								name="dte"
								value={item.dte}
								onChange={(e) => handleItineraryChange(index, e)}
							/>
						</FormControl>
            <FormControl flex="1">
            <IconButton
							aria-label="Delete item"
							icon={<DeleteIcon />}
							onClick={() => removeItineraryItem(index)}
						/>
            </FormControl>
					</Flex>
				))}
        <FormControl mb={4}>
          <Button 
            onClick={addItineraryItem}
            mb={2}
            backgroundColor={theme.colors.light}
            color={theme.colors.dark}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}>Add Itinerary Item</Button>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Suggested Activities</FormLabel>
          <Button
            onClick={() => setShowSuggestedItinerary(!showSuggestedItinerary)}
            mb={2}
            backgroundColor={theme.colors.light}
            color={theme.colors.dark}
            _hover={{
              backgroundColor: theme.colors.secondary,
              transition: "background-color 0.3s ease",
            }}
          >
            {showSuggestedItinerary ? "Hide Suggested Activities" : "Show Suggested Activities"}
          </Button>
          <Collapse in={showSuggestedItinerary} animateOpacity>
            <Box shadow="md" >
              {suggestedItinerary.map((item, index) => (
                <Flex key={index} alignItems="flex-end" mb={1}>
                  <FormControl flex="9" mr={2}>
                    <Input
                      name="activity"
                      value={item.a_description}
                      readOnly
                    />
                  </FormControl>
                  <FormControl flex="1">
                    <IconButton
                      aria-label="Add item"
                      icon={<AddIcon />}
                      onClick={() => addSuggestedActivity({'a_description': item.a_description, 'dte': ''})}
                    />
                  </FormControl>
                </Flex>
              ))}
            </Box>
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

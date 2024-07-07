import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getSuggestedInvitees } from "../actions/user";
import Select from 'react-select';
import { Box, Button, FormControl, FormLabel, Input, Tag, TagLabel, TagCloseButton, HStack, VStack, Heading } from '@chakra-ui/react';
import { getLocations } from "../actions/location";


export const AddTrip = () => {
  const [user, setUser] = useState<any>({});
  const [tripDetails, setTripDetails] = useState({
    location: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locations, setLocations] = useState([] as any[]);
  const [invitees, setInvitees] = useState([] as any[]);
	const [currentInvitee, setCurrentInvitee] = useState(""); 
  const [suggestedUsers, setSuggestedUsers] = useState([] as any[]);

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
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

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      if (response.status === 200) setLocations(response.data);
    } catch {
      console.error("Error fetching locations");
    }
  }

  const fetchSuggestedUsers = async () => {
    try {
      const response = await getSuggestedInvitees(token ? token : "");
      if (response.status === 200) setSuggestedUsers(response.data);
    } catch {
      console.error("Error fetching suggested users");
    }
  } 

  useEffect(() => {
    fetchUserDetails();
    fetchLocations();
    fetchSuggestedUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
  };

  const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('Trip Details:', tripDetails);
		console.log('Selected Location:', selectedLocation);
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
		setInvitees(invitees.filter(invitee => invitee !== email));
	};

  const addSuggestedInvitee = (email: String) => {
    if (!invitees.includes(email)) {
      setInvitees([...invitees, email]);
    }
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
						options={locations.map((loc) => ({ value: loc.lid, label: loc.city + ", " + loc.c_code }))}
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
					<FormLabel>Description</FormLabel>
					<Input
						type="text"
						name="description"
						value={tripDetails.description}
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
							<Button onClick={addInvitee}>Add</Button>
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
					<FormLabel>Suggested Invitees</FormLabel>
					<VStack align="stretch">
						{suggestedUsers.map((user, index) => (
							<Button
								key={index}
								onClick={() => addSuggestedInvitee(user.email)}
								variant="outline"
								colorScheme="blue"
							>
								{user.email}
							</Button>
						))}
					</VStack>
				</FormControl>
				<Button type="submit" colorScheme="blue">Add Trip</Button>
			</form>
		</Box>
	);
};
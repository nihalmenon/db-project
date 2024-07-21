import {
  Heading,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useTheme,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Activity, Trip } from "../interfaces/connectInterfaces";
import { useState } from "react";
import { ThemeButton } from "./themeButton";
import { updateTrip } from "../actions/trip";

export interface EditTripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const EditTripDetailsModal = ({
  isOpen,
  onClose,
  trip,
}: EditTripDetailsModalProps) => {
  const [startDate, setStartDate] = useState(
    formatDate(trip.start_date || new Date().toISOString())
  );
  const [endDate, setEndDate] = useState(
    formatDate(trip.end_date || new Date().toISOString())
  );
  const [bio, setBio] = useState(trip.bio || "");
  const [itinerary, setItinerary] = useState(trip.itinerary || []);

  const handleAddActivity = () => {
    setItinerary([
      ...itinerary,
      { a_no: itinerary.length + 1, a_description: "", dte: startDate },
    ]);
  };

  const theme = useTheme(); // Access Chakra UI theme

  const handleDeleteActivity = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
  };

  const handleSave = async () => {
    const updatedTrip: Trip = {
      ...trip,
      start_date: startDate,
      end_date: endDate,
      bio,
      itinerary,
    };
    
    try {
      await updateTrip(updatedTrip);
      console.log("updated trip");
    } catch (error) {
      console.log("Error updating trip: ", error);
    }
    onClose();
  };

  const handleItineraryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={theme.colors.primary}>Trip Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {trip.tid ? (
            <>
              <FormControl mb={4}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Bio</FormLabel>
                <Input value={bio} onChange={(e) => setBio(e.target.value)} />
              </FormControl>

              <Divider mt={4} mb={4} />
              <Heading size="md">Itinerary</Heading>
              <FormLabel>Itinerary Items</FormLabel>
              <Box>
                {itinerary.map((activity, index) => (
                  <Flex key={index} alignItems="center" mb={2}>
                    <FormControl flex="2" mr={2}>
                      <Input
                        type="text"
                        value={activity.a_description}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "a_description",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormControl flex="1" mr={2}>
                      <Input
                        type="date"
                        value={formatDate(
                          activity.dte || new Date()
                        )}
                        onChange={(e) =>
                          handleItineraryChange(
                            index,
                            "dte",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <IconButton
                      aria-label="Delete item"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteActivity(index)}
                      variant="outline"
                    />
                  </Flex>
                ))}
                <Button mt={2} onClick={handleAddActivity}>
                  Add Activity
                </Button>
              </Box>
            </>
          ) : (
            <Text>No trip selected.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <ThemeButton onClick={handleSave}>Save</ThemeButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

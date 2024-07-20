import {
  Heading,
  Text,
  List,
  ListItem,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  typography,
} from "@chakra-ui/react";
import { Activity, Trip } from "../interfaces/connectInterfaces";
import { useState, useEffect } from "react";
import { ThemeButton } from "./themeButton";
import { toISODate } from "../utils/commonFunctions";
import { TypePredicateKind } from "typescript";
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

  useEffect(() => {
    if (isOpen) {
      setStartDate(formatDate(trip.start_date || new Date().toISOString()));
      setEndDate(formatDate(trip.end_date || new Date().toISOString()));
      setBio(trip.bio);
      setItinerary(trip.itinerary || []);
    }
  }, [isOpen, trip]);

  const handleAddActivity = () => {
    setItinerary([
      ...itinerary,
      { a_no: itinerary.length + 1, a_description: "", dte: "" },
    ]);
  };

  const handleDeleteActivity = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
  };

  const handleSave = async () => {
    const formatedStartDate = toISODate(startDate);
    const formatedEndDate = toISODate(endDate);
    const updatedTrip: Trip = {
      ...trip,
      start_date: formatedStartDate,
      end_date: formatedEndDate,
      bio,
      itinerary,
    };
    try {
      await updateTrip(updatedTrip);
      console.log("updated trip");
    } catch(error) {
      console.log("Error updating trip: ", error);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Trip Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {trip.tid ? (
            <>
              <Text>
                <strong>Start Date:</strong>
              </Text>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                mt={2}
              />
              <Text>
                <strong>End Date:</strong>
              </Text>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                mt={2}
              />
              <Text>
                <strong>Bio:</strong>
              </Text>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />

              <Divider mt={4} mb={4} />
              <Heading size="md">Itinerary</Heading>
              <List spacing={3} mt={3}>
                {itinerary.map((activity, index) => (
                  <ListItem key={index}>
                    <Text>
                      <strong>Activity {activity.a_no}:</strong>{" "}
                    </Text>
                    <Input
                      type="text"
                      value={activity.a_description}
                      onChange={(e) => {
                        const newItinerary = [...itinerary];
                        newItinerary[index].a_description = e.target.value;
                        setItinerary(newItinerary);
                      }}
                    />
                    <Text>
                      <strong>Date:</strong>
                      <Input
                        type="date"
                        value={formatDate(
                          toISODate(activity.dte) || new Date().toISOString()
                        )}
                        onChange={(e) => {
                          const newItinerary = [...itinerary];
                          newItinerary[index].dte = toISODate(e.target.value);
                          setItinerary(newItinerary);
                        }}
                      />
                    </Text>
                    <Button
                      size="sm"
                      mt={2}
                      onClick={() => handleDeleteActivity(index)}
                      style={{
                        backgroundColor: "var(--chakra-colors-red-500)",
                        color: "white",
                      }}
                    >
                      Delete Activity
                    </Button>
                    <Divider mt={2} mb={2} />
                  </ListItem>
                ))}
              </List>
              <Button mt={4} onClick={handleAddActivity}>
                Add Activity
              </Button>
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

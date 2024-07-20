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
} from "@chakra-ui/react";
import { Trip } from "../interfaces/connectInterfaces";
import { formatDate } from "../utils/commonFunctions";
import { ThemeButton } from "./themeButton";

export interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const TripDetailsModal = ({
  isOpen,
  onClose,
  trip,
}: TripDetailsModalProps) => {
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
                <strong>Start Date:</strong> {formatDate(trip.start_date)}
              </Text>
              <Text>
                <strong>End Date:</strong> {formatDate(trip.end_date)}
              </Text>
              <Text>
                <strong>Bio:</strong> {trip.bio}
              </Text>
              <Divider mt={4} mb={4} />
              <Heading size="md">Itinerary</Heading>
              {trip?.itinerary?.length > 0 ? (
                <List spacing={3} mt={3}>
                  {trip.itinerary.map((activity, index) => (
                    <ListItem key={index}>
                      <Text>
                        <strong>Activity {activity.a_no}:</strong>{" "}
                        {activity.a_description}
                      </Text>
                      <Text>
                        <strong>Date:</strong> {formatDate(activity.dte)}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No Plans Made Yet :(</Text>
              )}
            </>
          ) : (
            <Text>No trip selected.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <ThemeButton onClick={onClose}>Close</ThemeButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

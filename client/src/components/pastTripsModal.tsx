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
    useColorMode
  } from "@chakra-ui/react";
  import { Trip } from "../interfaces/connectInterfaces";
  import { formatDate } from "../utils/commonFunctions";
  import { ThemeButton } from "./themeButton";
  
  export interface PastTripsModalProps {
    isOpen: boolean;
    onClose: () => void;
    trips: Trip[];
  }
  
  export const PastTripsModal = ({
    isOpen,
    onClose,
    trips,
  }: PastTripsModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Past trips</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
                trips.map((trip, index) => {
                    return (
                        <>
                        <Heading fontSize="2xl" mb={2}>{trip.city}, {trip.c_name}</Heading>
                        <Text>
                        <strong>Start Date:</strong>{" "}
                        {formatDate(trip.start_date)}
                        </Text>
                        <Text>
                        <strong>End Date:</strong> {formatDate(trip.end_date)}
                        </Text>
                        <Text>
                        <strong>Bio:</strong> {trip.bio}
                        </Text>
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
                        {index < trips.length-1 && (<Divider mt={4} mb={4} />)}
                        </>
                    );
                })
            }
          </ModalBody>
      
          <ModalFooter>
            <ThemeButton onClick={onClose}>Close</ThemeButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
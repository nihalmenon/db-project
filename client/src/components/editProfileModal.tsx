import { FormControl, FormHelperText, FormLabel, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, useTheme } from "@chakra-ui/react";
import { ThemeButton } from "./themeButton";
import { PhoneIcon } from "@chakra-ui/icons";

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  user: any;
}

export const EditProfileModal = ({ isOpen, onClose, onSave, user }: EditProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit Profile</ModalHeader>
      <ModalCloseButton />
      <ModalBody>

        <FormControl mb={2}>
          <FormLabel mb={0}>First name</FormLabel>
          <Input 
            placeholder={user.first_name} 
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Last name</FormLabel>
          <Input 
            placeholder={user.last_name} 
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Gender</FormLabel>
          <RadioGroup defaultValue={user.gender}>
            <HStack spacing='24px'>
              <Radio value='m'>Male</Radio>
              <Radio value='f'>Female</Radio>
              <Radio value='x'>Other</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Email</FormLabel>
          <Input type="email" 
            placeholder={user.email} 
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Phone number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <PhoneIcon color='gray.300' />
            </InputLeftElement>
            <Input type='tel' placeholder='Phone number' />
          </InputGroup>
        </FormControl>

      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <ThemeButton onClick={onSave}>Save Changes</ThemeButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

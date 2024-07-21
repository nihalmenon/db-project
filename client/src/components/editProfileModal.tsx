import { FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, useTheme } from "@chakra-ui/react";
import { ThemeButton } from "./themeButton";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { User, useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: User) => void;
  user: User;
}

export const EditProfileModal = ({ isOpen, onClose, onSave, user }: EditProfileModalProps) => {
  const [newUser, setNewUser] = useState<User>({} as User);

  const updateUser = <T extends keyof User>(key: T, value: User[T]) => {
    setNewUser(prev => {
      let next = {...prev};
      next[key] = value ? value : user[key];
      return next;
    });
  };
  
  useEffect(() => {
    user && setNewUser({...user});
  }, [user]);

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
            onChange={e => updateUser("first_name", e.target.value)}
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Last name</FormLabel>
          <Input 
            placeholder={user.last_name} 
            onChange={e => updateUser("last_name", e.target.value)}
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Gender</FormLabel>
          <RadioGroup 
            defaultValue={user.gender} 
            onChange={val => updateUser("gender", val as any)}
          >
            <HStack spacing='24px'>
              <Radio value='m'>Male</Radio>
              <Radio value='f'>Female</Radio>
              <Radio value='x'>Other</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <EmailIcon color='gray.300' />
            </InputLeftElement>
            <Input 
              placeholder={user.email} 
              onChange={e => updateUser("email", e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Phone number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <PhoneIcon color='gray.300' />
            </InputLeftElement>
            <Input 
              placeholder={user.phone} 
              onChange={e => updateUser("phone", e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Socials</FormLabel>
          <Input 
            placeholder={user.socials} 
            onChange={e => updateUser("socials", e.target.value)}
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel mb={0}>Birthday</FormLabel>
          <Input 
            type="date"
            onChange={e => updateUser("dob", e.target.value)}
          />
        </FormControl>

      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <ThemeButton onClick={() => onSave(newUser)}>Save Changes</ThemeButton>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

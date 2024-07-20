import { Box, Divider, Flex, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useTheme, Text } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser"
import { PopDestQuery } from "../interfaces/statsInterfaces";
import { useState } from "react";

export const Stats = () => {
  const user = useUser();
  const theme = useTheme();
  const [filterOptions, setFilterOptions] = useState<PopDestQuery>({
    minAge: 20,
    maxAge: 65,
    gender: 'x',
  } as PopDestQuery);
  
  const onChangeMinAge = (value: string) => {
    setFilterOptions(old => {
      return { ...old, minAge: Number(value) };
    });
  };
  const onChangeMaxAge = (value: string) => {
    setFilterOptions(old => {
      return { ...old, maxAge: Number(value) };
    });
  };
  const onChangeGender = (e: any) => {
    setFilterOptions(old => {
      return { ...old, gender: e.target.value };
    });
  };

  return (
    <Box p={5}>
      <Heading color={theme.colors.primary}>Most Popular Destinations</Heading>

      <Divider m={6} />

      <Heading size="lg" mb={4} color={theme.colors.secondary}>Filters</Heading>
      <Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" fontWeight="medium" color={theme.colors.primary}>min age</Text>
        <NumberInput 
          bg={theme.colors.white} 
          step={5} 
          defaultValue={20} 
          min={20} 
          max={filterOptions.maxAge}
          mr={3}
          onChange={onChangeMinAge}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" fontWeight="medium" color={theme.colors.primary}>max age</Text>
        <NumberInput 
          bg={theme.colors.white} 
          step={5} 
          defaultValue={30} 
          min={filterOptions.minAge}
          max={65}
          mr={3}
          onChange={onChangeMaxAge}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" fontWeight="medium" color={theme.colors.primary}>gender</Text>
        <Select 
          bg={theme.colors.white} 
          variant="outline" 
          w={['100%', '100%', '250px']} 
          placeholder='Select gender'
          onChange={onChangeGender}
        >
          <option value='m'>Male</option>
          <option value='f'>Female</option>
          <option value='x'>Other</option>
        </Select>
      </Flex>

      </Flex>

    </Box>
  );
}

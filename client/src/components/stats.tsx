import { Box, Divider, Flex, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, useTheme, Text } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser"

export const Stats = () => {
  const user = useUser();
  const theme = useTheme();
  
  return (
    <Box p={5}>
      <Heading color={theme.colors.primary}>Most Popular Destinations</Heading>

      <Divider m={6} />

      <Heading size="lg" mb={4} color={theme.colors.secondary}>Filters</Heading>
      <Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" color={theme.colors.black}>min age</Text>
        <NumberInput 
          bg={theme.colors.white} 
          step={5} 
          defaultValue={20} 
          min={20} 
          max={65}
          mr={3}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" color={theme.colors.black}>max age</Text>
        <NumberInput 
          bg={theme.colors.white} 
          step={5} 
          defaultValue={30} 
          min={20} 
          max={65}
          mr={3}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Flex direction="column">
        <Text ml="1" mb="1" fontSize="md" color={theme.colors.black}>gender</Text>
        <Select 
          bg={theme.colors.white} 
          variant="outline" 
          w={['100%', '100%', '250px']} 
          placeholder='Select gender'
        >
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>

      </Flex>

    </Box>
  );
}

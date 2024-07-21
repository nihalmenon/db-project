import { Box, Divider, Flex, Heading, Select, useTheme, Text, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser"
import { PopDestQuery } from "../interfaces/statsInterfaces";
import { useEffect, useState } from "react";
import { usePopularDestinations } from "../hooks/usePopularDestinations";

const DEFAULT_MIN_AGE = 20;
const DEFAULT_MAX_AGE = 35;

export const Stats = () => {
  const user = useUser();
  const theme = useTheme();
  const { data: popularDestinations, refresh: refreshPopularDestinations } = usePopularDestinations();
  
  const [filterOptions, setFilterOptions] = useState<PopDestQuery>({
    minAge: DEFAULT_MIN_AGE,
    maxAge: DEFAULT_MAX_AGE,
  } as PopDestQuery);
  
  const onChangeAge = (range: [number, number]) => {
    setFilterOptions(old => {
      return { ...old, minAge: range[0], maxAge: range[1] };
    });
  };
  const onChangeGender = (e: any) => {
    setFilterOptions(old => {
      return { ...old, gender: e.target.value };
    });
  };

  const {colorMode} = useColorMode();
  useEffect(() => {
    refreshPopularDestinations(filterOptions);
  }, [filterOptions.gender]);

  return (
    <Box p={5}>
      <Heading color={theme.colors.primary[colorMode]}>Most Popular Destinations</Heading>
      <Divider m={8} />
      <Flex>

      <Flex direction="column" w={['50%', '50%', '400px']} mr={10}>
        <Text ml="1" mb="1" fontSize="md" fontWeight="medium" color={theme.colors.primary[colorMode]}>Age range</Text>
        <RangeSlider 
          min={18}
          max={65}
          step={1} 
          aria-label={['min', 'max']} 
          defaultValue={[DEFAULT_MIN_AGE, DEFAULT_MAX_AGE]}
          ml={5}
          onChange={onChangeAge}
          onChangeEnd={() => refreshPopularDestinations(filterOptions)}
        >
          <RangeSliderTrack bg={theme.colors.secondary[colorMode]}>
            <RangeSliderFilledTrack bg={theme.colors.primary[colorMode]} />
          </RangeSliderTrack>
          <RangeSliderThumb fontSize="md" fontWeight="bold" color={theme.colors.primary[colorMode]} boxSize={8} index={0}>
            <Text>{filterOptions.minAge}</Text>
          </RangeSliderThumb>
          <RangeSliderThumb fontSize="md" fontWeight="bold" color={theme.colors.primary[colorMode]} boxSize={8} index={1}>
            <Text>{filterOptions.maxAge}</Text>
          </RangeSliderThumb>
        </RangeSlider>
      </Flex>

           
      <Flex direction="column" w={['50%', '50%', '250px']}>
        <Text ml="1" mb="1" fontSize="md" fontWeight="medium" color={theme.colors.primary[colorMode]}>Gender</Text>
        <Select 
          bg={theme.colors.dark[colorMode]} 
          variant="outline" 
          placeholder='Select gender'
          onChange={onChangeGender}
        >
          <option value='m'>Male</option>
          <option value='f'>Female</option>
          <option value='x'>Other</option>
        </Select>
      </Flex>

      </Flex>


      <TableContainer 
        mt={5}
        bg={theme.colors.light[colorMode]}
        border={"2px solid"}
        borderColor={"gray.200"}
        rounded="lg"
      >
        <Table 
          variant="simple"
          size="lg"
          >
          <Thead>
            <Tr>
              <Th>Location</Th>
              <Th isNumeric>Number of Trips</Th>
            </Tr>
          </Thead>
          <Tbody>
            {popularDestinations.map(dest => {
              return (
                <Tr>
                  <Td color={theme.colors.textlight[colorMode]}>{dest.city}, {dest.c_name}</Td>
                  <Td isNumeric color={theme.colors.textlight[colorMode]}>{dest.trip_count}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>


    </Box>
  );
}

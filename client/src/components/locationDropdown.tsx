import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Box, Spinner } from '@chakra-ui/react';
import { searchLocations } from '../actions/location';

type LocationDropdownProps = {
  setSelectedLocation: (location: any) => void;
};

export const LocationDropdown = ({ setSelectedLocation }: LocationDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await searchLocations(searchQuery);
      if (response.status === 200) {
        const formattedOptions = response.data.map((loc: any) => ({
          value: loc.lid,
          label: `${loc.city}, ${loc.c_code}`
        }));
        setOptions(formattedOptions);
      }
    } catch {
      console.error("Error fetching locations");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.length >= 2) {
      fetchLocations();
    } else {
      setOptions([]);
    }
  }, [searchQuery]);

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedLocation = options.find(option => option.value === selectedOption.value);
      setSelectedLocation(selectedLocation);
    }
  };

  return (
    <Box>
      <Select
        options={options}
        onInputChange={(inputValue) => setSearchQuery(inputValue)}
        onChange={handleChange}
        placeholder="Start typing to search"
        isClearable
      />
    </Box>
  );
};

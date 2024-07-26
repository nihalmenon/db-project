import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode, useTheme } from "@chakra-ui/react"
import { useLocation } from 'react-router-dom';

const style: any = {
  default: {
    position: "fixed", 
    top: "15px", 
    right: "15px",
  },
  dashboard: {
    display: "none",
  },
};

export const DarkmodeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const location = useLocation();

  return (
    <IconButton
      style={location.pathname === "/dashboard" ? style.dashboard : style.default}
      onClick={toggleColorMode}
      borderWidth={2}
      variant='outline'
      colorScheme={theme.colors.primary[colorMode]}
      aria-label='Darkmode Toggle'
      icon={colorMode === "light" ? <MoonIcon w={5} h={5} /> : <SunIcon w={5} h={5} />}
    />
  );
};

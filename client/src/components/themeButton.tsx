import { Button, ButtonProps, useTheme, useColorMode } from "@chakra-ui/react"
import { ReactNode } from "react"

export interface ThemeButtonProps extends ButtonProps {
    onClick?: () => void, 
    children?: ReactNode,
}

export const ThemeButton = ({ onClick, children }: ThemeButtonProps) => {
    const theme = useTheme();
    const { colorMode} = useColorMode();
    return (
        <Button
            backgroundColor={theme.colors.primary[colorMode]}
            color={theme.colors.textlight[colorMode]}
            onClick={onClick}
            _hover={{
            backgroundColor: theme.colors.secondary[colorMode],
            transition: "background-color 0.3s ease",
            }}
            size="md"
            mb={2}
        >
        {children}
      </Button>
    )
}
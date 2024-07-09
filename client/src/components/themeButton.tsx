import { Button, useTheme } from "@chakra-ui/react"
import { ReactNode } from "react"

export interface ThemeButtonProps {
    onClick?: () => void, 
    children?: ReactNode,
}

export const ThemeButton = ({ onClick, children }: ThemeButtonProps) => {
    const theme = useTheme();
    return (
        <Button
            backgroundColor={theme.colors.primary}
            color={theme.colors.textlight}
            onClick={onClick}
            _hover={{
            backgroundColor: theme.colors.secondary,
            transition: "background-color 0.3s ease",
            }}
            size="md"
            mb={2}
        >
        {children}
      </Button>
    )
}
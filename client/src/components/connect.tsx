import { Box } from "@chakra-ui/react"
import { useUser } from "../hooks/useUser";

export const Connect = () => {
    const user = useUser();
    
    return (
        <Box minH="100vh">
            <p>hello world</p>
        </Box>
    );
};

export default Connect;

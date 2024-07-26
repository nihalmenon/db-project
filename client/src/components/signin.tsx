import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { loginUser } from "../actions/user";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DarkmodeButton } from "./darkmodeButton";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      email: email,
      pwd: password,
    };

    try {
      const response = await loginUser(userData);
      if (response.status === 200) {
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color={theme.colors.primary[colorMode]}>Sign In</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={theme.colors.accent2[colorMode]}
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!error}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      backgroundColor={theme.colors.primary[colorMode]}
                      color={theme.colors.textlight[colorMode]}
                      _hover={{
                        backgroundColor: theme.colors.secondary[colorMode],
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  {/* <Link>forgot password?</Link> */}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                backgroundColor={theme.colors.primary[colorMode]}
                color={theme.colors.textlight[colorMode]}
                _hover={{
                  backgroundColor: theme.colors.secondary[colorMode],
                  transition: "background-color 0.3s ease",
                }}
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link
          as={RouterLink}
          to="/signup"
          color={theme.colors.highlight[colorMode]}
          href="#"
        >
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default SignIn;

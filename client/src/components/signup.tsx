import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  InputRightElement,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { registerUser } from "../actions/user";
import toast from "react-hot-toast";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaCalendarAlt = chakra(FaCalendarAlt);
const CFaEnvelope = chakra(FaEnvelope);

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const {colorMode} = useColorMode();
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      email: email,
      pwd: password,
    };

    try {
      const response = await registerUser(userData);

      if (response.status === 201) {
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        toast.success("User created successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the account.");
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
        <Heading color={theme.colors.primary[colorMode]}>Sign Up</Heading>
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
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaCalendarAlt color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color={theme.colors.primary[colorMode]}
                    children={<CFaLock color={theme.colors.primary[colorMode]} />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
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
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link
          as={RouterLink}
          to="/signin"
          color={theme.colors.highlight[colorMode]}
          href="#"
        >
          Sign In
        </Link>
      </Box>
    </Flex>
  );
};

export default SignUp;

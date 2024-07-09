import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			backgroundColor="gray.100"
			padding={4}
		>
			<Heading as="h1" size="2xl" mb={4} color="red.500">
				404
			</Heading>
			<Text fontSize="xl" mb={4}>
				Page Not Found
			</Text>
			<Text mb={8}>
				Sorry, the page you're looking for doesn't exist.
			</Text>
			<Button as={Link} to="/" colorScheme="teal" size="lg">
				Go Home
			</Button>
		</Box>
	);
};

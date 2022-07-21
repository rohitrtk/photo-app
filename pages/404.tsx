import {
  Center,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";

const PageNotFound = () => {
  return (
    <Center h="80vh">
      <VStack>
        <Text
          fontSize="5xl"
          color={useColorModeValue("gray.500", "gray.100")}
        >
          404 | Page Not Found
        </Text>
        <Text
          fontSize="lg"
          color={useColorModeValue("gray.500", "gray.100")}
        >
          We're sorry, we couldn't find the page you were looking for.
        </Text>
      </VStack>
    </Center>
  );
}

export default PageNotFound;
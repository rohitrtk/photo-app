import React from "react";
import {
  VStack,
  Image,
  Box,
  Flex,
  Text,
  Link
} from "@chakra-ui/react";
import NavLink from "next/Link";

interface Props {
  src: string;
  username?: string;
  showUsername?: boolean;
}

const Post: React.FC<Props> = ({ src, username = "", showUsername = true }) => {
  return (
    <Box mb={2}>
      <VStack spacing={0.5}>
        <Image
          src={src}
          w="100%"
          cursor="pointer"
          onClick={() => {
            console.log("hi");
          }} />
        {
          showUsername ?
            <Box w="100%">
              <Flex alignItems="left">
                <NavLink href="#" passHref>
                  <Link href="#">
                    <Text fontSize="sm">@{username}</Text>
                  </Link>
                </NavLink>
              </Flex>
            </Box>
            :
            null
        }
      </VStack>
    </Box>
  );
}

export default Post;
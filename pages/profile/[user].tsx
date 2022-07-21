import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Avatar,
  VStack,
  Text
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";
import Post from "../../components/Post";

const User = () => {

  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (<></>);
  }

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
    >
      <Center h="150px" margin={1}>
        <VStack>
          <Avatar size="xl" bg="teal.500" />
          <Text>{user.displayName}</Text>
        </VStack>
      </Center>
      <Box h="85vh">
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={2}
          h="100%"
          m={2}
        >
          <GridItem colSpan={1}>
          </GridItem>
          <GridItem colSpan={1}>
          </GridItem>
          <GridItem colSpan={1}>
          </GridItem>
          <GridItem colSpan={1}>

          </GridItem>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default User;
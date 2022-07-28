import React from "react";
import {
  Center,
  Text,
  VStack,
  Heading,
  Divider,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from "framer-motion";

import links from "../../public/json/aboutLinks.json";

const About = () => {
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
      <Center pt={10}>
        <VStack>
          <Heading as="h2" size="2xl">
            This site was built using
          </Heading>
          <Divider />
          {
            links.map(({ href, title, desc }) => {
              return (
                <VStack spacing={1} key={title}>
                  <Link href={href}>
                    <Heading as="h6" size="lg">{title}</Heading>
                  </Link>
                  <Text fontSize="2xs" color={useColorModeValue("gray.500", "gray.100")}>{desc}</Text>
                </VStack>
              );
            })
          }
        </VStack>
      </Center>
    </motion.div>
  );
}

export default About;
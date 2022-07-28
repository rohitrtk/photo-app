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

import Fade from "../../components/Fade";

import links from "../../public/json/aboutLinks.json";

const About = () => {
  return (
    <Fade>
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
    </Fade>
  );
}

export default About;
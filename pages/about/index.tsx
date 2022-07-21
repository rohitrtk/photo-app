import React from "react";
import { Center, Text, VStack, Heading, Divider, Link } from '@chakra-ui/react';
import { motion } from "framer-motion";

const links = [
  {
    href: "https://nextjs.org/",
    desc: "Next.js"
  },
  {
    href: "https://chakra-ui.com/",
    desc: "Chakra for UI"
  },
  {
    href: "https://www.framer.com/motion/",
    desc: "Framer Motion for animations"
  },
  {
    href: "https://firebase.google.com/",
    desc: "Firebase for authentication & storage"
  },
];

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
      <Center h="400px">
        <VStack spacing={6}>
          <Heading as="h2" size="xl">
            This site was built using
          </Heading>
          <Divider />
          {
            links.map(({ href, desc }) => {
              return (
                <Link href={href} key={href}>
                  <Text fontSize="2xl">{desc}</Text>
                </Link>
              );
            })
          }
        </VStack>
      </Center>
    </motion.div>
  );
}

export default About;
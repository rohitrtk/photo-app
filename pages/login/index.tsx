import React, { useRef } from "react";
import {
  Flex,
  FormControl,
  Input,
  Stack,
  Button,
  Center,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Link from "next/Link";
import { motion } from "framer-motion";

const Login = () => {

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
      <Flex alignItems="center" justifyContent="center">
        <Center h="75vh">
          <FormControl>
            <Stack spacing="5">
              <Input ref={usernameRef} id="username" placeholder="Username" variant="flushed" size="md" />
              <Input ref={passwordRef} id="password" placeholder="Password" variant="flushed" size="md" type="password" />
              <Flex alignItems="center" justifyContent="center">
                <Button>Sign In</Button>
              </Flex>
              <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.100")}>
                <Link href="/register">
                  Don't have an account? Register here.
                </Link>
              </Text>
            </Stack>
          </FormControl>
        </Center>
      </Flex>
    </motion.div>
  );
}

export default Login;
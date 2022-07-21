import React, { useRef, MouseEvent } from "react";
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

import { useAuth } from "../../context/AuthContext";

const Register = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { user, register } = useAuth();

  const handleRegister = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const emailValue = emailRef.current?.value;
    const displayNameValue = displayNameRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    try {
      await register(emailValue, displayNameValue, passwordValue);
    } catch (error) {
      console.error(error);
    }
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
      <Flex alignItems="center" justifyContent="center">
        <Center h="75vh">
          <FormControl>
            <Stack spacing="5">
              <Input ref={emailRef} id="email" placeholder="Email Address" variant="flushed" size="md" />
              <Input ref={displayNameRef} id="displayName" placeholder="Display Name" variant="flushed" size="md" />
              <Input ref={passwordRef} id="password" placeholder="Password" variant="flushed" size="md" type="password" />
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={handleRegister}>Register</Button>
              </Flex>
              <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.100")}>
                <Link href="/login">
                  Already have an account? Sign in here.
                </Link>
              </Text>
            </Stack>
          </FormControl>
        </Center>
      </Flex>
    </motion.div>
  );
}

export default Register;
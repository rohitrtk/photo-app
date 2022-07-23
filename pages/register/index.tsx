import React, { useState, useRef, MouseEvent } from "react";
import {
  Flex,
  FormControl,
  Input,
  Stack,
  Button,
  Center,
  Text,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import Link from "next/Link";
import { motion } from "framer-motion";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

const Register = () => {

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

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
      const res = await axios.post("http://localhost:3000/api/register", {
        email: emailValue,
        displayName: displayNameValue,
        password: passwordValue
      });

      const { data } = res;
      if ("error" in data) {
        console.log(data.error);
      } else {
        setRegistrationSuccess(true);
      }

    } catch (e) {
      console.error(e);
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
          {
            registrationSuccess ?
              <Stack>
                <Heading as="h2" size="md">You have registered successfully</Heading>
                <Center>
                  <Text fontSize="md" color={useColorModeValue("gray.500", "gray.100")}>
                    <Link href="/login">
                      Click here to log in
                    </Link>
                  </Text>
                </Center>
              </Stack>
              :
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
          }
        </Center>
      </Flex>
    </motion.div>
  );
}

export default Register;
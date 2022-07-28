import React, { useState, useRef, useContext, MouseEvent } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { writeBatch, doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import { auth, fs } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

const Register = () => {

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegister = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const emailValue = emailRef.current?.value;
    const displayNameValue = displayNameRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!emailValue) {
      return;
    }

    if (!displayNameValue) {
      return;
    }

    if (!passwordValue) {
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

      const userDoc = doc(fs, `users/${user.uid}`);
      const usernameDoc = doc(fs, `usernames/${displayNameValue}`);

      const batch = writeBatch(fs);
      batch.set(userDoc, {
        username: displayNameValue,
        photoURL: user.photoURL,
        displayName: user.displayName
      });
      batch.set(usernameDoc, {
        uid: user.uid
      });

      await batch.commit();
    } catch (e) {
      console.error(e);
    }

    setRegistrationSuccess(true);
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
              <form>
                <FormControl>
                  <Stack spacing="5">
                    <Input ref={emailRef} id="email" placeholder="Email Address" variant="flushed" size="md" />
                    <Input ref={displayNameRef} id="displayName" placeholder="Display Name" variant="flushed" size="md" />
                    <Input ref={passwordRef} id="password" placeholder="Password" variant="flushed" size="md" type="password" />
                    <Flex alignItems="center" justifyContent="center">
                      <Button type="submit" onClick={handleRegister}>Register</Button>
                    </Flex>
                    <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.100")}>
                      <Link href="/login">
                        Already have an account? Sign in here.
                      </Link>
                    </Text>
                  </Stack>
                </FormControl>
              </form>
          }
        </Center>
      </Flex>
    </motion.div>
  );
}

export default Register;
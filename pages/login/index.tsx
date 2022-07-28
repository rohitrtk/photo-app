import React, { useRef, useContext, useEffect, MouseEvent } from "react";
import { useRouter } from "next/router";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";

import { auth } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

const Login = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && username) {
      router.push("/");
    }
  }, [user, username]);

  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!emailValue) {
      console.log("Enter email");
      return;
    }

    if (!passwordValue) {
      console.log("Enter password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);

      // Go to home on success
      router.push("/");
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
          <form>
            <FormControl>
              <Stack spacing="5">
                <Input ref={emailRef} id="email" placeholder="Email Address" variant="flushed" size="md" />
                <Input ref={passwordRef} id="password" placeholder="Password" variant="flushed" size="md" type="password" />
                <Flex alignItems="center" justifyContent="center">
                  <Button type="submit" onClick={handleLogin}>Sign In</Button>
                </Flex>
                <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.100")}>
                  <Link href="/register">
                    Don't have an account? Register here.
                  </Link>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Center>
      </Flex>
    </motion.div>
  );
}

export default Login;


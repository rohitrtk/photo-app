import React, { ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  IconButton,
  Image
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';
import NextLink from "next/Link";
import { signOut, User } from "firebase/auth";

import { LoginIcon, LogoutIcon, AddIcon } from "./Icons";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/context";

interface INavbarLink {
  children: ReactNode;
  href?: string;
}

const NavbarLink = ({ children, href }: INavbarLink) => {
  return (
    <NextLink
      href={href ? href : "#"}
      passHref
    >
      <Link
        px={2}
        py={1}
        rounded="md"
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700")
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
}

const Navbar = () => {

  const { user } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>
              <NextLink href="/" passHref>
                <Link>
                  <Image
                    src="/logo.png"
                    boxSize="50px"
                    filter={`invert(${useColorModeValue("0%", "100%")})`} />
                </Link>
              </NextLink>
            </Box>
            <HStack
              as="nav"
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Links user={user} />
            </HStack>
          </HStack>
          <Buttons user={user} />
        </Flex>

        { // Hamburger
          isOpen &&
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Links user={user} />
            </Stack>
          </Box>
        }
      </Box>
    </>
  );
}

export default Navbar;

interface ILink {
  name: string;
  href: string;
}

const links: ILink[] = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "About",
    href: "/about"
  }
];

const Links = ({ user }: { user: User | null | undefined }) => {
  return (
    <>
      {
        links.map(({ name, href }) => <NavbarLink key={name} href={href}>{name}</NavbarLink>)
      }
      {
        user && <NavbarLink key={"Profile"} href="/profile">Profile</NavbarLink>
      }
    </>
  );
}

const Buttons = ({ user }: { user: User | null | undefined }) => {

  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <HStack
      spacing={1}
    >
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      {
        user &&
        <IconButton
          aria-label="upload"
          icon={<AddIcon />}
          onClick={() => {
            router.push("/upload");
          }}
        />
      }
      <NextLink href={user ? "/" : "/login"}>
        <IconButton
          aria-label="login"
          icon={user ? <LogoutIcon /> : <LoginIcon />}
          onClick={handleLogout}
        >
        </IconButton>
      </NextLink>
    </HStack>
  );
}
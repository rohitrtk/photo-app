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
  Image,
  Center
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from "next/Link";

import { useAuth } from "../context/AuthContext";
import { LoginIcon, LogoutIcon, AddIcon } from "./Icons";
import { Router } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/context";

interface LinkProps {
  name: string;
  href: string;
}

const links: Array<LinkProps> = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "About",
    href: "/about"
  }
];

interface NavbarLinkProps {
  children: ReactNode;
  href?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ children, href }) => {
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

  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

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
              <Link href="/">
                <Image
                  src="/logo.png"
                  boxSize="50px"
                  filter={`invert(${useColorModeValue("0%", "100%")})`} />
              </Link>
            </Box>
            <HStack
              as="nav"
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {
                links.map(({ name, href }) => <NavbarLink key={name} href={href}>{name}</NavbarLink>)
              }
              {
                user ? <NavbarLink key={"Profile"} href="/profile">Profile</NavbarLink> : null
              }
            </HStack>
          </HStack>
          <HStack
            spacing={1}
          >
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {
              user ?
                <IconButton
                  aria-label="upload"
                  icon={<AddIcon />}
                  onClick={() => {
                    router.push("/upload");
                  }}
                />
                :
                null
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
        </Flex>

        {isOpen ?
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {
                links.map(({ name, href }) => <NavbarLink key={name} href={href}>{name}</NavbarLink>)
              }
            </Stack>
          </Box>
          : null
        }
      </Box>
    </>
  );
}

export default Navbar;
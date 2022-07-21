import React, { ReactNode } from "react";
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
    name: "Sign In",
    href: "/login"
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
        rounded={"md"}
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

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {/* Logo */}
            <Box>
              <Link href="/">
                <Image src="/logo.png" boxSize="50px" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {
                links.map(({ name, href }) => <NavbarLink key={name} href={href}>{name}</NavbarLink>)
              }
            </HStack>
          </HStack>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
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
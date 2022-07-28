import React, { useState, useEffect, useContext } from "react";
import {
  VStack,
  HStack,
  Image,
  Box,
  Flex,
  Text,
  Link,
  Spacer
} from "@chakra-ui/react";
import NavLink from "next/Link";
import { useRouter } from "next/router";
import { collection, doc, setDoc } from "firebase/firestore";

import { fs } from "../lib/firebase";
import { UserContext } from "../lib/context";
import LikeComponent from "../components/Like";

interface IPostProps {
  src: string;
  id: string;
  username: string;
  likes: number;
  timestamp?: string;
  showUsername?: boolean;
  showLikeButton?: boolean;
  enableClick?: boolean;
}

const Post = ({ src, id, username, likes, timestamp,
  showUsername = true,
  showLikeButton = true,
  enableClick = true
}: IPostProps) => {
  const router = useRouter();
  const uContext = useContext(UserContext);

  const [liked, setLiked] = useState<boolean>(false);

  const onLike = async () => {
    if (!uContext.user) return;

    const d = doc(fs, `usernames/${uContext.username}/uploads/${id}/likes/${(uContext.user as any).uid}`);
    try {
      await setDoc(d, {});
    } catch (e) {
      console.error(e);
    }

    setLiked(!liked);
  }

  return (
    <Box mb={2}>
      <VStack spacing={0.5}>
        <Image
          src={src}
          w="100%"
          h="100%"
          cursor={enableClick ? "pointer" : "default"}
          onClick={() => {
            if (!enableClick) return;
            router.push(`/profile/${username}/media/${id}`);
          }}
        />
        {
          showUsername ?
            <Box w="100%">
              <Flex w="100%">
                <HStack>
                  <NavLink href={`/profile/${username}`} passHref>
                    <Link>
                      <Text fontSize="sm">@{username}</Text>
                    </Link>
                  </NavLink>

                </HStack>
                <Spacer />
                {
                  timestamp &&
                  <Text fontSize="sm">
                    {(new Date(parseInt(timestamp))).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric"
                    })}
                  </Text>
                }
              </Flex>
            </Box>
            :
            null
        }
      </VStack>
    </Box>
  );
}
//<LikeComponent path={`usernames/${username}/uploads/${id}`} />}
export default Post;
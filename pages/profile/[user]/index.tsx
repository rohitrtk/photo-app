import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Center,
  Avatar,
  VStack,
  Text
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ref, list, getDownloadURL } from "firebase/storage";

import { useAuth } from "../../../context/AuthContext";
import { storage } from "../../../config/firebase";
import GridLayout, { MediaItem } from "../../../components/GridLayout";

const User = () => {

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { user } = useAuth();

  const mediaRef = ref(storage, `${user.uid}/media`);

  useEffect(() => {
    const getItems = async () => {
      const res = await list(mediaRef, {
        maxResults: 10
      });

      const { items } = res;
      let _mediaItems: MediaItem[] = [];
      for (const itemRef of items) {
        console.log(itemRef.fullPath);
        const downloadUrl = await getDownloadURL(ref(storage, `${itemRef}`));
        _mediaItems.push({
          url: downloadUrl,
          username: user.displayName
        });
      }

      setMediaItems([..._mediaItems]);
      setLoaded(true);
    }

    getItems();
  }, []);


  if (!user) {
    return (<></>);
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
      <Center h="150px" margin={1}>
        <VStack>
          <Avatar size="xl" bg="teal.500" />
          <Text>{user.displayName}</Text>
        </VStack>
      </Center>
      <Box h="85vh">
        {loaded && <GridLayout mediaItems={mediaItems} />}
      </Box>
    </motion.div>
  );
}

export default User;

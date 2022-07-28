import React, { useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import {
  Box,
  Center,
  Avatar,
  VStack,
  Text
} from "@chakra-ui/react";

import { getUserWithUsername, docToJSON, fs } from "../../../lib/firebase";
import { UserContext } from "../../../lib/context";
import GridLayout, { MediaItem } from "../../../components/GridLayout";
import Fade from "../../../components/Fade";

interface IProps {
  user: any;
  uploads: [];
}

const Profile = ({ user, uploads }: IProps) => {

  return (
    <Fade>
      <Center h="150px" margin={1}>
        <VStack>
          <Avatar size="xl" bg="teal.500" />
          <Text>@{user.username}</Text>
        </VStack>
      </Center>
      <Box h="85vh">
        <GridLayout mediaItems={uploads} />
      </Box>
    </Fade>
  );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = (context as any).query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true
    }
  }

  const user = userDoc.data();
  const userCollection = collection(fs, `usernames/${username}/uploads`);
  const q = query(userCollection, orderBy("timestamp", "desc"), limit(5));
  const uploads = (await getDocs(q)).docs.map(docToJSON);

  return {
    props: {
      user,
      uploads
    }
  }
}

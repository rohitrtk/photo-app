import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from 'next';
import {
  getDocs,
  collectionGroup,
  DocumentData,
  doc,
  getDoc
} from "firebase/firestore";
import {
  Box,
  Center
} from "@chakra-ui/react";

import { fs, docToJSON } from "../../../../lib/firebase";
import Post from "../../../../components/Post";

interface IMediaProps {
  data: DocumentData;
}

const Media = ({ data }: IMediaProps) => {

  const { downloadURL, timestamp, username, id, likes } = data;

  return (
    <>
      <Center>
        <Box w="25%" h="25%">
          <Post
            src={downloadURL}
            id={id}
            username={username}
            likes={likes}
            timestamp={timestamp}
            showUsername={true}
            enableClick={false}
          />
        </Box>
      </Center>
    </>
  );
}

export default Media;

export const getStaticPaths = async () => {
  const uploadDocs = await getDocs(collectionGroup(fs, "uploads"));

  const paths = uploadDocs.docs.map((doc: DocumentData) => {

    const { username } = doc.data();

    return {
      params: {
        username,
        id: doc.id
      }
    }
  });

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, id } = params as any;

  const d = doc(fs, `usernames/${username}/uploads/${id}`);
  const data = docToJSON(await getDoc(d));

  return {
    props: {
      data
    },
    revalidate: 5000
  }
}

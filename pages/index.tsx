import { useContext } from "react";
import { Box } from '@chakra-ui/react';
import { motion } from "framer-motion";
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  getDocs,
  DocumentData
} from "firebase/firestore";

import GridLayout from "../components/GridLayout";
import { UserContext } from "../lib/context";
import { fs, docToJSON } from "../lib/firebase";

interface IHomeProps {
  uploads: DocumentData[];
}

const Home = ({ uploads }: IHomeProps) => {
  const { user } = useContext(UserContext);

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1
        }
      }}
      exit={{
        opacity: 0
      }}
    >
      <GridLayout mediaItems={uploads as []} />
    </motion.div>
  );
}

export default Home;

export const getServerSideProps = async () => {
  const uploadCollection = collectionGroup(fs, "uploads");
  const uploadQuery = query(uploadCollection, orderBy("timestamp", "desc"), limit(4));
  const uploads = (await getDocs(uploadQuery)).docs.map(docToJSON);

  return {
    props: {
      uploads
    }
  }
}

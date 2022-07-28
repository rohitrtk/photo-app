import { useContext } from "react";
import {
  Box,
  Text
} from '@chakra-ui/react';
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  getDocs,
  DocumentData
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { UserContext } from "../lib/context";
import { fs, auth, docToJSON } from "../lib/firebase";
import GridLayout from "../components/GridLayout";
import Fade from "../components/Fade";

interface IHomeProps {
  uploads: DocumentData[];
}

const Home = ({ uploads }: IHomeProps) => {

  const { user } = useContext(UserContext);
  //const [user] = useAuthState(auth);

  return (
    <Fade>
      <GridLayout mediaItems={uploads as []} />
    </Fade>
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

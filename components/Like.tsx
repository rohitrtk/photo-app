import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, writeBatch, increment } from "firebase/firestore";
import {
  Flex,
  Text
} from "@chakra-ui/react";

import { fs, auth } from "../lib/firebase";
import { HeartIcon } from "./Icons";

interface ILikeComponent {
  path: string;
}

const LikeComponent = ({ path }: ILikeComponent) => {
  if (path.at(-1) !== "/") path += "/";

  const likeRef = doc(fs, `${path}${auth.currentUser?.uid}`);
  const [likeDoc] = useDocument(likeRef);

  const addLike = async () => {
    const uid = auth.currentUser?.uid;
    const batch = writeBatch(fs);

    batch.update(doc(fs, `path`,), { likes: increment(1) });
    batch.set(likeRef, { uid });

    await batch.commit();
  }

  const removeLike = async () => {
    const batch = writeBatch(fs);

    batch.update(doc(fs, path), { likes: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  }

  return (
    <Flex>
      <HeartIcon filled={likeDoc?.exists()} onClick={() => {
        likeDoc?.exists() ? removeLike() : addLike();
      }} />
      <Text fontSize="sm"></Text>
    </Flex>
  );
}

export default LikeComponent;
import React, { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  Center,
  Input,
  Box,
  Image,
  Button,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Modal,
  ModalOverlay,
  ModalBody,
  useDisclosure,
  Text,
  HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  StorageError
} from "firebase/storage";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { v4 } from "uuid";

import { storage, fs } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

const Upload = () => {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { user, username } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    if (!user || !username) {
      router.push("/login");
    }
  }, []);

  const handleUpload = () => inputRef.current?.click();

  const handleFileInput = (event: ChangeEvent) => {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files;

    if (files && files[0]) {
      setImageFile(files[0]);
    }
  }

  const handlePostPhoto = async () => {
    if (!imageFile) {
      return;
    }

    onOpen();

    // Create a uuid and remove the dashes for the uploaded photos name
    const fileName = v4().replaceAll("-", "");

    // Set the storage reference
    const userStorageRef = ref(storage, `${(user as any).uid}/media/${fileName}.jpg`);

    // Convert the image file to an array buffer and begin uploading
    const fileArrayBuffer = await imageFile.arrayBuffer();
    const uploadTask = uploadBytesResumable(userStorageRef, fileArrayBuffer);

    uploadTask.on("state_changed",
      // On snapshot progress changed
      (snapshot: UploadTaskSnapshot) => {
        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      // On error
      (error: StorageError) => {
        onClose();
        console.error(error);
      },
      // On success
      async () => {
        onClose();
        setUploadProgress(0);
        setUploadSuccess(true);

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const userCollection = doc(fs, `usernames/${username}/uploads/${fileName}`);
        await setDoc(userCollection, {
          downloadURL,
          username,
          timestamp: serverTimestamp()
        });
      });
  }

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const imageUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [imageFile]);

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
      <Center h="80vh">
        {
          uploadSuccess ?
            <Text fontSize="4xl">Photo posted!</Text>
            :
            <>
              <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bgColor="rgba(220, 220, 220, 0.6)">
                  <ModalBody>
                    <Center h="80vh">
                      <Box bgColor="rgb(237, 242, 247)" p={5} sx={{
                        borderRadius: "10%"
                      }}>
                        <HStack>
                          <Text fontSize="2xl">Posting...</Text>
                          <CircularProgress size="75px" value={uploadProgress}>
                            <CircularProgressLabel>{Math.trunc(uploadProgress)}%</CircularProgressLabel>
                          </CircularProgress>
                        </HStack>
                      </Box>
                    </Center>
                  </ModalBody>
                </ModalOverlay>
              </Modal>
              <Box>
                <VStack>
                  <Box width="50%">
                    {
                      previewUrl
                        ?
                        <Image src={previewUrl} />
                        :
                        null
                    }
                  </Box>
                  <Button onClick={handleUpload}>Upload Photo</Button>
                  <Input ref={inputRef} type="file" accept="image/*" hidden={true} onChange={handleFileInput} />
                  {
                    previewUrl
                      ?
                      <Button onClick={handlePostPhoto}>Post Photo</Button>
                      :
                      null
                  }
                </VStack>
              </Box>
            </>
        }
      </Center>
    </motion.div>
  );
}

export default Upload;

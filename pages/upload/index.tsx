import React, { useState, useEffect, useRef, ChangeEvent } from "react";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { useAuth } from "../../context/AuthContext";
import { storage } from "../../config/firebase";

const Upload = () => {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const userStorageRef = ref(storage, `${user.uid}/media/${fileName}.jpg`);

    // Convert the image file to an array buffer and begin uploading
    const fileArrayBuffer = await imageFile.arrayBuffer();
    const uploadTask = uploadBytesResumable(userStorageRef, fileArrayBuffer);

    uploadTask.on("state_changed",
      (snapshot) => {
        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        onClose();
        console.error(error);
      },
      () => {
        /*  
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
        */
        onClose();
        setUploadProgress(0);
        setUploadSuccess(true);
      }
    )
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

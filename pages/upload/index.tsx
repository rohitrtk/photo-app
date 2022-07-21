import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Center,
  Input,
  Box,
  Image,
  Button,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Upload = () => {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => inputRef.current?.click();

  const handleFileInput = (event: ChangeEvent) => {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files;

    if (files && files[0]) {
      setImageFile(files[0]);
    }
  }

  const handlePostPhoto = () => {
    console.log("Post");
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
      </Center>
    </motion.div>
  );
}

export default Upload;

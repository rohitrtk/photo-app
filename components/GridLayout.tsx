import React from "react";
import {
  Grid,
  GridItem
} from "@chakra-ui/react";
import { motion } from "framer-motion"

import Post from "./Post";

const numCols = 4;

export interface MediaItem {
  downloadURL: string;
  username: string;
  timestamp?: string;
  id: string;
  likes: number;
}

interface Props {
  mediaItems: MediaItem[];
  showUsernames?: boolean;
}

const GridLayout = ({ mediaItems, showUsernames = true }: Props) => {
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
    >
      <Grid
        templateColumns={`repeat(${numCols}, 1fr)`}
        h="100%"
        gap={2}
        m={2}
      >
        {
          [...Array(numCols).keys()].map(remainder => {
            return (
              <GridItem key={`col${remainder}`} colSpan={1}>
                {
                  mediaItems ?
                    mediaItems
                      .filter((media, i, array) => i % numCols === remainder)
                      .map((mediaItem) => {
                        const { id, downloadURL, timestamp, username, likes } = mediaItem;

                        return (
                          <Post
                            key={id}
                            id={id}
                            src={downloadURL}
                            timestamp={timestamp}
                            likes={likes}
                            username={username}
                            showUsername={showUsernames}
                          />
                        );
                      })
                    : <></>
                }
              </GridItem>
            );
          })
        }
      </Grid>
    </motion.div>
  );
}

export default GridLayout;


import React from "react";
import {
  Grid,
  GridItem
} from "@chakra-ui/react";
import { motion } from "framer-motion"

import Post from "./Post";

const numCols = 4;

export interface MediaItem {
  url: string;
  username: string;
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
                  mediaItems
                    .filter((media, i, array) => i % numCols === remainder)
                    .map((mediaitem) => {
                      return (
                        <Post key={mediaitem.url} src={mediaitem.url} username={mediaitem.username} showUsername={showUsernames} />
                      );
                    })
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


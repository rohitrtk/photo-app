import { Box, Grid, GridItem } from '@chakra-ui/react';
import { motion } from "framer-motion";

import Post from "../components/Post";

const Home = () => {
  return (
    <>
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
        <Box h="85vh">
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={2}
            h="100%"
            m={2}
          >
            <GridItem colSpan={1}>
            </GridItem>
            <GridItem colSpan={1}>
            </GridItem>
            <GridItem colSpan={1}>
            </GridItem>
            <GridItem colSpan={1}>
            </GridItem>
          </Grid>
        </Box>
      </motion.div>
    </>
  );
}

export default Home;
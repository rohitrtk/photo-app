import React from "react";
import { useRouter } from "next/router";

const Media = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id}</>
}

export default Media;
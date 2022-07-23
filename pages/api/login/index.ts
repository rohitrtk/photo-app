import { NextApiRequest, NextApiResponse } from "next";
import { User } from "firebase/auth";
import { auth } from "../../../lib/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { token } = req.body;

  if(!token) {

  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;
  } catch (error) {
    res.status(500).json({
      
    });
  }

  res.status(200).json({});
}

export default handler;
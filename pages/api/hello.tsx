import { NextApiRequest, NextApiResponse } from "next";
import { bucket } from "../../lib/firebaseAdmin";
import { auth } from "../../lib/firebaseAdmin";

/* const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  return new Promise((resolve, reject) => {
    try {

      res.status(200).json({ hello: "world" });
    } catch (error) {
      res.status(405).json(error);
      res.end();
      resolve(null);
    }
  });
} */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const uid = "SnF7EBkkMsQrPkjEc5616Fm6WRM2";
  const _res = await auth.getUsers([
    { uid: uid }
  ])
  console.log(_res.users);

  res.status(200).json({ hello: "world" });
  /* return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      res.status(405).json(error);
      res.end();
      resolve(null);
    }
  }); */
}


export default handler;
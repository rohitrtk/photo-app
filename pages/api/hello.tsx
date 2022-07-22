import { User } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { bucket } from "../../lib/firebaseAdmin";
import { auth } from "../../lib/firebaseAdmin";

const getDisplayNameFromUid = async (uid: string): Promise<string | undefined> => {
  const { users } = await auth.listUsers();

  let displayName: string | undefined = undefined;
  for (const userRecord of users) {
    const currentUserDisplayName = (userRecord.toJSON() as User).displayName;
    console.log(currentUserDisplayName);
    if (uid === currentUserDisplayName) {
      displayName = currentUserDisplayName;
      break;
    }
  }

  return new Promise<string | undefined>((resolve, reject) => {
    !displayName ? reject() : resolve(displayName);
  });
}

const getUidFromDisplayName = async (displayName: string): Promise<string | undefined> => {
  const { users } = await auth.listUsers();

  let uid: string | undefined = undefined;
  for (const userRecord of users) {
    const currentUser = (userRecord.toJSON() as User);
    const currentUserDisplayName = currentUser.displayName;

    if (currentUserDisplayName === displayName) {
      uid = currentUser.uid;
      break;
    }
  }

  return new Promise<string | undefined>((resolve, reject) => {
    uid === undefined ? reject() : resolve(uid);
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const uid = "SnF7EBkkMsQrPkjEc5616Fm6WRM2";
  try {
    const _uid = await getUidFromDisplayName("HELLO WORLD2");
    console.log(_uid);
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({});
}


export default handler;
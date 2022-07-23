import { NextApiRequest, NextApiResponse } from "next";
import { User } from "firebase/auth";
import { auth } from "../../../lib/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { email, displayName, password } = req.body;

  if (!email || !displayName || !password) {
    res.status(200).json({
      error: "Missing information"
    });

    return;
  }

  if (password.length < 6) {
    res.status(200).json({
      error: "Password too short"
    });

    return;
  }

  try {
    await auth.createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: displayName,
      disabled: false
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating user"
    });
  }

  res.status(200).json({});
}

export default handler;
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../../lib/context";

/**
 * If the user is logged in and attempts to go to /profile, redirect them to their
 * own profile. Otherwise, if the non logged in user attempts to go to /profile, redirect them to /login.
 */
const ProfileRedirect = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && user.username) {
      router.push(`/profile/${user.username}`);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <></>
  );
}

export default ProfileRedirect;
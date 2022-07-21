import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.push(user ? `/profile/${user.displayName}` : "/login");
  }, []);

  return <></>;
}

export default Profile;

import React from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

const Profile = () => {
  return (
    <div>Profile page</div>
  );
}

export default Profile;

/* export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  /* const { data: session } = useSession();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  };
  } */
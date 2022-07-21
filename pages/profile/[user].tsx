import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const User = () => {

  const router = useRouter();
  const { user } = router.query;

  return (
    <h1>Hello {user}</h1>
  );
}

export default User;
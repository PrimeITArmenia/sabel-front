import {
  Profile,
} from "@/components";
import { useSession } from "next-auth/react";

const PageProfile = () => {
  const { data } = useSession();
  return (
    <>
      <Profile />
    </>
  );
}
export function getStaticProps() {
  return {
    props: {
      hasSubheader: false,
      hasFooter: false,
    },
  };
};

export default PageProfile;

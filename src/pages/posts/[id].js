import React from "react";
import { getSession } from "next-auth/react";
import { PostComponent } from "@/components";
import {url} from '@/api'
import axios from "axios";

const PostPage = ({post, color}) => {

  return (
    <>
      <PostComponent data={post} color={color}/>
    </>
  );
};




 async function getServerSideProps(context) {
  const session = await getSession(context);

  let color = false;
  const postId = context?.params?.id;
  try {
    const post = await fetch(`${url}/articles/${postId}`).then((res) => res.json());

    console.log('session', session);

    if (session && session.user && session.user.role !== 'admin') {
      const token = session?.user?.token?.accessToken;
      try {
        const response = await axios.get(`${url}/articles/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = response?.data.find((item) => item._id === postId);
        if (result) {
          color = true;
        }

      } catch (err) {
        console.log('err', err);
      }
    }

    return {
      props: {
        post,
        color,
        hasSubheader: true,
        hasFooter: true,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true, // Or handle the error in some way appropriate for your application
    };
  }
}
export default PostPage;

import React from "react";
import { getSession } from 'next-auth/react';
import {FavouritesComponent } from "@/components";
import {url} from '@/api'

const FavouritesPage = ({data}) => {
  return (
    <>
      <FavouritesComponent data={data}/>
    </>
  );
};

 async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    const token = session?.user.token.accessToken;

    if (!token) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    const res = await fetch(`${url}/articles/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // throw new Error('Failed to fetch data');
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    const data = await res.json();

    return {
      props: {
        data,
        hasSubheader: true,
        hasFooter: false,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true, 
    };
  }
}

export default FavouritesPage;

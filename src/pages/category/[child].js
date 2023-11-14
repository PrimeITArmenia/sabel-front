
import {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import { CategoryComponents } from "@/components";
import Loading from '../../components/loading'
import {url} from '@/api' 


const CategoryPage = ({ categories }) => {
  const router = useRouter();
  const { child } = router.query;
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
      if( categories.length > 0 ){
        setIsLoading(true)
      }
  }, [categories]);

  return (
    <>
      {
        !isLoading ? (
            <Loading/>
        ) : (
              <>
                {
                  categories.filter((category) => category.id === child ).map(( category, index) => (
                      <CategoryComponents
                          key={index}
                          category={category.name}
                          description={category.description}
                          articles={category.articles}
                      />
                  ))
                }
              </>
        )
      }
    </>
  );
};

export async function getStaticPaths() {

  const categories = await fetch(`${url}/categories`).then((response) => response.json());
  
  const paths = categories.map((category) => ({
    params: { child: category.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Set to 'false' to return a 404 for non-matching paths
  };
}

export async function getStaticProps() {

  const categories = await fetch(`${url}/categories`).then((response) => response.json());

  return {
    props: {
      categories,
      hasSubheader: true,
      hasFooter: true,
    },
  };
}

export default CategoryPage;

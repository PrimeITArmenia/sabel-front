'use client'

import style from "./favourites.module.scss";
import CardsList from "./../cards-list";
import {useEffect, useState} from "react";
import Loading from '../loading/index'

function FavouritesComponent({data}) {
  const [articlesList, setArticlesList] = useState(data);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
      setIsLoading(true)
  },[])

  function onDataChange(id) {
    const newArticleList = articlesList.filter((item) => item._id !== id);
    setArticlesList(newArticleList);
    setIsLoading(true)
  }
  
  return (
        <>
            {
                !isLoading ? (
                    <Loading/>
                ) : (
                    <section className={`pb-5 ${style.favourites_section}`}>
                        <h1 className={`text-center display-1 pb-5`}>FAVOURITES</h1>
                        <p className={`display-4 p-3 ${style.favourites_description}`}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </p>
                      <div className={style.favorutie_items}>
                        <CardsList
                            data={articlesList}
                            equal={false}
                            className={`pt-5 ${style.cards_favourites}`}
                            onDataChange={onDataChange}
                        />
                      </div>

                    </section>
                )
            }
        </>
  );
}

export default FavouritesComponent;

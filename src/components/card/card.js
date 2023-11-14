import style from "./card.module.scss";
import Card from "react-bootstrap/Card";
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";
import {useEffect, useState} from 'react';
import {url} from '@/api'

function CardItem({
                    id, hasBg = true, title = null, text = null,
                    onFavoriteClick = true, isFavorite = true, onDataChange = null
}) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(isFavorite);


  useEffect(() => {
    console.log('image', hasBg)
  }, []);


  async function handleClick(articleId) {
    await router.push(`/posts/${id}`);
  }

  async function onFavoriteButtonClick(event) {
    event.stopPropagation();
    const session = await getSession();
    
    if (session) {
      const token = session.user.token.accessToken;

      try {
        const response = await fetch(`${url}/articles/${id}`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const message = await response.json();
        console.log(message);
        // setFavorite(!favorite);
        onDataChange(id);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    } else {
      console.log("Please sign in");
    }
  }

  return (
    <Card className={`text-quaternary overflow-hidden border-0 ${style.card_item}`} onClick = {handleClick}>

      <Card.Img src={hasBg} height={580} width={420} alt="Card image" className={style.card_image}/>

      <Card.ImgOverlay className={`d-flex ${
          text ? "flex-column justify-content-end  " : " justify-content-center align-items-center "}  ${text ? "" : style.figure}`}>

        <Card.Text className={`display-3 ${style.card_title}` }>{ title} </Card.Text>
        {
          text && (
          <Card.Text className={`${style.card_text}`}>
            {text}
          </Card.Text>
        )}
        {
          onFavoriteClick && (
              <button onClick={onFavoriteButtonClick} className={`position-absolute border-0  bg-quaternary ${style.favorite} `} >
                {
                  favorite ? (
                  <img src="assets/icons/heart-icon.svg" width={20} height={20} alt={""}/>
                    ) : (
                  <img src="assets/icons/heart-gray-icon.svg" width={20} height={20} alt={""} />
                )}
              </button>
        )}
      </Card.ImgOverlay>
    </Card>
  );
}

export default CardItem;

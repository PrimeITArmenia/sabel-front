import style from "./cards-lists.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardItem from "../card/card.js";
import {useState, useEffect} from "react";
import Loading from '../loading/index'

function CardsList({data, equal, onDataChange, onFavoriteClick }) {

  const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
    }, []);


  return (
      <>
        {
          !isLoading ? (
              <Loading/>
          ) : (
              <Row className={` ${equal ? style.gallery : style.galery_equally}  `} >
                  {
                      data && data.map((article, index) => (

                          <Col className={style.img} key={index} >
                              <CardItem
                                  key={index}
                                  id={article._id}
                                  hasBg={article.image}
                                  title={article.name}
                                  text={article.description}
                                  onDataChange={onDataChange}
                                  onFavoriteClick={onFavoriteClick}
                              />
                          </Col>
                      ))
                  }

              </Row>
          )
        }
      </>
  );
}

export default CardsList;
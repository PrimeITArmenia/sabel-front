import {useRouter} from "next/router";
import {url} from "@/api"
import axios from "axios"
import React, {useEffect,useState} from "react";
import {Container} from "react-bootstrap";
import Loading from "../../components/loading";
import style from "@/components/category/pasion.module.scss";
import Modal from "react-bootstrap/Modal";
import FilterComponent from "../../components/filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardsList from "../../components/cards-list";


const TagComponent = () =>{
    const router = useRouter();
    const data = router.query.data ? JSON.parse(router.query.data) : null;
    const [ isLoading, setIsLoading] = useState(false)
    const [article, setArticles]  = useState('')

    useEffect(() => {
       if (data._id){
           fetchTag(data._id)
       }
    }, []);

    async function fetchTag( id ){
        try{
            const response  = await axios.get(`${url}/tags/${id}/articles`)
            if( response.status === 200 ){
                setArticles(response.data)
                setIsLoading(true)
            }
            // console.log('tag-component-response', response)
        }catch(err){
            console.log('tag-component-error', err)
        }
    }

    return (
        <Container fluid className="px-5">
            {
                !isLoading ? (
                    <Loading/>
                ) : (
                    <>
                        <div className={` pt-3 ${style.passion_container} `}>
                            <h2 className="text-center display-1">  {data.name} </h2>
                            <Row>
                                <Col lg={12} className="">
                                    <CardsList data={article} equal={true} onFavoriteClick={false} />
                                </Col>
                            </Row>
                        </div>
                    </>
                )
            }
        </Container>
    )
}
export default TagComponent
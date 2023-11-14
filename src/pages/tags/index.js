import React, {useEffect, useState} from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import CardsList from "../../components/cards-list";
import axios from "axios";
import {url} from "@/api";
import {useRouter} from "next/router";
import Loading from "../../components/loading";
import style from "@/components/category/pasion.module.scss";
import FilterComponent from "../../components/filter";

const TagsComponent = () => {
    const router = useRouter()
    const id = router.query
    const [ isLoading, setIsLoading] = useState(false)

async function handleCorrectTags(id){
    try{
        let response = await axios.get(`${url}/tags/${id}/articles`)
        if(response.status === 200 ){
            setArticle(response.data)
            setIsLoading(true)
        }
        console.log('response', response)
    }catch (err){
        console.log('err', err)
    }
}

    useEffect(() => {
        console.log('tag-component', id)
        handleCorrectTags(id)
    }, []);


    return (
        <Container fluid className="px-5">
            <Row>
                <Container fluid className="px-5">
                    {
                        !isLoading ? (
                            <Loading/>
                        ) : (
                            <>
                                <h2 className="text-center display-1"> Tags filter by {data.name} </h2>
                                <div className={` pt-3 ${style.passion_container} `}>
                                    {/*<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>*/}
                                    {/*    <Modal.Header closeButton>*/}
                                    {/*        <Modal.Title> Filter Search</Modal.Title>*/}
                                    {/*    </Modal.Header>*/}
                                    {/*    <div className="p-4">*/}
                                    {/*        <FilterComponent />*/}
                                    {/*    </div>*/}
                                    {/*</Modal>*/}
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
            </Row>
        </Container>
    );
};

export default TagsComponent;
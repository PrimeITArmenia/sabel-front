
import style from "./dashbard-articles.module.scss";
import Container from "react-bootstrap/Container";
import ArticleBox from "./../article-box";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";

function DashboardArticles() {
  return (
    <Container fluid className={`${style.container_dashboard_articles}`}>
      <div className={`${style.container_main}`}>
        <div className={style.article_form}>
          <Form noValidate className="d-flex gap-5">
            <Link href='/admin/articles/create'>
              <Button type="submit" className={style.article_button}>
                Add New Article
              </Button>
            </Link>
          </Form>
        </div>
        <ArticleBox type='article' forOnChangeTypeButton={false}/>
      </div>
    </Container>
  );
}

export default DashboardArticles;

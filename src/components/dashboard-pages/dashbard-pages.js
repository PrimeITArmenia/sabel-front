import style from "./dashbard-pages.module.scss";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import NoSSR from "react-no-ssr";
import Link from "next/link";

function DashboardPages() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const handleDeleteSuccess = () => {
    if (type === "article") {
      fetchArticles();
    } else if (type === "category") {
      fetchCategories();
    }
  };

  const pages = [
    { id: 1, pagename: "Home" },
    { id: 2, pagename: "About" },
  ];

  const headers = [{ id: 1, name: "Page Name" }];

  headers.push("***");

  return (
    <Container fluid className={`${style.container_dashboard_pages}`}>
      <div className={`${style.container_main}`}>
        <div className={style.pages_form}></div>
        <Container fluid className={style.aticle_box}>
          <NoSSR>
            <table
              className={`table text-center bg-quaternary ${style.article_box_table}`}
            >
              <thead>
                <tr className={`${style.article_box_header}`}>
                  {headers.map((header_item, index) => (
                    <th key={index} scope="col">
                      {header_item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <NoSSR>
                  <tr className={`${style.article_item}`}>
                    <td>Home</td>

                    <td>
                      <div className={style.articles_items_draft_bin}>
                        <Link href={`/admin/pages/home-edite`}>
                          <button>
                            <img src="/assets/icons/dashboard_draft_icon.svg" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr className={`${style.article_item}`}>
                    <td>About</td>

                    <td>
                      <div className={style.articles_items_draft_bin}>
                        <Link href={`/admin/pages/about-edite`}>
                          <button>
                            <img src="/assets/icons/dashboard_draft_icon.svg" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </NoSSR>
              </tbody>
            </table>
          </NoSSR>
        </Container>
      </div>
    </Container>
  );
}

export default DashboardPages;

import style from "./layout.module.scss";
import { DashboardHeaderComponent, SideBarDashboard } from "@/components/index";
import { Container } from "react-bootstrap";

export default function DefaultLayout({ children = null, title }) {
  
  return (
    <>
      <section className="d-flex">
        <div className={style.cotainer_sidebar}>
          <SideBarDashboard />
        </div>
        <Container
          fluid
          className={`${style.container_dashboard_layout} bg-dashboard`}
        >
          <div className={`${style.container_main}`}>
            <div className={style.main_header}>
              <DashboardHeaderComponent title="Sabel Dashboard Page Title" />
            </div>
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
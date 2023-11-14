import style from "./dashboard-header.module.scss";
import { Row, Col } from "react-bootstrap";

function DashboardHeaderComponent({ title }) {
  return (
    <Col
      className={`d-flex justify-content-between  ${style.dashboard_header_col}`}
    >
      <h1 className={style.dashboard_header_style}>{title}</h1>
      <div
        className={`${style.input_group} d-flex flex-row-reverse border rounded-start-0 `}
      >
        <input
          type="text"
          className={`${style.form_input_focus}form-control border-0 rounded-start-0 border`}
          placeholder="Search"
        />

        <button
          className="border-0 border rounded-start-1 bg-quaternary"
          type="button"
        >
          <img
            src="/../assets/icons/serch-gray-icon.svg"
            className="btn rounded-start-2  rounded"
          />
        </button>
      </div>
    </Col>
  );
}

export default DashboardHeaderComponent;

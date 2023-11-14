import Link from "next/link";
import style from "./site-bar-dashboard.module.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Nav, NavLink } from "react-bootstrap";
import {signOut} from "next-auth/react";

function SideBarDashboard({ label, toggled }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    // onClick(!isToggled);
  };

  async function handleLogOut(){
    await signOut({ callbackUrl: "/signin" });
  }

  return (
    <div className={style.offcanvas_sidebar}>
      <div
        className={`${isToggled ? style.sidebar_left_show : ""} ${
          style.sidebar_left
        }`}
        // onClick={handleShow}
      >
        <div>
          <div
            className={style.sidebar_header}
            defaultChecked={isToggled}
            onClick={callback}
          >
            <img
              src="/../assets/icons/dashboard_logo_light_icon.svg"
              width={76}
              height={18.5}
              alt=" "
              className={style.sidevar_logo}
            />
          </div>
          <div className={style.sidebar_body}>
            <ul className={style.sideba_body_top}>
              <Nav className={style.sidebar_nav_links}>
                <div className={`${style.sidebar_menu_item}`}>
                  <Link href="/admin/articles">
                    <li>
                      <img
                        src="/../assets/icons/dashboard_articles_icon.svg"
                        width={24}
                        height={24}
                        alt=" "
                      />

                      <span>Articles</span>
                    </li>
                  </Link>
                </div>
                <Link href="/admin/categories">
                  <li>
                    <img
                      src="/../assets/icons/dashboard_categories_icon.svg"
                      width={24}
                      height={24}
                      alt=" "
                    />
                    <span>Categories</span>
                  </li>
                </Link>
                <Link href="/admin/pages">
                  <li>
                    <img
                      src="/../assets/icons/dashboard_pages_icon.svg"
                      width={24}
                      height={24}
                      alt=" "
                    />
                    <span>Pages</span>
                  </li>
                </Link>
                <Link href="/admin/tags">
                  <li>
                    <img
                      src="/../assets/icons/dashboard_tags_icon.svg"
                      width={24}
                      height={24}
                      alt=" "
                    />
                    <span>Tags</span>
                  </li>
                </Link>
                <Link href="/admin/users">
                  <li>
                    <img
                      src="/../assets/icons/dashboard_user_icon.svg"
                      width={24}
                      height={24}
                      alt=" "
                    />
                    <span>Users</span>
                  </li>
                </Link>
                {/*<Link href="/admin/profile">*/}
                {/*  <li>*/}
                {/*    <img*/}
                {/*      src="/../assets/icons/dashboard_profile_icon.svg"*/}
                {/*      width={24}*/}
                {/*      height={24}*/}
                {/*      alt=" "*/}
                {/*    />*/}
                {/*    <span>Profile</span>*/}
                {/*  </li>*/}
                {/*</Link>*/}
                {/*<Link href="/admin/profile">*/}
                {/*  <li>*/}
                {/*    <div className="position-relative">*/}
                {/*      <img*/}
                {/*        src="/../assets/icons/dashboard_notifaction_icon.svg"*/}
                {/*        width={24}*/}
                {/*        height={24}*/}
                {/*        alt=" "*/}
                {/*      />*/}
                {/*      <div className={` ${style.notifaction_doth}`}></div>*/}
                {/*    </div>*/}
                {/*    <span>Notifaction</span>*/}
                {/*  </li>*/}
                {/*</Link>*/}
              </Nav>
            </ul>
          </div>
        </div>
        <div className={style.sidebar_body}>
          <ul className={`${style.sideba_body_bottom} p-0`}>
            <li>
              <div className={style.sidebar_footer} onClick={()=> handleLogOut()}>
                <img
                  src="/../assets/icons/dashboard_sig_out_icon.svg"
                  alt=""
                  height={24}
                  width={24}
                />
                <span>Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarDashboard;

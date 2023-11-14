import style from "./dashboard-profile.module.scss";
import { Container } from "react-bootstrap";
import Link from "next/link";

function DashboardProfile() {
  return (
    <>
      <section className={style.profile_section}>
        <Container className={` text-start ${style.container_profile}`}>
          <div className={style.profile_settings}>
            <h4 className="fw-bold">Profile Settings</h4>
            <div className={`${style.profile_picture_div}`}>
              <img
                src="/../assets/images/profile.webp"
                width={70}
                height={70}
                className="rounded-circle"
              />
              <div className={`${style.profile_user_flag}`}>
                <img height={20} width={20} src="/../assets/icons/flag.svg"></img>
                <span>Germany</span>
              </div>
            </div>
            <p className="pt-4">Profile Picture</p>
            <p className={style.profile_text_upload_file}>
              You can upload a JPG or PNG file. Maximum file size is 2MB.
            </p>
            <button className="border-1 border-black bg-quaternary ">
              Change Picture
            </button>
            <form className={style.section_email_password}>
              <fieldset className={`border ${style.name_surname}`}>
                <legend> Full Name</legend>
                <input
                  type="name"
                  className="form-control shadow-none"
                  id="name"
                  placeholder="Name Surname"
                />
                <label htmlFor="name" className="visually-hidden">
                  email
                </label>
              </fieldset>
              <fieldset className="border ">
                <legend> Email Address</legend>
                <input
                  type="email"
                  className="form-control shadow-none"
                  id="email"
                />
                <label htmlFor="email" className="visually-hidden">
                  email
                </label>
              </fieldset>

              <fieldset
                className={`border d-flex  position-relative ${style.password_legend}`}
              >
                <legend>Password</legend>
                <input
                  type="password"
                  className="form-control shadow-none"
                  id="inputpassword"
                />
                <label htmlFor="inputpassword" className="visually-hidden">
                  Password
                </label>
                <button
                  className={`border-0  ${style.profile_forgot_password}`}
                >
                  <Link
                    className="text-decoration-none px-1 text-black"
                    href="./forgotpassword"
                  >
                    Change Password
                  </Link>
                </button>
              </fieldset>
            </form>
          </div>
          <div className={style.membership_area_section}>
            <div className={`${style.membership_area}`}>
              <h4 className="fw-bold">Membersip Area </h4>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Membership</h6>
                  <button
                    className={` border-0  text-quaternary p-1 ${style.view_more_button}`}
                  >
                    View More
                  </button>
                </div>
                <p>data</p>
              </div>
            </div>

            <div className={`${style.email_preferences}`}>
              <h4 className="fw-bold">Email Preferences</h4>
              <div className="d-flex justify-content-between m-0">
                <h5>Sabel Promotions</h5>
                <div className={style.toggle_rect_color}>
                  <input type="checkbox" id="rect3" name="check" />
                  <label htmlFor="rect3"></label>
                </div>
              </div>
              <div className="d-flex justify-content-between m-0">
                <h5>Sabel News and Offers</h5>
                <div className={style.toggle_rect_color}>
                  <input type="checkbox" id="rect2" name="check" />
                  <label htmlFor="rect2"></label>
                </div>
              </div>
              <div className="d-flex justify-content-between m-0">
                <h5>Events</h5>
                <div className={style.toggle_rect_color}>
                  <input type="checkbox" id="rect1" name="check" />
                  <label htmlFor="rect1"></label>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default DashboardProfile;

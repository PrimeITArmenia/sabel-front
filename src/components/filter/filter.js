import style from "./filter.module.scss";
import { useState } from "react";

function FilterComponent() {
  const [articles, setArticles] = useState(false);
  const [podcast, setPodcast] = useState(false);
  const [events, setEvents] = useState(false);
  const [videos, setVideos] = useState(false);

  const articlesButtonClick = () => {
    setArticles((prevIsOn) => !prevIsOn);
  };
  const podcastButtonClick = () => {
    setPodcast((prevIsOn) => !prevIsOn);
  };
  const eventsButtonClick = () => {
    setEvents((prevIsOn) => !prevIsOn);
  };
  const videosButtonClick = () => {
    setVideos((prevIsOn) => !prevIsOn);
  };

  return (
    <>
      <div className={`d-flex flex-column ${style.filter}`}>

        <button onClick={articlesButtonClick} className="border-0 bg-quaternary d-flex align-middle justify-content-between">
          <span className={style.titele_list_title}>Articles</span>
          {articles ? (
            <img src="/assets/icons/colection_arrow_down.svg"  alt={""} />
          ) : (
            <img src="/assets/icons/colection_arrow_up.svg"  alt={""} />
          )}
        </button>

        <div className={`${style.dropdown_box} ${articles ? style.show : ""}`}>
          <div className={style.filter_box}>

            <label className={style.option}>
              Apparel
              <input type="checkbox" className={style.filter_option_label} />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              Shoes
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              Bags
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              Jewelery
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              Shoes
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

          </div>
        </div>

        <button onClick={podcastButtonClick} className="border-0 bg-quaternary d-flex align-middle justify-content-between">
          <span className={style.titele_list_title}> Podcast </span>
          {
            podcast ? (
            <img src="/assets/icons/colection_arrow_down.svg" alt={""}/>
            ) : (
            <img src="/assets/icons/colection_arrow_up.svg" alt={""}/>
          )}
        </button>

        <div className={`${style.dropdown_box} ${podcast ? style.show : ""}`}>
          <div className={style.filter_box}>

            <label className={style.option}>
              option 1
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 2
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 3
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

          </div>
        </div>

        <button onClick={eventsButtonClick} className="border-0 bg-quaternary d-flex align-middle justify-content-between">
          <span className={style.titele_list_title}>Events</span>
          {
            events ? (
              <img src="/assets/icons/colection_arrow_down.svg" alt={""}/>
            ) : (
              <img src="/assets/icons/colection_arrow_up.svg"  alt={""} />
          )}
        </button>

        <div className={`${style.dropdown_box} ${events ? style.show : ""}`}>
          <div className={style.filter_box}>

            <label className={style.option}>
              option 1
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 2
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 3
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

          </div>
        </div>

        <button onClick={videosButtonClick} className="border-0 bg-quaternary d-flex align-middle justify-content-between">
          <span className={style.titele_list_title}>Videos</span>
          {
            videos ? (
              <img src="/assets/icons/colection_arrow_down.svg"  alt={""} />
            ) : (
              <img src="/assets/icons/colection_arrow_up.svg"  alt={""}/>
          )}
        </button>

        <div className={`${style.dropdown_box} ${videos ? style.show : ""}`}>
          <div className={style.filter_box}>

            <label className={style.option}>
              option 1
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 2
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

            <label className={style.option}>
              option 3
              <input type="checkbox" />
              <span className={style.customcheckbox}></span>
            </label>

          </div>
        </div>

        <button className={`border-0  text-quaternary bg-primary ${style.filter_button}`}>
          Filter
        </button>
      </div>
    </>
  );
}

export default FilterComponent;

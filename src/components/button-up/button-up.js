import React, { useState, useEffect } from "react";
import style from "./button-up.module.scss";

function ScrollToTopButton () {
    const [showBtn, setShowBtn] = useState(false);

    const scrollFunction = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    const topFunction = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    useEffect(() => {
      window.addEventListener("scroll", scrollFunction);
      return () => {
        window.removeEventListener("scroll", scrollFunction);
      };
    }, []);

    return (
      <>
        {showBtn && (
          <button
            onClick={topFunction}
            className={style.myBtn}
            title="Go to top"
          >
            <img src="/assets/icons/arrow-up.svg" height={24} width={24}  alt=""/>
          </button>
        )}
      </>
    );
}

export default ScrollToTopButton;

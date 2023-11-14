

import style from "./about.module.scss";
import React, { useState, useEffect } from 'react';
import Loading from '../loading/index'
import {url} from '@/api'
function AboutComponent() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(`${url}/aboutpage`)
      .then(response => response.json())
      .then(data => {
          setContent(data.content)
         setIsLoading(true)
      })
      .catch(error => console.error('Error fetching content:', error));
  }, []);
 
  return (
    <section className={style.about_section}>
        {
            !isLoading ? (
                <Loading/>
            ) : (
                <div className="text_editor" dangerouslySetInnerHTML={{  __html: content}} />
            )
        }
    </section>
  );
}
 
export default AboutComponent;

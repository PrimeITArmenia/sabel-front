import { useEffect, useState } from "react";
import {url} from '@/api'

export default function ArticleFeatch() {
  const [articles, setArticles] = useState([]);

  useEffect(async () => {
    const articles = await fetch(`${url}/articles`, {
      headers: {
        "Content-Type": "application/json   ; charset=utf   UTF-8",
      },
    });

    const articlesData = await articles.json();
    setArticles(articlesData);
  }, []);

  return (
    <div>
      {articles.map((article, index) => {
        try {
          const items = JSON.parse(article.content);
          console.log(items.root.children[0].children);
          return (
            <>
              {items.root.children[0].children.map((child, index) => (
                <>
                  <p>{child.text}</p>
                  <div key={index}>``
                    {child.src ? (
                      <img
                        src={child.src}
                        alt="Image"
                        style={{ maxWidth: "500px", height: "auto" }}
                      />
                    ) : null}
                  </div>
                </>
              ))}
            </>
          );
        } catch (error) {
          console.error(
            `Error parsing JSON at index ${index}: ${error.message}`
          );
          return null; // Handle invalid JSON
        }
      })}
    </div>
  );
}

"use client";

import style from "./articles-item.module.scss";
import Link from 'next/link'
import {useSession} from "next-auth/react";
import {url} from '@/api'

function ArticleItem({ headers, item, handleDeleteSuccess, type, onChange, forOnChangeTypeButton }) {

  const session = useSession()
  const token  = session?.data?.user?.token.accessToken

  const handleInputForEdit = async () => {
      onChange(item)
  }
  async function handleDelete() {
    if ( type === 'article') {
      const response = await fetch(`${url}/articles/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } else if (type === 'category') {

      console.log('token', item.id)
      const response = await fetch(`${url}/categories/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then((res)=> console.log('res', res));
    } else if (type === 'tag') {
      const response = await fetch(`${url}/tags/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } else if (type === 'user') {
      const response = await fetch(`${url}/user/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    handleDeleteSuccess();
  }

  return (
    <>
      <tr className={`${style.article_item}`}>
        {
          headers.map((name, key) => (
              name === "image" ? (
                  <td className={style.article_items_image} key={name}>
                    <img
                        alt={item[name]}
                        src={item[name]}
                        width={36}
                        height={36}
                        className="border-0"/>
                  </td>
              ) : name === "***" ? (
                  <td key={name}>
                    <div className={style.articles_items_draft_bin}>
                      {
                        forOnChangeTypeButton ? (
                            <button onClick={handleInputForEdit}>
                              <img src="/assets/icons/dashboard_draft_icon.svg" alt={"photo"} />
                            </button>
                        ) : (
                            type !== 'user' ? (
                                <Link href={{pathname :`/admin/articles/edit/${item.id}`, query : { data : item }}}>
                                  <button>
                                    <img src="/assets/icons/dashboard_draft_icon.svg" alt={"photo"} />
                                  </button>
                                </Link>
                            ) : ""
                        )
                      }
                      <button>
                        <img src="/assets/icons/dashboard_recycle_bin_icon.svg" alt={"photo"} onClick={handleDelete}/>
                      </button>
                    </div>
                  </td>
              ) : name === "categories" ? (
                  <td key={name}>{ item[name]?.name}</td>
              ) : <td key={name}>{item[name]}</td>
          ))
        }
      </tr>
    </>
  );
}

export default ArticleItem;

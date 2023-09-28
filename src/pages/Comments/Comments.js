import {Link, useParams} from "react-router-dom";
import {NewsList} from "../NewsList/NewsList";
import {NewsItems} from "../../Components/NewsItem/NewsItems";
import {get} from "../../api/api";
import {useEffect, useState} from "react";

export function Comments() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    async function getNewsData(newsId) {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        setNews(newsData)
        if (newsData?.kids) {
            const commentsData = getNewsComments(newsData.kids)
            console.log(commentsData)
        }

    }

    async function getNewsComments(commentsIds) {
        return await Promise
            .all(commentsIds.map(async commentsId =>
            {
                const comment = get(`https://hacker-news.firebaseio.com/v0/item/${commentsId}.json?print=pretty`)
                if(comment?.kids) {
                    comment.kids = await getNewsComments(comment.kids)
                }

                return comment
            }))
    }

    useEffect(() => {
        getNewsData(id)
    }, [id])

    return (
        <div>
            <Link to='/'>Назад</Link>

            {news && (
                <NewsItems
                    title={news.title}
                    username={news.by}
                    date={news.time}
                    url={news.url}
                />
            )}


        </div>
    )
}
import {Link, useParams} from "react-router-dom";
import {NewsList} from "../NewsList/NewsList";
import {NewsItems} from "../../Components/NewsItem/NewsItems";
import {get} from "../../api/api";
import {useEffect, useState} from "react";

export function Comments() {
    const {id} = useParams()
    const [news, setNews] = useState()

    async function getNewsData(newsId) {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        console.log(newsData)
        setNews(newsData)
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
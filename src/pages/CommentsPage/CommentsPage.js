import {Link, useParams} from "react-router-dom";
import {NewsListPage} from "../NewsListPage/NewsListPage";
import {NewsItems} from "../../Components/NewsItem/NewsItems";
import {get} from "../../api/api";
import {useEffect, useState} from "react";
import {CommentsWrapper} from "../../Components/Comments/CommentsWrapper";

export function CommentsPage() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    async function getNewsData(newsId) {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        setNews(newsData)
        if (newsData?.kids) {
            const commentsData = await getNewsComments(newsData.kids)

            setComments(commentsData)
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

            {comments && (
                <CommentsWrapper comments={comments}/>
            )}

        </div>
    )
}
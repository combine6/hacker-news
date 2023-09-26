import {NewsItems} from "./NewsItem/NewsItems";
import {useEffect, useState} from "react";

const initNews = [
  {
    title: "Первая новость",
    url: "www.example.com",
    username: "Пользователь",
    date: "10.10.11",
    score: 100,
    id: '1'
  },
  {
    title: "Вторая новость",
    url: "www.example.com",
    username: "Пользователь2",
    date: "11.10.11",
    score: 200,
    id: '2'
  },
  {
    title: "Третья новость",
    url: "www.example.com",
    username: "Пользователь3",
    date: "10.12.11",
    score: 1000,
    id: '3'
  }
]

function App() {
  const checkStorage = () => JSON.parse(window.localStorage.getItem('newsKey') || initNews)
  const [news, setNews] = useState(checkStorage())
  const [count, setCount] = useState(0)

  useEffect(() => {
    window.localStorage.setItem('newsKey', JSON.stringify(news))
  }, [news])

  const newNews = {
    title: "Четвартая новость",
    url: "www.example.com",
    username: "Пользователь4",
    date: "14.12.11",
    score: 1004,
    id: '4'
  }

  const newsCountHandler = () => {
    setNews((prevState) => [...prevState, newNews])
  }

  return (
    <>
      <div>Количество новостей: {news.length}</div>
      <button onClick={newsCountHandler}>Добавить новость</button>
      {
        news.map(item => {
          return <NewsItems key={item.id}
                            title={item.title}
                            url={item.url}
                            username={item.username}
                            date={item.date}
                            score={item.score}
                 />
        })
      }
    </>
  );
}

export default App;

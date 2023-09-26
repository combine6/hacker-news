import style from './NewsItems.module.css'
import {unixToDate} from "../../utils/utils";
import {Link} from 'react-router-dom'

export function NewsItems(props) {
    const scoreClassArr = [style.score]

    if (props.score > 50) {
        scoreClassArr.push(style.highScore)
    } else if (props.score > 30) {
        scoreClassArr.push(style.midScore)
    } else {
        scoreClassArr.push(style.lowScore)
    }

    return (
        <div className={`${style.container} ${props.className}`}>
            <Link className={style.link} to={`comments/${props.id}`}>{props.title}</Link>

            <div className={style.info}>
                <div className={style.userData}>
                    <span>{props.username} | </span>
                    <span>{unixToDate(props.date)}</span>
                </div>

                <div className={scoreClassArr.join(' ')}>
                    {props.score} points
                </div>
            </div>
        </div>
    )
}
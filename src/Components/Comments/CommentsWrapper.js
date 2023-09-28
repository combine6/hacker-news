import style from './Comments.module.css'
import {copy, unixToDate} from "../../utils/utils";
import {useState} from "react";

export function CommentsWrapper({comments}) {
    const [openedComments, setOpenedComments] = useState({})

    return (
        <div className={style.container}>
            <Comments comments={comments} openedComments={openedComments} onExpandComments={setOpenedComments}/>
        </div>
    )
}

function Comments({comments, openedComments, onExpandComments}) {
    function expandComments(commentId) {
        const copyOpenedComments = copy(openedComments)

        if (copyOpenedComments[commentId]) {
            delete copyOpenedComments[commentId]
        } else {
            copyOpenedComments[commentId] = {}
        }

        onExpandComments(copyOpenedComments)
    }
    return (
        <>
        {comments.map((commentItem) => (
            <div key={commentItem.id} className={style.commentContainer}>
                <div className={style.commentUsername}>{commentItem.by}</div>
                <div className={style.commentText}>{commentItem.text}</div>

                <div className={style.commentBottom}>
                    <div className={style.commentTime}>{unixToDate(commentItem.time)}</div>
                    {commentItem?.kids?.length &&
                        <button onClick={() => expandComments(commentItem.id)} className={style.commentReplyButton}>Ответы</button>}
                </div>

                {commentItem?.kids?.length && openedComments[commentItem.id] &&
                    <div className={style.commentSubComment}>
                        <Comments comments={commentItem.kids} openedComments={openedComments[commentItem.id]}/>
                    </div>
                }

            </div>
            ))}
        </>
    )
}
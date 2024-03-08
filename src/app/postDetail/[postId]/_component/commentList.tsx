import Image from "next/image";

import { useUserDataContext } from "@/context/AuthContext";
import { formatDay, formatTime } from "@/utils/foramattime";
import { userImgUrl } from "@/utils/userImgUrl";

import { IComment } from "../interfaces";
import styles from "../postDetail.module.css";

interface CommentListProps {
  comments: IComment[];
  showAllComments: boolean;
}

export default function CommentList({ comments, showAllComments }: CommentListProps) {
  return (
    <div className={styles.commentListContainer}>
      {showAllComments
        ? comments.map((comment, index) => <Comment key={index} comment={comment} />)
        : comments.slice(0, 5).map((comment, index) => <Comment key={index} comment={comment} />)}
    </div>
  );
}

interface CommentProps {
  comment: IComment;
}

function Comment({ comment }: CommentProps) {
  const { userInfo } = useUserDataContext();
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentorInfo}>
        <div className={styles.commentorImageContainer}>
          <Image src={userImgUrl(comment.imageType)} alt="댓글 쓴 사람 이미지" width={24} height={24} />
        </div>
        <div className={styles.commentorName}>{comment.nickname}</div>
        <div className={styles.verticalLine}></div>
        <div className={styles.commentDay}>{formatDay(comment.created)}</div>
        <div className={styles.commentTime}>{formatTime(comment.created)}</div>
        {userInfo.isLogin === 1 && userInfo.userId === comment.commentId && (
          <button className={styles.comment_del}>삭제</button>
        )}
      </div>
      <div className={styles.userComment}>{comment.content}</div>
      <div className={styles.commentSeperator}></div>
    </div>
  );
}

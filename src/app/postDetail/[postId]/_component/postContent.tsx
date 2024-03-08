import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface IPostContentProps {
  postData: IPostData;
}

export default function PostContent({ postData }: IPostContentProps) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitle}>{postData.title}</div>
      <div className={styles.postContent}>{postData.content}</div>
      <div className={styles.tagContainer}>
        {postData.tags &&
          postData.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.tagName}
            </span>
          ))}
      </div>
    </div>
  );
}

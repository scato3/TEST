import Image from "next/image";

import { formatRelativeTime } from "@/utils/foramattime";
import { userImgUrl } from "@/utils/userImgUrl";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface IUserInfoProps {
  postData: IPostData;
}

export default function UserInfo({ postData }: IUserInfoProps) {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.usermageContainer}>
        <Image src={userImgUrl(postData.imageType)} alt="유저 이미지" width={24} height={24} />
      </div>
      <div className={styles.userInfoContainer}>
        <span className={styles.userName}>{postData.nickname}</span>
        <span className={styles.userPostTime}>{formatRelativeTime(postData.created)}</span>
      </div>
      <div className={styles.topicContainer}>
        <span className={styles.userTopic}>{postData.category}</span>
      </div>
    </div>
  );
}

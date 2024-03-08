import "dayjs/locale/ko";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";

import { IProfilePost } from "../page";
import DelBtn from "./DelBtn";
import styles from "./profilePostCard.module.css";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function ProfilePostCard({
  profilePostData,
  userId,
}: {
  profilePostData: IProfilePost;
  userId: number;
}) {
  return (
    <article className={styles.profile_post_card_container}>
      <div className={styles.chip_container}>
        {profilePostData?.voted && <span className={styles.voted_chip}>투표</span>}
        {profilePostData?.writed && <span className={styles.write_chip}>작성</span>}
        {profilePostData?.writed && <DelBtn userId={userId} postId={profilePostData.postId} />}
      </div>
      <h4 className={styles.title}>{profilePostData.title}</h4>
      <Link href={`/postDetail/${profilePostData.postId}`}>
        <p className={styles.content}>{profilePostData.content}</p>
      </Link>
      <div
        className={styles.bottom}
      >{`${profilePostData.category} ・ ${dayjs(profilePostData.created).fromNow()} ・ 참여 ${profilePostData.voteCount}`}</div>
    </article>
  );
}

"use client";
import "dayjs/locale/ko";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { IPost } from "@/modal/Post";
import { formatRelativeTime } from "@/utils/foramattime";
import { userImgUrl } from "@/utils/userImgUrl";

import CommentInput from "../_main/_component/CommentInput";
import VoteBtnsContainer from "../_main/_component/VoteBtnsContainer";
import styles from "./postCard.module.css";
import Tag from "./Tag";

interface IProps {
  post: IPost;
  openLoginModal?: () => void;
}
export default function PostCard({ post, openLoginModal }: IProps) {
  const router = useRouter();

  const goDetailPage = () => {
    router.push(`/postDetail/${post.postId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_top}>
        <Image
          width={24}
          height={24}
          className={styles.card_user_img}
          src={userImgUrl(post.imageType)}
          alt="프로필 이미지"
        />
        <span className={styles.user_name}>{post.nickname}</span>
        <span className={styles.time}>{formatRelativeTime(post.created)}</span>
        <Tag tagName={post.category} color={"primary"} className={styles.tag_right} />
      </div>
      <div className={styles.contents_container} onClick={goDetailPage}>
        <div>
          <span className={styles.post_title}>{post.title}</span>
          <p className={styles.contents}>{post.content}</p>
        </div>
        <div className={styles.contents_bottom}>
          <ul className={styles.contents_bottom_ul}>
            {post.tags.length > 0 &&
              post.tags.slice(0, 2).map((v) => (
                <li key={v.tagId}>
                  <Tag tagName={v.tagName} />
                </li>
              ))}
          </ul>
          <div className={styles.contents_bottom_right_container}>
            <Image className={styles.ico_check} src={"/check-md.svg"} alt="체크 아이콘" width={18} height={18} />
            <span className={styles.ico_txt}>{post.voteCount}명 참여</span>
            <Image className={styles.chat_ico} src={"/comment-sm.svg"} alt="체크 아이콘" width={18} height={18} />
            <span className={styles.ico_txt}>{post.commentCount}</span>
          </div>
        </div>
      </div>
      <VoteBtnsContainer
        btnType={0}
        voteCount={post.voteCount}
        option1={post.option1}
        option2={post.option2}
        option1Count={post.option1Count}
        option2Count={post.option2Count}
        postId={post.postId}
        post={post}
        openLoginModal={openLoginModal}
      />
      <div className={styles.divider} />
      <ul className={styles.chat_ul}>
        {post.comments.map((comment) => (
          <li className={styles.chat_list} key={comment.commentId}>
            <Image
              className={styles.card_user_img}
              src={userImgUrl(comment.imageType)}
              alt="프로필 이미지"
              width={20}
              height={20}
            />
            <span>{comment.nickname}</span>
            <p className={styles.chat_contents}>{comment.content}</p>
          </li>
        ))}
      </ul>
      <div onClick={openLoginModal} className={styles.modal_btn}>
        <CommentInput postId={post.postId} />
      </div>
    </div>
  );
}

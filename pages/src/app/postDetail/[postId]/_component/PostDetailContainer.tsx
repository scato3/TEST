"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";

import { getPostDetailData } from "../_lib/getPostDetailData";
import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";
import CommentForm from "./commentForm";
import CommentList from "./commentList";
import ContentVote from "./contentVote";
import MoreCommentsButton from "./moreCommentButton";
import PostContent from "./postContent";
import UserInfo from "./userInfo";
export default function PostDetailContainer({ postId }: { postId: number }) {
  const { userInfo } = useUserDataContext();
  const [showAllComments, setShowAllComments] = useState(false);
  let token: null | string = null;
  if (userInfo.isLogin === 1) {
    token = userInfo.jwtToken?.accessToken;
  }
  const { data: postData } = useQuery<IPostData>({
    queryKey: ["post", "detail", postId, userInfo.isLogin],
    queryFn: () => {
      return getPostDetailData(postId, token);
    },
  });
  return (
    <div className={styles.postDetailContainer}>
      {postData ? (
        <>
          <div className={styles.topPadding}>
            <UserInfo postData={postData} />
            <PostContent postData={postData} />
            <ContentVote postData={postData} postId={postId} />
          </div>
          <div className={styles.seperator}></div>
          <div className={styles.commentContainer}>
            <div className={styles.commentCount}>
              <span>댓글</span>
              <span>{postData.comments.length}</span>
            </div>
            <CommentForm postData={postData} userImage={userInfo.imageType} />
            <CommentList comments={postData.comments} showAllComments={showAllComments} />
            {!showAllComments && postData.comments.length > 5 && (
              <MoreCommentsButton onClick={() => setShowAllComments(true)} />
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

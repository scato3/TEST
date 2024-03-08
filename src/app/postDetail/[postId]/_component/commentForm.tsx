import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";

import LoginModal from "@/app/_component/LoginModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useUserDataContext } from "@/context/AuthContext";
import { useModal } from "@/hook/useModal";
import { constant } from "@/utils/constant";
import { userImgUrl } from "@/utils/userImgUrl";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface ICommentFormProps {
  userImage: number;
  postData: IPostData;
}

export default function CommentForm({ userImage, postData }: ICommentFormProps) {
  const queryClient = useQueryClient();
  const { userInfo } = useUserDataContext();
  const [newComment, setNewComment] = useState<string>("");
  const [isComment, setIsComment] = useState<boolean>(false);
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const commentSubmit = useMutation({
    mutationFn: async () => {
      const res = await fetch(constant.apiUrl + `api/main/new/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          postId: postData?.postId,
          content: newComment,
        }),
      });
      return await res.json();
    },
    async onSuccess() {
      const userToken = localStorage.getItem("token");
      const headers: { [key: string]: string } = {};

      if (userToken) {
        headers.Authorization = userToken;
      }
      const updatedRes = await fetch(constant.apiUrl + `api/main/posts/${postData.postId}`, {
        headers: headers,
      });
      const data = await updatedRes.json();
      queryClient.setQueryData(["post", "detail", postData.postId, userInfo.isLogin], data);
      setNewComment("");
      setIsComment(false);
    },
  });

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    commentSubmit.mutate();
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className={styles.commentRegContainer}
      onClick={userInfo.isLogin !== 1 ? handleOpenMoal : undefined}
    >
      <div className={styles.voteButtonImageContainer}>
        {userImage ? (
          <Image src={userImgUrl(userImage)} alt="로그인 유저 이미지" width={24} height={24} />
        ) : (
          <Image src="/profile-md-test.png" alt="비로그인 유저 이미지" width={24} height={24} />
        )}
      </div>
      <input
        className={styles.commentInput}
        placeholder="댓글 달기..."
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value); // 입력 필드의 변경을 감지하여 상태 업데이트
          setIsComment(!!e.target.value); // 댓글이 들어오는지 확인
        }}
        maxLength={50}
      />
      <button className={`${styles.commentReg} ${isComment ? styles.isComment : ""}`}>등록</button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <LoginModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </form>
  );
}

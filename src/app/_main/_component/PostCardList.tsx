"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import JoinCompleteModal from "@/app/_component/JoinCompleteModal";
import LoginModal from "@/app/_component/LoginModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import PostCard from "@/app/_component/PostCard";
import { useUserDataContext } from "@/context/AuthContext";
import { useModal } from "@/hook/useModal";
import { IPost } from "@/modal/Post";

import { getCategoryPostList, getPostList } from "../_lib/getPosts";
import styles from "./postCartList.module.css";
import WriteFloating from "./WriteFloating";

export default function PostCardList() {
  const { userInfo } = useUserDataContext();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const {
    openModal: openJoinModal,
    handleOpenMoal: handleOpenJoinMoal,
    handleCloseModal: handleCloseJoinModal,
  } = useModal();

  const router = useRouter();

  const openLoginModal = () => {
    if (userInfo.isLogin !== 1) {
      handleOpenMoal();
    }
  };

  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab");
  const firstJoin = searchParams?.get("join");

  const { data, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery<IPost[], Error>({
    queryKey: ["posts", "all", tab, userInfo.isLogin],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      if (!tab || tab === "전체") {
        return await getPostList({ pageParam: page, isLogin: userInfo.isLogin });
      } else {
        return await getCategoryPostList({ pageParam: page, category: tab, isLogin: userInfo.isLogin });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages[allPages.length - 1].length / 10 < 1) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage && fetchNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (firstJoin) {
      router.replace("/");
      handleOpenJoinMoal();
    }
    setMounted(true);
  }, []);

  if (isPending) {
    return <div>loading 중...</div>;
  }

  return (
    <div>
      <ul className={styles.card_container}>
        {mounted &&
          data?.pages &&
          data?.pages.map((v, i) => (
            <Fragment key={i}>
              {v.map((post) => (
                <li className={styles.card_list} key={post.postId}>
                  <PostCard openLoginModal={openLoginModal} post={post} />
                </li>
              ))}
            </Fragment>
          ))}
      </ul>
      <div ref={ref} style={{ height: 10, backgroundColor: "#FAFAFA" }} />
      <WriteFloating />
      {openJoinModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseJoinModal}>
            <JoinCompleteModal handleCloseModal={handleCloseJoinModal} />
          </ModalContainer>
        </ModalPortal>
      )}
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <LoginModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}

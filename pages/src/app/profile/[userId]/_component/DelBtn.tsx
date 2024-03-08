"use client";

import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import React from "react";

import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hook/useModal";
import { constant } from "@/utils/constant";

import { getProfilePostData } from "../_lib/getProfilePostData";
import { IProfilePost } from "../page";
import DeleteConfirmModal from "./DeleteConfirmModal";
import styles from "./profilePostCard.module.css";

export default function DelBtn({ postId, userId }: { postId: number; userId: number }) {
  const {
    openModal: openDelConfirmModal,
    handleOpenMoal: handleOpenDelConfirmMoal,
    handleCloseModal: handleCloseDelConfirmModal,
  } = useModal();

  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: () => {
      return fetch(constant.apiUrl + `api/main/${postId}`, {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });
    },
    async onSuccess() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      const filterQuerys = queryKeys.filter((v) => {
        if (v[0] === "profile" && v[1] === "post" && v[2] === userId) {
          return true;
        }
        return false;
      });
      filterQuerys.forEach((queryKey) => {
        const value: IProfilePost | InfiniteData<IProfilePost[]> | undefined = queryClient.getQueryData(queryKey);
        if (value && "totalPosts" in value) {
          console.log("@@");
          const data = produce(value, (draftData) => {
            draftData.totalPosts = (draftData.totalPosts as number) - 1;
          });
          queryClient.setQueryData(queryKey, data);
        }
        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) => {
              const find = page.includes(obj);
              return find;
            });

            if (pageIndex >= 0) {
              const data = produce(value, (draftData) => {
                draftData.pages[pageIndex] = draftData.pages[pageIndex].filter((v) => v.postId !== postId);
              });
              queryClient.setQueryData(queryKey, data);
            }
          }
        }
      });
      const totalCntData = await getProfilePostData(userId, 1);
      queryClient.setQueryData(["profile", "post", userId, 1, "count"], totalCntData);
    },
  });

  const handleDel = () => {
    deletePost.mutate();
  };

  return (
    <>
      <button onClick={handleOpenDelConfirmMoal} className={styles.del_btn}>
        삭제
      </button>
      {openDelConfirmModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseDelConfirmModal}>
            <DeleteConfirmModal handleDel={handleDel} handleCloseModal={handleCloseDelConfirmModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}

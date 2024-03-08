import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import PostDetailNav from "../../_component/postDetailNav";
import PostDetailContainer from "./_component/PostDetailContainer";
import { getPostDetailData } from "./_lib/getPostDetailData";
import { IPostData } from "./interfaces";
import styles from "./postDetail.module.css";

export async function generateMetadata({ params }: { params: { postId: number } }): Promise<Metadata> {
  const data: IPostData = await getPostDetailData(params.postId, null);
  return {
    title: `${data.title} | Balance Board`,
    description: data.content,
  };
}

export default async function PostDetail({ params }: { params: { postId: number } }) {
  const { postId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "detail", postId, 0],
    queryFn: () => {
      return getPostDetailData(postId, null);
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.postDetailBox}>
      <PostDetailNav />
      <HydrationBoundary state={dehydratedState}>
        <PostDetailContainer postId={Number(postId)} />
      </HydrationBoundary>
    </div>
  );
}

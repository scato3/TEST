import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

import { Profiletab } from "@/app/_component/Tabs";

import ProfilePostListContainer from "./_component/ProfilePostListContainer";
import ProfileUserInfo from "./_component/ProfileUserInfo";
import { getProfileData } from "./_lib/getProfileData";

export interface IProfilePost {
  postId: number;
  title: string;
  created: string;
  category: string;
  content: string;
  voteCount: number;
  voted?: boolean | undefined;
  writed?: boolean | undefined;
}

export interface IPostPostData {
  profilePosts: IProfilePost[];
  totalCount: number;
  votedCount?: number;
  writedCount?: number;
}

export interface IProfileData {
  userId: number;
  email: string;
  nickname: string;
  imageType: number;
}

export default async function ProfilePage({ params: { userId } }: { params: { userId: number } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      return getProfileData(userId);
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <ProfileUserInfo userId={userId} />
        <Profiletab userId={userId} />
        <ProfilePostListContainer userId={userId} />
      </HydrationBoundary>
    </div>
  );
}

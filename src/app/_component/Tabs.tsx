"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useQueryGetProfilePostData } from "../profile/[userId]/_hook/useQueryGetProfilePostData";
import styles from "./tabs.module.css";

function Maintab() {
  const searchParams = useSearchParams();
  const category = searchParams.get("tab");
  const tabs = [
    { value: 0, label: "전체" },
    { value: 1, label: "이슈" },
    { value: 2, label: "라이프" },
    { value: 3, label: "정치・경제" },
    { value: 4, label: "기타" },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveTab(() => {
      if (category === "이슈") {
        return 1;
      } else if (category === "라이프") {
        return 2;
      } else if (category === "정치・경제") {
        return 3;
      } else if (category === "기타") {
        return 4;
      }
      return 0;
    });
  }, [category]);

  return (
    <div className={styles.tabsMenuContainer}>
      {tabs.map((tab, index) => (
        <Link
          href={{
            pathname: "/",
            query: { tab: tab.label },
          }}
          key={index}
          className={`${styles.tab} ${index === activeTab ? styles.active : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

function Profiletab({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const profileTab = Number(searchParams.get("profileTab"));
  const { data } = useQueryGetProfilePostData(userId);
  const [activeTab, setActiveTab] = useState<number>(0);
  const totalCount = data?.totalCount || 0;
  const writtenCount = data?.votedCount || 0;
  const votedCount = data?.writedCount || 0;

  const tabs = [
    { label: "전체", count: totalCount, value: 1 },
    { label: "작성한 글", count: votedCount, value: 2 },
    { label: "투표한 글", count: writtenCount, value: 3 },
  ];

  useEffect(() => {
    setActiveTab(() => {
      if (profileTab === 1) {
        return 1;
      } else if (profileTab === 2) {
        return 2;
      } else if (profileTab === 3) {
        return 3;
      }
      return 1;
    });
  }, [profileTab]);

  return (
    <div className={styles.tabsProfileContainer}>
      <div className={styles.tabsContainer}>
        {tabs.map((profileTab, index) => (
          <Link
            href={{
              query: { profileTab: profileTab.value },
            }}
            replace
            key={index}
            className={`${styles.profileTab} ${activeTab === index + 1 ? styles.active : ""}`}
          >
            <div className={styles.tabContent}>
              <div className={styles.tabLabel}>{profileTab.label}</div>
              <div className={styles.tabCount}>{profileTab.count}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`${styles.tabProfileBorderBottom} ${activeTab !== undefined ? styles.active : ""}`}></div>
    </div>
  );
}

export { Maintab, Profiletab };

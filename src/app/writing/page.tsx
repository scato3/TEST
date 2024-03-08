"use client";

import { useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";

import WritingCategory from "./_component/WritingCategory";
import WritingContent from "./_component/WritingContent";
import WritingForm from "./_component/WritingForm";
import WritingNav from "./_component/WritingNav";
import WritingTag from "./_component/WritingTag";
import WritingTitle from "./_component/WritingTitle";
import WritingVoteInput from "./_component/WritingVoteInput";
import styles from "./writing.module.css";

export default function Writing() {
  const { userInfo } = useUserDataContext();
  const [selectedCategory, setSelecteCategory] = useState<string | null>("");
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");
  const [option1, setOption1] = useState<string | null>("");
  const [option2, setOption2] = useState<string | null>("");
  const [tags, setTags] = useState<string[]>([""]);

  const handleCategorySelect = (selectedCategory: string) => {
    setSelecteCategory(selectedCategory);
  };

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const handleContent = (content: string) => {
    setContent(content);
  };

  const handleVoteOption = (option1: string, option2: string) => {
    setOption1(option1);
    setOption2(option2);
  };

  const handleTags = (newTags: string[]) => {
    setTags(newTags);
  };
  console.log(userInfo);

  return (
    <div className={styles.writingBox}>
      {userInfo.isLogin === 1 && (
        <>
          <WritingNav title={"Writing"}>
            <WritingForm
              selectedCategory={selectedCategory}
              title={title}
              content={content}
              option1={option1}
              option2={option2}
              tags={tags}
            />
          </WritingNav>
          <div className={styles.writingContainer}>
            <WritingCategory selectedOption={selectedCategory} OnSelectedOption={handleCategorySelect} />
            <WritingTitle onTitleData={handleTitle} />
            <WritingContent onContentData={handleContent} />
          </div>
          <div className={styles.tagContainer}>
            <WritingTag onTagsData={handleTags} />
            <div className={styles.seperator}></div>
          </div>
          <div className={styles.writingVoteContainer}>
            <div className={styles.voteItem}>투표 항목</div>
            <WritingVoteInput onVoteData={handleVoteOption} />
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

import styles from "./writingContent.module.css";

interface IWritingContentProps {
  onContentData: (content: string) => void;
}

export default function WritingContent({ onContentData }: IWritingContentProps) {
  const [content, setContent] = useState("");

  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFilled(true);
  };

  const handleBlur = () => {
    setIsFilled(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value.trimStart();
    if (inputText.length <= 1500) {
      setContent(inputText);
      onContentData(inputText);
    }
  };

  const placeholderText = "내용을 입력해주세요.\n부적절한 글일 경우 커뮤니티 이용 규칙에 따라 삭제 조치될 수 있습니다.";

  return (
    <div className={styles.contentBox}>
      <div className={`${styles.contentContainer} ${isFilled ? styles.contentFocused : ""}`}>
        <textarea
          placeholder={placeholderText}
          value={content}
          onChange={handleContentChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.contentInput}
          maxLength={1500}
        />
        <div className={styles.contentLengthContainer}>
          <div className={styles.contentLength}>{content.length}</div>
          <div className={styles.seperator}></div>
          <div>1500</div>
        </div>
      </div>
    </div>
  );
}

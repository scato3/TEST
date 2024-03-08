"use client";

import { useState } from "react";

import styles from "./writingtitle.module.css";

interface IWritingTitleProps {
  onTitleData: (title: string) => void;
}

export default function WritingTitle({ onTitleData }: IWritingTitleProps) {
  const [title, setTitle] = useState("");
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFilled(true);
  };

  const handleBlur = () => {
    setIsFilled(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.trimStart();
    if (inputText.length <= 30) {
      setTitle(inputText);
      setIsFilled(inputText.length > 0);
      onTitleData(inputText);
    }
  };

  return (
    <div className={styles.titleBox}>
      <div className={`${styles.titleContainer} ${isFilled ? styles.titleFocused : ""}`}>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.titleInput}
          maxLength={30}
        />
        <div className={styles.titleLengthContainer}>
          <div className={styles.titleLength}>{title.length}</div>
          <div className={styles.seperator}></div>
          <div>30</div>
        </div>
      </div>
    </div>
  );
}

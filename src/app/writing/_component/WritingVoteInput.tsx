import React, { useEffect, useState } from "react";

import styles from "./writingVoteInput.module.css";

interface IOptionInputProps {
  onVoteData: (option1: string, option2: string) => void;
}

export default function WritingVoteInput({ onVoteData }: IOptionInputProps) {
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOptionInput = (e: React.ChangeEvent<HTMLInputElement>, option: "option1" | "option2") => {
    const value = e.target.value.trimStart();
    if (option === "option1") {
      setOption1(value);
    } else {
      setOption2(value);
    }
    setErrorMessage("");
  };

  useEffect(() => {
    if (option1 !== "" && option2 !== "" && option1 === option2) {
      setErrorMessage("투표 항목은 서로 같을 수 없습니다.");
    } else {
      setErrorMessage("");
    }
    onVoteData(option1, option2);
  }, [option1, option2, onVoteData]);

  return (
    <div className={styles.writingVoteContainer}>
      <input
        value={option1}
        onChange={(e) => handleOptionInput(e, "option1")}
        placeholder="항목을 입력해주세요(최대 14글자)"
        className={styles.writingVoteInput}
        maxLength={14}
      />
      <input
        value={option2}
        onChange={(e) => handleOptionInput(e, "option2")}
        placeholder="항목을 입력해주세요(최대 14글자)"
        className={styles.writingVoteInput}
        maxLength={14}
      />
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

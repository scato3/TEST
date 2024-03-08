import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import x_circle from "../../../../public/X-circle-sm.svg";
import styles from "./writingtag.module.css";

interface IWritingTagProps {
  onTagsData: (newTags: string[]) => void;
}

export default function WritingTag({ onTagsData }: IWritingTagProps) {
  const [tags, setTags] = useState<string[]>([""]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current.forEach((inputRef, index) => {
      if (index === inputRefs.current.length - 1 && inputRef) {
        inputRef.focus();
      }
    });
  }, [tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const trimdValue = value.replace(/\s/g, "");
    if (trimdValue.length <= 6) {
      const newTags = [...tags];
      newTags[index] = trimdValue;
      setTags(newTags);
      setErrorMessage("");
      onTagsData(newTags);
    } else {
      setErrorMessage("태그는 6글자 이내로 작성해주세요!");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      const trimTag = tags[index].trim();

      if (trimTag !== "" && index === tags.length - 1 && tags.length < 5) {
        setTags([...tags, ""]);
        // 추가된 태그에 포커스를 설정합니다.
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleInputBlur = (index: number) => {
    if (tags[index].trim() === "" && tags.length > 1) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const handleTagRemove = (index: number) => {
    const remainingTags = tags.filter((_, idx) => idx !== index);
    if (remainingTags.length === 0) {
      setTags([""]);
    } else {
      setTags(remainingTags);
      // 태그를 삭제한 후 이전 태그에 포커스를 설정합니다.
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 0);
    }
  };

  const calculateInputWidth = (value: string) => {
    const minWidth = 80;
    const inputPadding = 18;
    const inputMinWidth = 12;

    const width = value ? value.length * inputMinWidth + inputPadding * 2 : minWidth;

    return width;
  };

  return (
    <div className={styles.tagBox}>
      <div className={styles.tagInfoContainer}>
        <div className={styles.tag}>태그</div>
        <div className={styles.tagCountContainer}>
          <div className={styles.tagCount}>{tags.filter((tag) => tag.trim() !== "").length}</div>
          <div className={styles.tagseperator}></div>
          <div className={styles.tagCountMax}>5</div>
        </div>
      </div>
      <div className={styles.taginputContainer}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tagAddContainer}>
            <input
              className={styles.tagAdd}
              placeholder={"# 태그추가"}
              value={tag}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleInputKeyDown(e, index)}
              onBlur={() => handleInputBlur(index)}
              ref={(ele) => {
                inputRefs.current[index] = ele;
              }}
              style={{ width: `${calculateInputWidth(tag)}px` }}
            />
            {tag.trim() !== "" && (
              <Image
                src={x_circle}
                alt="태그 삭제 버튼"
                width={18}
                height={18}
                className={styles.tagRemoveImg}
                onClick={() => handleTagRemove(index)}
              />
            )}
          </span>
        ))}
      </div>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  );
}

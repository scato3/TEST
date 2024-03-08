import Image from "next/image";
import { useState } from "react";

import direction_down from "../../../../public/direction-down-sm.svg";
import direction_green_up from "../../../../public/direction-green-up-md.svg";
import styles from "./writingCategory.module.css";

interface IWritingCategoryProps {
  selectedOption: string | null;
  OnSelectedOption: (option: string) => void;
}

export default function WritingCategory({ selectedOption, OnSelectedOption }: IWritingCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["이슈", "라이프", "정치・경제", "기타"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    OnSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={`${styles.dropDownBox} ${isOpen ? styles.clicked : ""}`} onClick={toggleDropdown}>
        <span className={selectedOption ? `${styles.selectedCategory}` : ""}>
          {selectedOption ? selectedOption : "카테고리를 선택해주세요."}
        </span>
        <Image src={isOpen ? direction_green_up : direction_down} alt="화살표 아이콘" width={24} height={24} />
      </div>
      {isOpen && (
        <div className={styles.dropdownOptionContainer}>
          {options.map((option) => (
            <div key={option} onClick={() => handleOptionClick(option)} className={styles.dropDownOption}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

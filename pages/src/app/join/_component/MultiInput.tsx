import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { constant } from "@/utils/constant";

import { useJoinDataContext } from "../_context/JoinContext";
import styles from "./multiInput.module.css";
import NextBtn from "./NextBtn";

export default function MultiInput() {
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [birthYear, setBirthYear] = useState(0);
  const [errMsg, setErrMsg] = useState("good");

  const router = useRouter();
  const {
    data: { submitData, visibleBtn, processType },
    setDataField,
    setVisibleBtn,
  } = useJoinDataContext();

  const calculateKoreanAge = (birthYear: number) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear + 1;
    return age;
  };
  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // 입력 값이 있고, 다음 인풋이 존재한다면 포커스 이동
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    const arr = newInputValues.filter((item) => !!item);
    if (arr.length >= 4) {
      const year = parseInt(arr.join(""), 10);
      if (year > 1) {
        const age = calculateKoreanAge(Number(year));
        if (age < 125) {
          setErrMsg("good");
          setBirthYear(age);
          setVisibleBtn(true);
          setDataField("birthYear", age + "");
        } else {
          setErrMsg("태어난 년도를 제대로 입력해 주세요");
        }
      } else {
        setErrMsg("태어난 년도를 제대로 입력해 주세요");
      }
    } else {
      setBirthYear(0);
      setVisibleBtn(false);
      setDataField("birthYear", "");
    }
  };

  const handleNext = async () => {
    if (!submitData.emailFont) return;
    if (!submitData.emailBack) return;
    if (!submitData.password) return;
    if (!submitData.gender) return;
    if (!submitData.birthYear) return;
    if (visibleBtn) {
      try {
        const res = await fetch(constant.apiUrl + "api/user/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: submitData.emailFont + "@" + submitData.emailBack,
            password: submitData.password,
            nickname: submitData.nickname,
            gender: submitData.gender,
            birthYear: submitData.birthYear,
          }),
        });
        // setProcessType(0)
        const data: { duplicate: boolean } = await res.json();
        if (data.duplicate) {
          alert("회원가입에 실패하였습니다");
        } else {
          router.push("/login");
          alert("회원가입이 완료 되었습니다");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    setVisibleBtn(false);
  }, [processType]);

  return (
    <div>
      <p className={styles.txt01}>더 정확한 투표 결과를 알려드릴게요.</p>
      <div className={styles.input_container}>
        {inputValues.map((value, index) => (
          <input
            className={styles.input_item}
            key={index}
            type="text"
            maxLength={1}
            value={value}
            ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
          />
        ))}
        {birthYear > 0 && errMsg === "good" && (
          <p className={styles.validation_txt}>
            {birthYear}살 {submitData.nickname}님, 반가워요
          </p>
        )}
        {errMsg !== "good" && <p className={`${styles.validation_txt} ${styles.wran_txt}`}>{errMsg}</p>}
      </div>
      <NextBtn handleNext={handleNext} txt={visibleBtn ? "시작하기" : "다음"} />
    </div>
  );
}

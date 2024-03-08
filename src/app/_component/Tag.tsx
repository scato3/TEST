import classNames from "classnames/bind";
import React from "react";

import styles from "./tag.module.css";

const cx = classNames.bind(styles);

interface IProps {
  color?: "basic" | "primary";
  className?: string;
  tagName: string;
}

export default function Tag({ color = "basic", className, tagName }: IProps) {
  const style = cx(color);
  let tagValue = tagName;
  if (tagName === "정치_경제") {
    tagValue = "정치・경제";
  }
  return <div className={`${styles.tag} ${style} ${className}`}>{tagValue}</div>;
}

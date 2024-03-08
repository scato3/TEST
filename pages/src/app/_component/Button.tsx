import classNames from "classnames/bind";
import React, { ComponentPropsWithRef } from "react";

import styles from "./button.module.css";

export interface IButton extends ComponentPropsWithRef<"button"> {
  bgColor?:
    | "primary"
    | "background_100"
    | "background_200"
    | "body_200"
    | "secondary_300"
    | "body_100"
    | "primary_50"
    | "title_400";
  rounded?: "none" | "rounded" | "large";
  border?: "none" | "primary" | "gray" | "orange" | "primary_600";
  color?: "none" | "primary";
  size?: "normal" | "small";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const cx = classNames.bind(styles);

export default function Button({
  bgColor = "primary",
  rounded = "rounded",
  fullWidth = true,
  border = "none",
  color = "none",
  size = "normal",
  children,
  className,
  ...props
}: IButton) {
  const style = cx(
    "button",
    `bg_${bgColor}`,
    `color_${color}`,
    `radius_${rounded}`,
    `border_${border}`,
    `size_${size}`,
    {
      w_100: fullWidth,
    },
  );
  return (
    <button className={`${style} ${className}`} {...props}>
      {children}
    </button>
  );
}

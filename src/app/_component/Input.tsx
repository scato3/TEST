import classNames from "classnames/bind";

import styles from "./input.module.css";

const cx = classNames.bind(styles);

export interface InputProps
  extends Partial<
    Pick<
      HTMLInputElement,
      | "type"
      | "value"
      | "defaultValue"
      | "placeholder"
      | "id"
      | "name"
      | "disabled"
      | "autocomplete"
      | "step"
      | "className"
    >
  > {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  focusColor?: "off" | "on";
  border?: "none" | "body_500";
  caret?: "none" | "blue";
  fontSize?: "basic" | "body_2" | "caption_txt_2" | "sub_title_2";
}
export default function Input({ border = "none", caret = "none", fontSize = "basic", ...props }: InputProps) {
  const { type = "text", onChange, className, ...rest } = props;
  const style = cx("input", `border_${border}`, `caret_${caret}`, fontSize);
  return <input className={`${style} ${className}`} type={type} onChange={onChange} {...rest} />;
}

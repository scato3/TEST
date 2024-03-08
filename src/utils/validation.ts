export const validateEmail = (email: string) => {
  if (!email) {
    return "이메일을 입력해주세요.";
  }

  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;

  return "이메일 형식이 올바르지 않습니다.";
};

"use client";
import { useRef, useState } from "react";
import { CreateNewPassword } from "./CreateNewPassword";
import { VerifyEmail } from "./VerifyEmail";
import { ResetPassword } from "./ResetPassword.";

export const PassPage = () => {
  const [page, setPage] = useState(0);

  const handleNextPage = () => {
    if (page >= 0 && page < 2) {
      setPage(page + 1);
    }
    console.log(page);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const emailInputRef = useRef<HTMLInputElement>(null);

  const ForgotPassWordArray = [
    <ResetPassword
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      emailInputRef={emailInputRef}
    />,
    <VerifyEmail
      emailInputRef={emailInputRef}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />,
    <CreateNewPassword handlePreviousPage={handlePreviousPage} />,
  ][page];

  return <div>{ForgotPassWordArray}</div>;
};

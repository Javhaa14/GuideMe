"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

export const VerifyEmail = ({
  handleNextPage,
  handlePreviousPage,
  emailInputRef,
}: {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[350px]">
        <Button className="bg-white border text-black w-9 h-9">
          <div onClick={handlePreviousPage} className="cursor-pointer">
            <ChevronLeft size={16} />
          </div>
        </Button>
        <div>
          <p className="text-[#09090B] text-[24px] font-semibold">
            Please verify your email
          </p>

          <p className="text-[16px] text-[#71717A]">
            We just sent an email to {emailInputRef.current?.value} Click the
            link in the email to verify your account.
          </p>
        </div>

        <Button className="bg-black" onClick={handleNextPage}>
          Resend email
        </Button>
      </div>
    </div>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const CreateNewPassword = ({
  handlePreviousPage,
}: {
  handlePreviousPage: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };
  const router = useRouter();
  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[350px]">
        <Button className="bg-white border text-black w-9 h-9 p-0">
          <div onClick={handlePreviousPage} className="cursor-pointer">
            <ChevronLeft size={16} />
          </div>
        </Button>

        <div>
          <p className="text-[#09090B] text-[24px] font-semibold">
            Create a strong password
          </p>
          <p className="text-[16px] text-[#71717A]">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onClick={handleShowPassword} />
            <Label htmlFor="terms" className="text-gray-400 font-normal">
              Show password
            </Label>
          </div>
        </div>

        <Button onClick={() => router.push("/log-in")} className="bg-black   ">
          Let's Go
        </Button>
      </div>
    </div>
  );
};

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./Card";
export const Subscription = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer flex justify-center items-center rounded-2xl w-[100px] h-[30px] text-white bg-blue-400">
          Subscription
        </span>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex w-fit flex-col justify-center items-center">
            <Card />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

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
import { useEffect, useState } from "react";
import axios from "axios";

export const Subscription = () => {
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");

  const [qr, setQr] = useState("");
  const handleplan = async (e: any, plan: string | null) => {
    e.stopPropagation();

    if (!plan) return;

    setStep(2);
    setQr("");
    setPaymentId(null);
    setStatus("");

    // You can send the selected plan to your backend if needed
    const data = await axios.get(`https://guideme-8o9f.onrender.com`, {
      params: { plan }, // send selected plan to backend (optional)
    });

    setQr(data.data.qr);
    setPaymentId(data.data.id);
  };

  useEffect(() => {
    if (!paymentId) return;

    const ws = new WebSocket("https://guideme-8o9f.onrender.com");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "watch", paymentId }));
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.status === true) {
        setStatus("payment success");
        ws.close();
      }
    };
  }, [paymentId]);
  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer flex justify-center items-center rounded-2xl w-[100px] h-[30px] text-white bg-blue-400">
          Subscription
        </span>
      </DialogTrigger>
      <DialogContent className="w-fit flex justify-center">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex w-fit flex-col justify-center items-center">
            {" "}
            <Card handleplan={handleplan} step={step} qr={qr} status={status} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

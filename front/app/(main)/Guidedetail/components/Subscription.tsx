import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";

export const Subscription = () => {
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [open, setOpen] = useState(false); // control dialog state

  const handleplan = async (e: any, plan: string | null) => {
    e.stopPropagation();

    if (!plan) return;

    setStep(2);
    setQr("");
    setPaymentId(null);
    setStatus("");

    const data = await axiosInstance.get("/", {
      params: { plan },
    });

    setQr(data.data.qr);
    setPaymentId(data.data.id);
  };

  useEffect(() => {
    if (!paymentId) return;

    const ws = new WebSocket("wss://guideme-8o9f.onrender.com"); // should be wss for secure
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

    return () => {
      ws.close();
    };
  }, [paymentId]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setQr("");
      setPaymentId(null);
      setStatus("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer flex justify-center items-center rounded-2xl w-[100px] h-[30px] text-white bg-blue-400">
          Subscription
        </span>
      </DialogTrigger>
      <DialogContent className="w-fit flex justify-center">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex w-fit flex-col justify-center items-center">
            <Card handleplan={handleplan} step={step} qr={qr} status={status} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

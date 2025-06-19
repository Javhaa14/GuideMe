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
import { io, Socket } from "socket.io-client";

export const Subscription = () => {
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

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
    // Initialize socket connection once when component mounts
    const newSocket = io("https://guideme-8o9f.onrender.com", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !paymentId) return;

    socket.emit("watchPayment", paymentId);

    socket.on("paymentStatus", (message: { status: boolean }) => {
      if (message.status === true) {
        setStatus("payment success");
      }
    });
    return () => {
      socket.off("paymentStatus");
    };
  }, [socket, paymentId]);

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

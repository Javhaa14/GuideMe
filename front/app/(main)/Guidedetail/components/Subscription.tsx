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
<<<<<<< HEAD

export const Subscription = () => {
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [open, setOpen] = useState(false); // control dialog state
=======
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";

export const Subscription = () => {
  const [step, setStep] = useState(1);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState("");
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
<<<<<<< HEAD
        <span className="cursor-pointer flex justify-center items-center rounded-2xl w-[100px] h-[30px] text-white bg-blue-400">
          Subscription
        </span>
=======
        <Button>Subscription</Button>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

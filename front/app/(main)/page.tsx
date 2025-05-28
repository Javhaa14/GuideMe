"use client";
import Image from "next/image";
import { Footer } from "./components/Footer";
import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Navigation } from "./components/Navigation";
import { Videos } from "./components/Videos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const qrgenerate = async () => {
    setStatus("");
    const data = await axios.get(`http://${"172.17.17.9"}:9999`);
    setQr(data.data.qr);
    setPaymentId(data.data.id);
  };

  useEffect(() => {
    if (!paymentId) return;

    const ws = new WebSocket("ws://172.17.17.9:9999");
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
    <div className="flex flex-col">
      <Navigation />
      <ImageCarousel />
      <Guides />
      <Videos />

      <button onClick={qrgenerate}>pay</button>
      {qr && <img className="size-[100px]" src={qr} alt="qr"></img>}
      {status && <p className="text-red-400">Payment success</p>}
      <Footer />
    </div>
  );
}

import { TentTree } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="bg-green-400 text-black py-10 w-screen h-[280px]">
      <div className="flex px-20 w-screen justify-between">
        <div className="gap-3 pr-30">
          <div className="gap-2 flex pb-3">
            <TentTree />
            <p className="text-4 italic font-bold">Guide</p>
          </div>
          <div>
            <p className="text-[14px] font-normal">
              © 2025 Guide. All Rights Reserved.
            </p>
          </div>
        </div>

        <div className="flex gap-[96px] w-[950px] justify-end">
          <div>
            <p className="text-[14px] font-normal pb-[12px]">
              Contact Information
            </p>

            <div>
              <div className="flex items-center gap-[12px] pb-[24px]">
                <Mail className="w-[16px] h-[16px]" />
                <div className="text-[14px] ">
                  <p className="font-medium">Email:</p>
                  <p className="font-normal">guide@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">
                <Phone className="w-[16px] h-[16px]" />
                <div className="text-[14px] ">
                  <p className="font-medium">Phone:</p>
                  <p className="font-normal">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[14px]">
            <h3 className="font-normal pb-3">Follow us</h3>
            <div className="flex gap-4 font-medium">
              <a href="https://www.facebook.com/">Facebook</a>
              <a href="https://www.instagram.com/">Instagram</a>
              <a href="https://www.twitter.com/">Twitter</a>
              <a href="https://www.youtube.com/">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

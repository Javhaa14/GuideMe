import React from "react";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateTripDialog } from "./CreateTripDialog";

export const NewTrip = () => {
  return (
    <div className="pt-18">
      <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-green-700 rounded-full shadow-md hover:bg-green-800 hover:shadow-2xl hover:scale-105">
            <PlusCircle className="w-5 h-5" />
            Create New Trip
          </button>
        </DialogTrigger>
        {/* <CreateTripDialog /> */}
        hi
      </Dialog>
    </div>
  );
};

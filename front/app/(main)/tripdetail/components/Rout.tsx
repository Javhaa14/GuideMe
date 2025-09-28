"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Utensils,
  Tent,
  Hotel,
  Bus,
  Plus,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";
import { axiosInstance } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useUser } from "@/app/context/Usercontext"; // 🟢 хэрэглэгчийн hook

const iconComponents = {
  location: MapPin,
  food: Utensils,
  activity: Tent,
  hotel: Hotel,
  transport: Bus,
};

type RouteItem = {
  _id: string;
  image: string;
  title: string;
  about: string;
  iconType: keyof typeof iconComponents;
};

type TripItem = {
  _id: string;
  userId: string; // 🟢 Үүсгэсэн хэрэглэгч
  title: string;
  route: RouteItem[];
  highlights: string[];
  tips: string[];
};

export default function RoutEditor() {
  const params = useParams();
  const tripId =
    typeof params.id === "string" ? params.id : params.id?.[0] || "";

  const [trip, setTrip] = useState<TripItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");
  const [newTip, setNewTip] = useState("");

  const { user } = useUser(); // 🟢 Одоогийн хэрэглэгч

  useEffect(() => {
    if (tripId) fetchTrip();
  }, [tripId]);

  async function fetchTrip() {
    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);
      if (res.data.success && res.data.tripPlan) {
        setTrip(res.data.tripPlan);
      } else {
        toast.error("Аялал олдсонгүй");
      }
    } catch (e) {
      toast.error("Алдаа гарлаа: " + (e as any).message);
    }
  }

  async function saveTrip() {
    if (!trip) return;

    // 🟢 Зөвхөн үүсгэсэн хэрэглэгч хадгалах боломжтой
    if (trip.userId !== user?.id) {
      return toast.error("Та энэ аяллыг засах эрхгүй байна");
    }

    try {
      const res = await axiosInstance.put(`/tripPlan/${tripId}`, trip);
      if (res.data.success) {
        toast.success("Амжилттай хадгаллаа!");
        setIsEditing(false);
        fetchTrip();
      } else {
        toast.error("Хадгалахад алдаа: " + res.data.message);
      }
    } catch (e) {
      toast.error("Серверийн алдаа: " + (e as any).message);
    }
  }

  function updateRouteItem<K extends keyof RouteItem>(
    index: number,
    field: K,
    value: RouteItem[K]
  ) {
    if (!trip) return;
    const newRoute = [...trip.route];
    newRoute[index] = { ...newRoute[index], [field]: value };
    setTrip({ ...trip, route: newRoute });
  }

  function addRouteItem() {
    if (!trip) return;
    const newItem: RouteItem = {
      _id: `new-${Date.now()}`,
      image: "",
      title: "",
      about: "",
      iconType: "location",
    };
    setTrip({ ...trip, route: [...trip.route, newItem] });
  }

  function removeRouteItem(index: number) {
    if (!trip) return;
    const route = [...trip.route];
    route.splice(index, 1);
    setTrip({ ...trip, route });
  }

  function addHighlight() {
    if (!trip || !newHighlight.trim()) return;
    setTrip({ ...trip, highlights: [...trip.highlights, newHighlight.trim()] });
    setNewHighlight("");
  }

  function removeHighlight(i: number) {
    if (!trip) return;
    const arr = [...trip.highlights];
    arr.splice(i, 1);
    setTrip({ ...trip, highlights: arr });
  }

  function addTip() {
    if (!trip || !newTip.trim()) return;
    setTrip({ ...trip, tips: [...trip.tips, newTip.trim()] });
    setNewTip("");
  }

  function removeTip(i: number) {
    if (!trip) return;
    const arr = [...trip.tips];
    arr.splice(i, 1);
    setTrip({ ...trip, tips: arr });
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const file = e.target.files?.[0];
    if (!file || !trip) return;
    const url = URL.createObjectURL(file);
    updateRouteItem(index, "image", url);
  }

  if (!trip)
    return (
      <p className="text-center p-10 text-muted-foreground">
        Ачааллаж байна...
      </p>
    );

  const canEdit = trip.userId === user?.id; // 🟢 Засах эрхийг шалгах

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            value={trip.title}
            onChange={(e) => setTrip({ ...trip, title: e.target.value })}
            className="text-2xl font-bold"
          />
        ) : (
          <h1 className="text-3xl font-bold">{trip.title}</h1>
        )}

        {/* 🟢 Засах эрхтэй хэрэглэгчид л товч харуулах */}
        {canEdit && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={saveTrip}
                >
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
              </>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        )}
      </div>

      {trip.route.map((item, idx) => {
        const Icon = iconComponents[item.iconType];
        return (
          <div
            key={item._id}
            className="group bg-white shadow rounded-2xl p-4 space-y-4 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex gap-4">
              <div className="relative w-40 h-28 bg-muted rounded-xl overflow-hidden group-hover:ring-2 group-hover:ring-primary transition duration-300">
                {item.image && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                )}
                {isEditing && canEdit && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, idx)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
                {!isEditing && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-white text-xs">
                    Click to View
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                {isEditing && canEdit ? (
                  <>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        updateRouteItem(idx, "title", e.target.value)
                      }
                    />
                    <Textarea
                      value={item.about}
                      onChange={(e) =>
                        updateRouteItem(idx, "about", e.target.value)
                      }
                    />
                    <Select
                      value={item.iconType}
                      onValueChange={(val) =>
                        updateRouteItem(
                          idx,
                          "iconType",
                          val as keyof typeof iconComponents
                        )
                      }
                    >
                      <SelectTrigger />
                      <SelectContent>
                        {Object.keys(iconComponents).map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      onClick={() => removeRouteItem(idx)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition duration-300">
                      {item.title}
                    </h2>
                    <p>{item.about}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="w-4 h-4" />
                      {item.iconType}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {isEditing && canEdit && (
        <div className="flex justify-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={addRouteItem}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Stop
          </Button>
        </div>
      )}

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">🌟 Highlights</h3>
        {isEditing && canEdit && (
          <div className="flex gap-2 mb-4">
            <Input
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add highlight"
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={addHighlight}
            >
              <Plus />
            </Button>
          </div>
        )}
        <ul className="list-disc ml-5 space-y-1">
          {trip.highlights.map((hl, i) => (
            <li key={i} className="flex justify-between items-center">
              {hl}
              {isEditing && canEdit && (
                <X
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeHighlight(i)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
        {isEditing && canEdit && (
          <div className="flex gap-2 mb-4">
            <Input
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              placeholder="Add tip"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={addTip}>
              <Plus />
            </Button>
          </div>
        )}
        <ul className="list-disc ml-5 space-y-1">
          {trip.tips.map((tip, i) => (
            <li key={i} className="flex justify-between items-center">
              {tip}
              {isEditing && canEdit && (
                <X
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeTip(i)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

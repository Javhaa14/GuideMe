"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
>>>>>>> b9f6e45 (..)
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export default function TripsPagination() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const router = useRouter();
=======
>>>>>>> b9f6e45 (..)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
<<<<<<< HEAD
        const res = await axiosInstance.get(`/tripPlan`);
        if (res.data && Array.isArray(res.data.tripPlans)) {
          setTrips(res.data.tripPlans);
        } else {
          setTrips([]);
        }
      } catch (err) {
        console.error("❌ Error fetching trip plans:", err);
=======
        const res = await axiosInstance.get("/tripPlan");
        // ✅ res.data.data эсвэл res.data-г шалга
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          console.error("❌ Data is not an array:", data);
          setTrips([]);
        }
      } catch (err) {
        console.error("❌ Trip fetch failed:", err);
>>>>>>> b9f6e45 (..)
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

<<<<<<< HEAD
=======
  // ✨ Хоосон байхад урьдчилан шалгах
>>>>>>> b9f6e45 (..)
  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Loading trips...
      </div>
    );
  }

<<<<<<< HEAD
  if (trips.length === 0) {
=======
  if (!Array.isArray(trips) || trips.length === 0) {
>>>>>>> b9f6e45 (..)
    return (
      <div className="text-center text-muted-foreground py-12">
        No trips found.
      </div>
    );
  }

  const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTrips = trips.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
<<<<<<< HEAD
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Adventure Trips</h1>
        <p className="text-muted-foreground">
=======
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Adventure Trips</h1>
        <p className="text-muted-foreground text-center">
>>>>>>> b9f6e45 (..)
          Discover amazing destinations with our guided tours
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentTrips.map((trip) => (
          <Card
<<<<<<< HEAD
            key={trip._id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => router.push(`/tripdetail/${trip._id}`)}
          >
            <div className="relative overflow-hidden">
              <Image
                src={
                  typeof trip.images === "string"
                    ? trip.images
                    : trip.images[0] || "/placeholder.jpg"
                }
=======
            key={trip._id || trip.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
          >
            <div className="relative overflow-hidden">
              <Image
                src={trip.images || "/lake.png"}
>>>>>>> b9f6e45 (..)
                alt={trip.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  ${trip.price}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
<<<<<<< HEAD
=======
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>{trip.location}</span>
              </div>
>>>>>>> b9f6e45 (..)
              <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {trip.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{trip.groupSize} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
<<<<<<< HEAD
                  <span>{new Date(trip.date).toLocaleDateString()}</span>
=======
                  <span>{trip.date}</span>
>>>>>>> b9f6e45 (..)
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(endIndex, trips.length)} of{" "}
        {trips.length} trips
      </div>
    </div>
  );
}

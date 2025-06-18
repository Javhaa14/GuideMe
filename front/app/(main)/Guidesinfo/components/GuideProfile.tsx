// // "use client";
// // import {
// //   Star,
// //   MapPin,
// //   Clock,
// //   Car,
// //   Users,
// //   Sparkles,
// //   Award,
// //   Globe,
// // } from "lucide-react";
// // import type { Guide } from "../page";

// // interface GuideProfileProps {
// //   post: Guide;
// //   id: string;
// //   onclick: () => void;
// //   status: "available" | "inavailable" | "busy";
// //   profileimage: string;
// //   rating: number;
// //   price: number;
// //   name: string;
// //   location: string;
// //   about: string;
// // }

// // export function GuideProfile({
// //   post,
// //   id,
// //   onclick,
// //   status,
// //   profileimage,
// //   rating,
// //   price,
// //   name,
// //   location,
// //   about,
// // }: GuideProfileProps) {
// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "available":
// //         return "from-emerald-400 to-green-500";
// //       case "busy":
// //         return "from-amber-400 to-orange-500";
// //       case "inavailable":
// //         return "from-red-400 to-rose-500";
// //       default:
// //         return "from-gray-400 to-slate-500";
// //     }
// //   };

// //   const getStatusText = (status: string) => {
// //     switch (status) {
// //       case "available":
// //         return "Available Now";
// //       case "busy":
// //         return "Currently Busy";
// //       case "inavailable":
// //         return "Unavailable";
// //       default:
// //         return "Unknown";
// //     }
// //   };

// //   const getStatusIcon = (status: string) => {
// //     switch (status) {
// //       case "available":
// //         return "✨";
// //       case "busy":
// //         return "⏰";
// //       case "inavailable":
// //         return "💤";
// //       default:
// //         return "❓";
// //     }
// //   };

// //   return (
// //     <div
// //       onClick={onclick}
// //       className="group relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:border-white/20 overflow-hidden"
// //     >
// //       {/* Animated background gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

// //       {/* Floating particles effect */}
// //       <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
// //         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
// //         <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300"></div>
// //         <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500"></div>
// //       </div>

// //       <div className="relative bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-sm rounded-[1.75rem] p-6 border border-white/5">
// //         {/* Status Badge with enhanced design */}
// //         <div className="absolute -top-2 -right-2 z-20">
// //           <div
// //             className={`bg-gradient-to-r ${getStatusColor(
// //               status
// //             )} px-4 py-2 rounded-2xl shadow-lg shadow-black/20 flex items-center gap-2 border border-white/20`}
// //           >
// //             <span className="text-sm">{getStatusIcon(status)}</span>
// //             <div
// //               className={`w-2 h-2 bg-white rounded-full ${
// //                 status === "available" ? "animate-pulse" : ""
// //               }`}
// //             ></div>
// //             <span className="text-white text-xs font-semibold tracking-wide">
// //               {getStatusText(status)}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Enhanced Profile Image */}
// //         <div className="relative mb-6 group/image">
// //           <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

// //           <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 border border-white/10">
// //             {profileimage ? (
// //               <img
// //                 src={profileimage || "/placeholder.svg"}
// //                 alt={name}
// //                 className="w-full h-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-110"
// //               />
// //             ) : (
// //               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
// //                 <Users className="w-20 h-20 text-white/40" />
// //               </div>
// //             )}

// //             {/* Enhanced gradient overlay */}
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

// //             {/* Floating price badge */}
// //             <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl border border-white/20 transform group-hover/image:scale-105 transition-transform duration-300">
// //               <div className="flex items-baseline gap-1">
// //                 <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                   ${price}
// //                 </span>
// //                 <span className="text-sm font-medium text-slate-600">/day</span>
// //               </div>
// //             </div>

// //             {/* Premium badge if high rating */}
// //             {rating >= 4.5 && (
// //               <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
// //                 <Award className="w-3 h-3 text-white" />
// //                 <span className="text-xs font-bold text-white">PREMIUM</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Enhanced Content */}
// //         <div className="space-y-4">
// //           {/* Name, Location and Rating */}
// //           <div className="space-y-3">
// //             <div className="flex items-start justify-between">
// //               <div className="flex-1">
// //                 <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500 leading-tight">
// //                   {name}
// //                 </h3>
// //                 <div className="flex items-center gap-2 mt-2">
// //                   <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-300 transition-colors">
// //                     <MapPin className="w-4 h-4" />
// //                     <span className="text-sm font-medium">{location}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-500/20 backdrop-blur-sm px-3 py-2 rounded-2xl border border-amber-400/20">
// //                 <div className="flex items-center gap-1">
// //                   <Star className="w-4 h-4 text-amber-400 fill-current" />
// //                   <span className="text-lg font-bold text-amber-400">
// //                     {rating.toFixed(1)}
// //                   </span>
// //                 </div>
// //                 <Sparkles className="w-3 h-3 text-amber-400/60" />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Enhanced About */}
// //           <div className="relative">
// //             <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-200 transition-colors duration-300">
// //               {about ||
// //                 "Experienced guide ready to show you the best of the city with personalized tours and local insights!"}
// //             </p>
// //           </div>

// //           {/* Enhanced Features Grid */}
// //           <div className="grid grid-cols-2 gap-3">
// //             {post.car === "true" && (
// //               <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
// //                 <div className="p-1 bg-blue-500/20 rounded-lg">
// //                   <Car className="w-3 h-3 text-blue-400" />
// //                 </div>
// //                 <span className="text-xs font-medium text-slate-300">
// //                   Has Vehicle
// //                 </span>
// //               </div>
// //             )}

// //             <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
// //               <div className="p-1 bg-green-500/20 rounded-lg">
// //                 <Clock className="w-3 h-3 text-green-400" />
// //               </div>
// //               <span className="text-xs font-medium text-slate-300">
// //                 {post.experience}
// //               </span>
// //             </div>

// //             {post.languages && post.languages.length > 0 && (
// //               <div className="col-span-2 flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all duration-300">
// //                 <div className="p-1 bg-purple-500/20 rounded-lg">
// //                   <Globe className="w-3 h-3 text-purple-400" />
// //                 </div>
// //                 <span className="text-xs font-medium text-slate-300">
// //                   Speaks {post.languages.length} language
// //                   {post.languages.length > 1 ? "s" : ""}
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           {/* Enhanced Languages Tags */}
// //           {post.languages && post.languages.length > 0 && (
// //             <div className="space-y-2">
// //               <div className="flex flex-wrap gap-2">
// //                 {post.languages.slice(0, 4).map((language, index) => (
// //                   <span
// //                     key={index}
// //                     className="px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-slate-200 hover:from-white/20 hover:to-white/10 transition-all duration-300 cursor-default"
// //                   >
// //                     {language}
// //                   </span>
// //                 ))}
// //                 {post.languages.length > 4 && (
// //                   <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-xs font-medium text-blue-200 cursor-default">
// //                     +{post.languages.length - 4} more
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Enhanced hover glow effect */}
// //         <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700 pointer-events-none"></div>

// //         {/* Subtle border glow */}
// //         <div className="absolute inset-0 rounded-[1.75rem] border border-transparent bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 pointer-events-none [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]"></div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { Star, MapPin, Clock, Car, Users, Globe } from "lucide-react";
// import type { Guide } from "../page";

// interface GuideProfileProps {
//   post: Guide;
//   id: string;
//   onclick: () => void;
//   status: "available" | "inavailable" | "busy";
//   profileimage: string;
//   rating: number;
//   price: number;
//   name: string;
//   location: string;
//   about: string;
// }

// export function GuideProfile({
//   post,
//   id,
//   onclick,
//   status,
//   profileimage,
//   rating,
//   price,
//   name,
//   location,
//   about,
// }: GuideProfileProps) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "available":
//         return "bg-green-500";
//       case "busy":
//         return "bg-yellow-500";
//       case "inavailable":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "available":
//         return "Available";
//       case "busy":
//         return "Busy";
//       case "inavailable":
//         return "Unavailable";
//       default:
//         return "Unknown";
//     }
//   };

//   return (
//     <div
//       onClick={onclick}
//       className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
//     >
//       {/* Status Badge */}
//       <div className="absolute top-4 right-4 z-10">
//         <div
//           className={`${getStatusColor(
//             status
//           )} px-3 py-1 rounded-full flex items-center gap-2 shadow-sm`}
//         >
//           <div
//             className={`w-2 h-2 bg-white rounded-full ${
//               status === "available" ? "animate-pulse" : ""
//             }`}
//           ></div>
//           <span className="text-white text-xs font-medium">
//             {getStatusText(status)}
//           </span>
//         </div>
//       </div>

//       {/* Profile Image */}
//       <div className="relative">
//         <div className="w-full h-48 bg-gray-100 overflow-hidden">
//           {profileimage ? (
//             <img
//               src={profileimage || "/placeholder.svg"}
//               alt={name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-50">
//               <Users className="w-16 h-16 text-gray-300" />
//             </div>
//           )}
//         </div>

//         {/* Price Badge */}
//         <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-xl shadow-lg">
//           <span className="text-xl font-bold text-gray-900">${price}</span>
//           <span className="text-sm text-gray-500 ml-1">/day</span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6 space-y-4">
//         {/* Name and Rating */}
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//               {name}
//             </h3>
//             <div className="flex items-center gap-1 mt-1">
//               <MapPin className="w-4 h-4 text-gray-400" />
//               <span className="text-sm text-gray-600">{location}</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
//             <Star className="w-4 h-4 text-yellow-500 fill-current" />
//             <span className="text-sm font-semibold text-gray-900">
//               {rating.toFixed(1)}
//             </span>
//           </div>
//         </div>

//         {/* About */}
//         <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
//           {about || "Experienced guide ready to show you the best of the city!"}
//         </p>

//         {/* Features */}
//         <div className="flex items-center gap-4 text-sm text-gray-500">
//           {post.car === "true" && (
//             <div className="flex items-center gap-1">
//               <Car className="w-4 h-4" />
//               <span>Has car</span>
//             </div>
//           )}

//           <div className="flex items-center gap-1">
//             <Clock className="w-4 h-4" />
//             <span>{post.experience}</span>
//           </div>

//           {post.languages && post.languages.length > 0 && (
//             <div className="flex items-center gap-1">
//               <Globe className="w-4 h-4" />
//               <span>{post.languages.length} languages</span>
//             </div>
//           )}
//         </div>

//         {/* Languages */}
//         {post.languages && post.languages.length > 0 && (
//           <div className="flex flex-wrap gap-2">
//             {post.languages.slice(0, 3).map((language, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
//               >
//                 {language}
//               </span>
//             ))}
//             {post.languages.length > 3 && (
//               <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
//                 +{post.languages.length - 3} more
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Cool hover effect - subtle glow */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
//     </div>
//   );
// }
"use client";
import { Star, MapPin, Clock, Car, Users, Globe } from "lucide-react";
import type { Guide } from "../page";

interface GuideProfileProps {
  post: Guide;
  id: string;
  onclick: () => void;
  status: "available" | "inavailable" | "busy";
  profileimage: string;
  rating: number;
  price: number;
  name: string;
  location: string;
  about: string;
}

export function GuideProfile({
  post,
  id,
  onclick,
  status,
  profileimage,
  rating,
  price,
  name,
  location,
  about,
}: GuideProfileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "inavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "busy":
        return "Busy";
      case "inavailable":
        return "Unavailable";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      onClick={onclick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`${getStatusColor(
            status
          )} px-3 py-1 rounded-full flex items-center gap-2 shadow-sm`}
        >
          <div
            className={`w-2 h-2 bg-white rounded-full ${
              status === "available" ? "animate-pulse" : ""
            }`}
          ></div>
          <span className="text-white text-xs font-medium">
            {getStatusText(status)}
          </span>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          {profileimage ? (
            <img
              src={profileimage || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <Users className="w-16 h-16 text-gray-300" />
            </div>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-xl shadow-lg">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <span className="text-sm text-gray-500 ml-1">/day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name and Rating */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* About */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {about || "Experienced guide ready to show you the best of the city!"}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {post.car === "true" && (
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4" />
              <span>Has car</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.experience}</span>
          </div>

          {post.languages && post.languages.length > 0 && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{post.languages.length} languages</span>
            </div>
          )}
        </div>

        {/* Languages */}
        {post.languages && post.languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.languages.slice(0, 3).map((language, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
              >
                {language}
              </span>
            ))}
            {post.languages.length > 3 && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                +{post.languages.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Cool hover effect - subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}

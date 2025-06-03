"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sparkles, Zap, Star, TentTree } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute rounded-full top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-[1000ms]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl animate-pulse delay-[2000ms]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-[float_6s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Star className="w-2 h-2 text-white/20" />
          </div>
        ))}
      </div>

      {/* Signup card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="p-8 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-3xl">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl animate-bounce">
                <TentTree size={32} color="white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text">
                Let the Journey Begin
              </h1>
              <p className="text-white/70">
                Your adventure starts with the right guide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="font-medium text-white/90"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    className="h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="font-medium text-white/90"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    className="h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-white/90">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium text-white/90">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    className="h-12 pr-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Create Account
                  </div>
                )}
              </Button>

              {/* Terms */}
              <p className="text-sm text-center text-white/60">
                By signing up, you agree to our{" "}
                <a
                  href="#"
                  className="text-purple-300 underline hover:text-purple-200"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-300 underline hover:text-purple-200"
                >
                  Privacy Policy
                </a>
              </p>

              {/* Sign in link */}
              <div className="pt-4 text-center border-t border-white/10">
                <p className="text-white/70">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-semibold text-purple-300 hover:text-purple-200"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-white/60">
              Trusted by 10,000+ users worldwide
            </p>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
              <span className="ml-2 font-semibold text-white/80">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

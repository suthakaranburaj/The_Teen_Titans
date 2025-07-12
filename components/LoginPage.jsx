"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { loginUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function LoginPage({ onSwitch }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await loginUser(formData);
      if (error) {
        toast.error("Login Failed", {
          description: error.message || "Invalid credentials"
        });
        return;
      }
      toast.success("Login Successful", {
        description: "Redirecting to Main Page..."
      });

      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    } catch (err) {
      toast.error("Error", {
        description: "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-8 lg:p-24 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#3e7575]">Welcome Back</h1>
          <p className="mt-2 text-[#4a4a4a]">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#345f5f]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              className="bg-background border-black/40 focus:border-primary focus:ring-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#345f5f]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-background border-black/40 focus:border-primary focus:ring-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3e7575] hover:bg-[#2f5e5e] text-background font-medium cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#4a4a4a]">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            className="font-medium text-[#3e7575] hover:underline cursor-pointer"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { registerUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function RegisterPage({ onSwitch }) {
  const [avatarPreview, setAvatarPreview] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await registerUser(formData);
      if (error) {
        toast.error("Registration Failed", {
          description: error.message || "Invalid credentials"
        });
        return;
      }
      toast.success("Registration Successful", {
        description: "User created successfully"
      });
      console.log("Registration successful:", data);
      router.push("/v1/auth");
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
          <h1 className="text-3xl font-bold text-[#3e7575]">Create Account</h1>
          <p className="mt-2 text-[#4a4a4a]">Join our community</p>
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
              className=" bg-background border-black/40 focus:border-primary focus:ring-primary"
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

          {/* Avatar Upload */}
          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-[#345f5f]">
              Profile Picture
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="cursor-pointer bg-background border-black/40 text-[#345f5f] focus:border-primary focus:ring-primary"
                onChange={handleFileChange}
              />
              {avatarPreview && (
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-secondary-bg">
                  <Image
                    src={avatarPreview}
                    alt="Avatar preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3e7575] hover:bg-[#2f5e5e] text-background font-medium cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#4a4a4a]">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="font-medium text-[#3e7575] hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

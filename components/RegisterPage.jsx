"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { registerUser } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function RegisterPage({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });



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
          <h1 className="text-3xl font-bold text-blue-600">Create Account</h1>
          <p className="mt-2 text-[#4a4a4a]">Join our community</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-600">
              Name
            </Label>
            <Input
              id="text"
              type="text"
              required
              className=" text-black border-black/40 focus:border-primary focus:ring-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              className=" text-black border-black/40 focus:border-primary focus:ring-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-600">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="text-black border-black/40 focus:border-primary focus:ring-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>



          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-background font-medium cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#4a4a4a]">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="font-medium text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

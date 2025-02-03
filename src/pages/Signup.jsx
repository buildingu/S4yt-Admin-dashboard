import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup({ className, ...props }) {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    role: "business" //Will need to tweak this so its dynamic later on,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.businessName.trim()) {
      tempErrors.businessName = "Business name is required.";
    }
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }
    if (!passwordRegex.test(formData.password)) {
      tempErrors.password =
        "Password must be at least 8 characters, include one uppercase letter and one number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Sending data to backend:", formData);
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-[#242424]", className)} {...props}>
      <Card className="w-[400px] md:w-[500px] p-8 bg-[#1a1a1a] text-white shadow-lg rounded-lg mx-auto  border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm">{errors.businessName}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  required
                  className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-[#F9EB02] text-[#242424] rounded-lg py-2 font-semibold hover:bg-[#d4c102] transition">
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4 text-[#F9EB02]">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;

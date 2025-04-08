import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircularProgress, Snackbar, Alert } from "@mui/material"; 
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
    role: "business",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.businessName.trim()) {
      tempErrors.businessName = "Business name is required.";
    }
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); 
      try {
        const response = await axios.post("/api/register", formData);
        setSuccessMessage("Registration complete!"); 
        setFormData({
          businessName: "",
          email: "",
          password: "",
          role: "business",
        }); 
      } catch (error) {
        setErrors({ api: error.response?.data?.message || "Registration failed." });
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-[#242424]", className)} {...props}>
      <Card className="w-[400px] md:w-[500px] p-8 bg-[#1a1a1a] text-white shadow-lg rounded-lg mx-auto border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">Create an account to get started</CardDescription>
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>} 
              <Button
                type="submit"
                className="w-full bg-[#F9EB02] text-[#242424] rounded-lg py-2 font-semibold hover:bg-[#d4c102] transition"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"} 
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4 text-[#F9EB02]">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;

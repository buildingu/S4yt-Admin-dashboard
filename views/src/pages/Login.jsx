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
import { useState } from "react";

function Login({ className, ...props }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Sending data to backend:", {
        email: email,
        password: password,
      });
    }
  };

  const validate = () => {
    let emailInput = email;
    let passwordInput = password;
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!emailRegex.test(emailInput)) {
      tempErrors.email = "Enter a valid email.";
    }
    if (!passwordRegex.test(passwordInput)) {
      tempErrors.password =
        "Password must be at least 8 characters, include one uppercase letter and one number.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="text-white-400"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={handleEmailChange}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="text-white-400"
                  placeholder="************"
                  onChange={handlePasswordChange}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{"   "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

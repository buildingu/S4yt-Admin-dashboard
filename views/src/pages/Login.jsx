import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login({ className, ...props }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    if (user && user._id) {
      navigate(`/business-db/${user._id}`);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post('/api/login', data);
        if (response.status === 200) {
          login(response.data.userData, response.data.token);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ api: error.response.data.message });
        } else {
          setErrors({ api: "An unexpected error occurred. Please try again." });
        }
      }
    }
  };

  const validate = () => {
    let emailInput = email;
    let passwordInput = password;
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
      tempErrors.email = "Enter a valid email.";
    }

    if (!passwordInput) {
      tempErrors.password = "Password is required.";
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
          <form onSubmit={handleSubmit}>
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>*/}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="text-white-400"
                  placeholder="************"
                  onChange={handlePasswordChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {errors.api && <p className="text-red-500 text-sm mt-4">{errors.api}</p>} {/* Show API error */}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
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

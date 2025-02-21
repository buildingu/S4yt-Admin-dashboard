import React from "react";
import { LoginForm } from "@/components/login-form";

function Login() {
  return (
    <div>
      <h1>Login Here</h1>
      <br />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <LoginForm className="dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default Login;

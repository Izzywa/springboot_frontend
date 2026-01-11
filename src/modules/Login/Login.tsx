import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, auth } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      login(email, password)
      .then(() => {
        if (auth) {
          navigate("/dashboard");
        }
      });
    }
  }
  return (
    <div>
      Login Page
      <form id="authenticationForm" className="flex flex-col gap-3 w-80">
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <Link to="/register" className="text-white mt-4 block">
        Don't have an account? Register here.
      </Link>
    </div>
  );
}

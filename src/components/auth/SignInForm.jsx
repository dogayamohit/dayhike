import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Static credentials
  const STATIC_EMAIL = "admin@gmail.com";
  const STATIC_PASSWORD = "123456";

useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    navigate("/");
  }
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login successful");

      // Small delay so user sees toast
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-xl font-semibold text-gray-800">
            Sign In
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and password to continue
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label>
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon className="size-5" />
                ) : (
                  <EyeCloseIcon className="size-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="sm" variant="signIn">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

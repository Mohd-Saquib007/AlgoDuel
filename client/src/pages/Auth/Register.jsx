import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { register } from "../../api/auth";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await register({
        username,
        email,
        password,
      });

      setSuccess("Account created successfully!");
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";
      setError(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-white">
        <div className="flex items-center gap-3">
          <Code2 size={36} className="text-[#A3FF12]" />

          <h1 className="font-['Sora'] text-4xl font-bold">
            Algo
            <span className="text-[#A3FF12]">Duel</span>
          </h1>
        </div>

        <h2 className="mt-12 text-5xl font-bold leading-tight">
          Start Your
          <br />
          Journey.
        </h2>

        <p className="mt-8 max-w-md text-lg leading-8 text-gray-400">
          Join thousands of developers competing in coding battles, solving
          problems, and improving every day.
        </p>
      </div>

      {/* Right Side */}

      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#252526] p-10">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>

          <p className="mt-2 text-gray-400">Create your AlgoDuel account.</p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-lg bg-green-500/10 border border-[#A3FF12]/20 p-3 text-sm text-[#A3FF12]">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <Input
              label="Username*"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              label="Email*"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password*"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              label="Confirm Password*"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-[#A3FF12] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

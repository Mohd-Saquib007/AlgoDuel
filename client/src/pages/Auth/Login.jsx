import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary
    console.log("Login Data:", formData);

    // Later we'll replace this with:
    // await loginUser(formData);
  };

  return (
    <div className="min-h-screen flex bg-[#1E1E1E]">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">
        <div className="flex items-center gap-3">
          <Code2
            size={36}
            className="text-[#A3FF12]"
          />

          <h1 className="font-['Sora'] text-4xl font-bold text-white">
            Algo
            <span className="text-[#A3FF12]">
              Duel
            </span>
          </h1>
        </div>

        <h2 className="mt-12 text-5xl font-bold leading-tight text-white">
          Welcome
          <br />
          Back.
        </h2>

        <p className="mt-8 max-w-md text-lg leading-8 text-gray-400">
          Continue your coding journey, battle developers,
          solve exciting problems, and climb the leaderboard.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center lg:w-1/2 px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#252526] p-10">
          <h2 className="text-3xl font-bold text-white">
            Login
          </h2>

          <p className="mt-2 text-gray-400">
            Enter your credentials to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#A3FF12] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#A3FF12] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
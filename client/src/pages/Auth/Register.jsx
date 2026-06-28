import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function Register() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

        <div className="flex items-center gap-3">

          <Code2
            size={36}
            className="text-[#A3FF12]"
          />

          <h1 className="font-['Sora'] text-4xl font-bold">
            Algo
            <span className="text-[#A3FF12]">
              Duel
            </span>
          </h1>

        </div>

        <h2 className="mt-12 text-5xl font-bold leading-tight">
          Start Your
          <br />
          Journey.
        </h2>

        <p className="mt-8 max-w-md text-lg leading-8 text-gray-400">
          Join thousands of developers competing in coding battles,
          solving problems, and improving every day.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex w-full items-center justify-center lg:w-1/2">

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#252526] p-10">

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-gray-400">
            Create your AlgoDuel account.
          </p>

          <div className="mt-8 space-y-5">

            <Input
              label="Full Name"
              placeholder="Enter your full name"
            />

            <Input
              label="Username"
              placeholder="Choose a username"
            />

            <Input
              label="Email"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <Button className="w-full">
              Create Account
            </Button>

          </div>

          <p className="mt-8 text-center text-gray-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#A3FF12]"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
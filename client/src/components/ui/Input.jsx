import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">
        {label}
      </label>

      <div className="relative">

        <input
          name={name}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#252526]
            px-4
            py-3
            pr-12
            text-white
            outline-none
            transition
            focus:border-[#A3FF12]
            focus:ring-2
            focus:ring-[#A3FF12]/20
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>
    </div>
  );
}

export default Input;
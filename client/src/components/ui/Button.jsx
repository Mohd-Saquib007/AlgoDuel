function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseStyle =
    "px-5 py-2 rounded-xl font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[#A3FF12] text-black hover:-translate-y-1 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(163,255,18,0.25)]",

    secondary:
      "border border-[#3A3A3A] text-white hover:border-[#A3FF12] hover:text-[#A3FF12]",

    ghost:
      "text-white hover:text-[#A3FF12]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
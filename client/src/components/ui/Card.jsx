function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-[#252526]/80
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(0,0,0,0.25)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
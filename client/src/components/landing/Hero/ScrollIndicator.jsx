import { ChevronDown } from "lucide-react";

function ScrollIndicator() {
  const handleScroll = () => {
    const nextSection = document.getElementById("features");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="mt-14 flex items-center gap-2 text-gray-500 transition hover:text-[#A3FF12]"
    >
      Scroll Down

      <ChevronDown
        size={18}
        className="animate-bounce"
      />
    </button>
  );
}

export default ScrollIndicator;
import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileDropdown() {

    const [open, setOpen] = useState(false);

    return (

        <div className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-[#252526]
                px-4
                py-2
                hover:border-[#A3FF12]/50
                transition
                "
            >

                <User size={20}/>

                <span>
                    Saquib
                </span>

                <ChevronDown
                    size={18}
                />

            </button>

            {open && (

                <div
                    className="
                    absolute
                    right-0
                    mt-3
                    w-52
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#252526]
                    shadow-xl
                    overflow-hidden
                    "
                >

                    <Link
                        to="/dashboard"
                        className="block px-5 py-3 hover:bg-white/5"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className="block px-5 py-3 hover:bg-white/5"
                    >
                        Profile
                    </Link>

                    <Link
                        to="/settings"
                        className="block px-5 py-3 hover:bg-white/5"
                    >
                        Settings
                    </Link>

                    <button
                        className="
                        w-full
                        text-left
                        px-5
                        py-3
                        hover:bg-red-500/10
                        text-red-400
                        "
                    >
                        Logout
                    </button>

                </div>

            )}

        </div>

    );

}

export default ProfileDropdown;
import { LogOut, User2, ShieldAlert, Menu, X } from "lucide-react"; 
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { useState } from "react"; 

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu ki state

    const LogOutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {}, {
                withCredentials: true,
            });
            if (response && response.data && response.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success("Logged out successfully.");
            } else {
                console.error("Error logging out:", response.data);
            }
        } catch (error) {
            console.error("Axios error:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
            toast.error("Error logging out. Please try again.");
        }
    };

    return (
        <nav className="bg-gradient-to-r from-[#0d0e15]/90 to-[#07080d]/90 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 transition-all duration-300">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6 md:px-8">

                {/* Logo section */}
                <div onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="flex items-center cursor-pointer group">
                    <h1 className="text-xl font-black tracking-wider text-white uppercase flex items-center gap-1">
                        Talent
                        <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md tracking-widest relative inline-block group-hover:bg-violet-500/20 transition-colors ml-1">
                            Hub
                            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
                            </span>
                        </span>
                    </h1>
                </div>

                {/* Desktop Navigation Links */}
                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex font-semibold items-center gap-1 text-slate-400 text-sm">
                        {user && user.role === "Recruiter" ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200">
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/home" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95">
                                        Explore
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="px-4 py-2 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authentication / Profile section */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <div className="hidden sm:flex items-center gap-3">
                                <Link to="/login">
                                    <Button
                                        variant="ghost"
                                        className="relative group text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 px-4 h-9 rounded-xl hover:bg-white/5 cursor-pointer active:scale-98"
                                    >
                                        Sign In
                                    </Button>
                                </Link>

                                <Link to="/register">
                                    <Button
                                        className="bg-gradient-to-r from-violet-700 to-indigo-800 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider px-5 h-9 rounded-xl shadow-lg shadow-violet-600/10 active:scale-95 transition-all duration-200 cursor-pointer border-0"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-9 w-9 border border-white/20 hover:border-violet-500/50 transition-all shadow-md p-0.5 bg-white/5">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" className="rounded-full object-cover" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-72 bg-[#0d0e15]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/10 p-4 mt-2 text-white" align="end">
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                                        <Avatar className="h-10 w-10 border border-white/10 bg-white/5 shadow-sm p-0.5">
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" className="rounded-full object-cover" />
                                        </Avatar>
                                        <div className="flex flex-col justify-center min-h-[40px] overflow-hidden">
                                            <h3 className="font-bold text-slate-100 text-sm truncate">
                                                {user?.fullname || user?.profile?.fullname || "Operator"}
                                            </h3>
                                            <span className="text-[10px] text-violet-400 font-semibold tracking-wider flex items-center gap-1 mt-0.5">
                                                <ShieldAlert size={10} /> {user?.role || "Member"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 mt-3">
                                        {user && user.role === "Student" && (
                                            <Button asChild variant="ghost" className="w-full justify-start gap-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl h-10 px-2.5 transition-all">
                                                <Link to="/profile">
                                                    <User2 className="h-4 w-4 text-violet-400" />
                                                    <span className="text-xs font-semibold tracking-wide">View Profile</span>
                                                </Link>
                                            </Button>
                                        )}

                                        <Button onClick={LogOutHandler} variant="ghost" className="w-full justify-start gap-2.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl h-10 px-2.5 transition-all cursor-pointer">
                                            <LogOut className="h-4 w-4 text-rose-500" />
                                            <span className="text-xs font-semibold tracking-wide">Logout</span>
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-slate-300 hover:text-white p-1.5 hover:bg-white/5 rounded-xl transition-all focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/5 bg-[#0d0e15]/95 backdrop-blur-xl ${isMenuOpen ? "max-h-[350px] opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <ul className="flex flex-col px-6 gap-2 text-slate-300 font-medium text-sm">
                    {user && user.role === "Recruiter" ? (
                        <>
                            <li>
                                <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-xl transition-all hover:text-white">
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-xl transition-all hover:text-white">
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/home" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-xl transition-all hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-xl transition-all hover:text-white">
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 hover:bg-white/5 rounded-xl transition-all hover:text-white">
                                    Jobs
                                </Link>
                            </li>
                        </>
                    )}

                    {!user && (
                        <div className="flex flex-col sm:hidden gap-2 pt-3 border-t border-white/5 mt-2">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full text-slate-300 hover:text-white rounded-xl h-10 hover:bg-white/5 font-semibold text-xs uppercase tracking-wider">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-violet-700 to-indigo-800 text-white rounded-xl h-10 font-semibold text-xs uppercase tracking-wider">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
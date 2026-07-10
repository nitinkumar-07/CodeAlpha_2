import { FaSearch, FaBriefcase, FaUserCheck, FaBuilding } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchjobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    };

    return (
        <section className="relative min-h-[60vh] sm:min-h-[85vh] flex items-center justify-center bg-[#0a0b10] text-white px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-violet-600/20 to-transparent rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-indigo-600/15 to-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left Content Column */}
                <div className="lg:col-span-7 text-left flex flex-col items-start w-full">

                    <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-violet-400 border border-white/10 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-lg tracking-wider uppercase">
                        <FaBriefcase className="text-violet-400 animate-pulse" />
                        Next-Gen Recruitment Platform
                    </span>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Discover Roles <br className="hidden sm:block" />
                        That Match Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">True Potential</span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mb-6 sm:mb-8 font-medium">
                        Skip the generic application loops. Our intelligent mapping instantly bridges the gap between top-tier technical talents and elite global organizations.
                    </p>

                    <div className="flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl pl-3 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 w-full max-w-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all duration-300 group">
                        <FaSearch className="text-slate-500 mr-2 sm:mr-3 text-sm sm:text-lg group-focus-within:text-violet-400 transition-colors shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchjobHandler()}
                            placeholder="Search titles, skills, or tech stacks..."
                            className="w-full bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm md:text-base outline-none pr-2 font-normal min-w-0 text-ellipsis"
                        />
                        <button
                            onClick={searchjobHandler}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 sm:px-6 h-9 sm:h-12 rounded-xl flex justify-center items-center gap-1 sm:gap-2 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-violet-600/20 active:scale-98 shrink-0"
                        >
                            <span className="hidden xs:inline">Find</span> Jobs
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 relative">
                    <div className="p-6 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400"><FaBuilding size={24} /></div>
                            <div>
                                <h4 className="font-bold text-white">Top Tech Organizations</h4>
                                <p className="text-xs text-slate-400">Direct hiring pipelines with verified packages.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl shadow-xl ml-8 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><FaUserCheck size={24} /></div>
                            <div>
                                <h4 className="font-bold text-white">Real-time Application Status</h4>
                                <p className="text-xs text-slate-400">Track interviews & resume screening live.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Header;
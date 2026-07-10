import { Badge } from "../ui/badge.jsx";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className="group bg-white/[0.02] backdrop-blur-md border border-white/10 text-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-violet-600/10 hover:border-violet-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[350px] relative overflow-hidden"
        >
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-600/10 rounded-full blur-xl group-hover:bg-violet-600/20 transition-all duration-300" />

            <div>
                {/* Upper Section */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                            {job?.company?.name || "Global Tech Org"}
                        </h2>
                        <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                            <FaMapMarkerAlt className="text-violet-400 text-xs" />
                            <span className="text-xs font-medium tracking-wide">{job?.location || "Remote"}</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-violet-500/30 transition-colors">
                        <FaBriefcase className="text-violet-400 text-sm" />
                    </div>
                </div>

                {/* Job Title */}
                <div className="mt-5">
                    <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors">
                        {job?.title || "Software Architect"}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-2 min-h-[2.25rem]">
                        {job?.description || "No core description structure mapped for this listing."}
                    </p>
                </div>

                {/* Badges Layout */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                    <Badge className="bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded-lg px-2.5 py-0.5 text-[11px] font-medium">
                        {job?.position || 1} Openings
                    </Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg px-2.5 py-0.5 text-[11px] font-medium flex items-center gap-0.5">
                        <MdCurrencyRupee className="text-xs" />
                        {job?.salary || "N/A"} LPA
                    </Badge>
                    <Badge className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg px-2.5 py-0.5 text-[11px] font-medium">
                        {job?.jobType || "Full Time"}
                    </Badge>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 w-full">
                <button className="w-full bg-[#6A38C2] hover:bg-gradient-to-r hover:from-violet-500 hover:to-indigo-600 border border-white/10 hover:border-transparent text-slate-200 hover:text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm">
                    View Technical Details
                </button>
            </div>
        </div>
    );
};

export default JobCards;
import { Bookmark, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job1 = ({ job }) => {
    const navigate = useNavigate();

    const createdDate = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="group bg-white/[0.01] backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-violet-600/10 hover:border-violet-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
        >
            <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3.5">
                        <Avatar className="h-12 w-12 border border-white/10 bg-white/5 rounded-xl p-1">
                            <AvatarImage src={job?.company?.logo} className="object-contain" />
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-base text-slate-100 tracking-tight">
                                {job?.company?.name || "Corporate Hub"}
                            </h2>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Calendar size={12} className="text-slate-600" />
                                {createdDate(job?.createdAt) === 0 ? "Posted Today" : `${createdDate(job?.createdAt)}d ago`}
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl h-9 w-9 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Bookmark size={15} />
                    </Button>
                </div>

                <h1 className="mt-5 text-xl font-bold text-white group-hover:text-violet-400 transition-colors flex items-center gap-1.5">
                    {job?.title}
                    <ArrowUpRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-violet-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h1>

                <p className="text-slate-400 text-xs leading-relaxed mt-2.5 line-clamp-3">
                    {job?.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                    <Badge className="bg-white/5 text-slate-300 border border-white/5 rounded-md text-[10px] py-0.5 font-medium">
                        💼 {job?.position} Positions
                    </Badge>
                    <Badge className="bg-white/5 text-violet-300 border border-white/5 rounded-md text-[10px] py-0.5 font-medium">
                        💰 ₹{job?.salary} LPA
                    </Badge>
                    <Badge className="bg-white/5 text-slate-300 border border-white/5 rounded-md text-[10px] py-0.5 font-medium flex items-center gap-0.5">
                        <MapPin size={10} className="text-violet-400" /> {job?.location}
                    </Badge>
                </div>
            </div>

            <div className="mt-auto border-t border-white/5 bg-white/[0.01] p-4 grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    className="rounded-xl h-10 border-white/10 bg-transparent text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }}
                >
                    Overview
                </Button>

                <Button
                    className="rounded-xl h-10 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }}
                >
                    Apply Now
                </Button>
            </div>
        </div>
    );
};

export default Job1;
import { Contact, Mail, Pen, FileText, Briefcase, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    
    const [open, setOpen] = useState(false);
    const user = useSelector((store) => store.auth.user);
    const skillsArray = Array.isArray(user?.profile?.skills) ? user.profile.skills : [];

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-100 pb-12 selection:bg-indigo-500/30">
            <Navbar />

            {/* Main Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
                
                {/* Profile Card */}
                <div className="relative overflow-hidden bg-[#131926]/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:shadow-indigo-500/5 hover:border-slate-700">

                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
                    
                    {/* Upper Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 mt-2">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full text-center sm:text-left">

                            {/* Avatar */}
                            <Avatar className="h-24 w-24 border-2 border-[#131926] ring-4 ring-emerald-500/30 shadow-xl transition-transform duration-300 hover:rotate-3">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.fullname} />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold">
                                    {user?.fullname ? user.fullname.split(" ").map(n => n[0]).join("") : "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="space-y-2 mt-2 sm:mt-0">
                                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                                    <h1 className="text-2xl font-bold text-white tracking-tight">{user?.fullname || "Anonymous User"}</h1>
                                    <span className="bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-500/20 flex items-center gap-1.5 backdrop-blur-xs">
                                        <Sparkles className="h-3 w-3 text-indigo-400" /> Candidate
                                    </span>
                                </div>
                                <p className="text-slate-400 max-w-xl text-sm leading-relaxed font-normal">
                                    {user?.profile?.bio || "No bio added yet. Add a brief description about yourself."}
                                </p>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Button 
                            onClick={() => setOpen(true)} 
                            size="icon"
                            variant="outline" 
                            className="rounded-xl border-slate-800 bg-[#161D2F] text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 shrink-0 self-center sm:self-auto shadow-md transition-all cursor-pointer"
                        >
                            <Pen className="h-4 w-4" />
                        </Button>
                    </div>

                    <hr className="my-6 border-slate-800/60" />

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#161D2F]/40 rounded-xl border border-slate-800/80 hover:bg-[#161D2F]/70 hover:border-slate-700 transition-all group">
                            <Mail className="h-4 w-4 text-indigo-400 shrink-0 group-hover:scale-105 transition-transform" />
                            <a href={`mailto:${user?.email}`} className="text-slate-300 truncate hover:text-indigo-400 font-medium transition-colors">
                                {user?.email || "No email provided"}
                            </a>
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 bg-[#161D2F]/40 rounded-xl border border-slate-800/80 hover:bg-[#161D2F]/70 hover:border-slate-700 transition-all group">
                            <Contact className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform" />
                            <a href={`tel:${user?.phoneNumber}`} className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">
                                {user?.phoneNumber || "No phone number"}
                            </a>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8 space-y-3">
                        <h2 className="text-xs font-bold text-slate-500 tracking-wider uppercase">Skills & Expertise</h2>
                        <div className="flex flex-wrap items-center gap-2">
                            {skillsArray.length > 0 ? (
                                skillsArray.map((item, index) => (
                                    <Badge 
                                        key={`${item}-${index}`} 
                                        className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 px-3 py-1 text-xs font-medium rounded-lg transition-all"
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-slate-500 text-sm italic">No skills added yet.</span>
                            )}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="mt-8 pt-6 border-t border-slate-800/60">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">Resume & Documents</label>
                            <div>
                                {isResume && user?.profile?.resume ? (
                                    <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-slate-800 rounded-xl hover:border-blue-500/40 transition-all max-w-md group">
                                        <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400">
                                            <FileText className="h-4 w-4 shrink-0" />
                                        </div>
                                        <a
                                            target="_blank"
                                            href={user?.profile?.resume}
                                            rel="noopener noreferrer"
                                            download="resume.pdf"
                                            className="text-sm font-semibold text-blue-400 truncate group-hover:text-blue-300 group-hover:underline max-w-[220px] sm:max-w-sm transition-colors"
                                        >
                                            {user?.profile?.resumeOriginalname || "View/Download Resume"}
                                        </a>
                                    </div>
                                ) : (
                                    <span className="text-slate-500 text-sm italic">No resume uploaded.</span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Applied Jobs Card */}
                <div className="relative overflow-hidden mt-10 bg-[#131926]/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-emerald-500" />
                    <div className="flex items-center gap-2.5 mb-6">
                        <Briefcase className="h-5 w-5 text-emerald-400" />
                        <h2 className="text-xl font-bold text-white tracking-tight">Applied Jobs</h2>
                    </div>
                    <AppliedJob />
                </div>

            </div>

            <EditProfileModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
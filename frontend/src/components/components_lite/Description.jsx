import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Calendar, MapPin, Briefcase, DollarSign, Award, Users, ShieldAlert, ArrowLeft, Code } from "lucide-react";

const Description = () => {
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth || store.user || {});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => user?._id && application.applicant === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    useEffect(() => {
        if (singleJob?.applications && user?._id) {
            const hasApplied = singleJob.applications.some(
                (application) => application.applicant === user.id || application.applicant === user._id
            );
            setIsApplied(hasApplied);
        } else {
            setIsApplied(false);
        }
    }, [singleJob, user?._id]);

    const applyJobHandler = async () => {
        if (!user || !user._id) {
            toast.error("Please login to apply for this job");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(
                `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id }],
                };
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message || "Applied successfully!");
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            if (!jobId) return;
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get/${jobId}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    const jobData = res.data.jobs || res.data.job;
                    dispatch(setSingleJob(jobData));
                } else {
                    setError("Failed to fetch job details.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                setError(error.response?.data?.message || error.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c0a09]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
                <p className="mt-4 text-neutral-400 font-medium animate-pulse">Loading Job Details...</p>
            </div>
        );
    }

    if (error || !singleJob) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0c0a09] px-4">
                <div className="max-w-md w-full text-center bg-[#131118]/60 border border-red-900/30 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
                    <div className="w-12 h-12 bg-red-950/40 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/30">
                        <ShieldAlert size={24} />
                    </div>
                    <p className="text-red-400 font-semibold text-lg mb-2">{error || "Job Not Found!"}</p>
                    <p className="text-neutral-500 text-xs mb-6">The listing might have been removed or is temporarily unavailable.</p>
                    <Button onClick={() => navigate(-1)} className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl w-full py-5 text-sm font-semibold transition shadow-md">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0a09] text-neutral-100 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Back Navigation Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white mb-6 transition-colors group bg-neutral-900/40 border border-neutral-800/60 px-3 py-1.5 rounded-xl self-start"
                >
                    <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to listings
                </button>

                <div className="bg-[#131118]/80 backdrop-blur-md rounded-3xl shadow-2xl border border-neutral-800/80 overflow-hidden">
                    
                    <div className="bg-gradient-to-r from-[#17141f] via-[#1a1724] to-[#131118] p-8 border-b border-neutral-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <span className="text-violet-400 text-xs font-bold uppercase tracking-wider bg-violet-950/40 border border-violet-900/30 px-3 py-1 rounded-md">
                                {singleJob?.company?.name || "Corporate Hub"}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-3">{singleJob.title}</h1>
                            
                            <div className="flex flex-wrap gap-2 mt-5">
                                <Badge className="bg-neutral-800/80 text-neutral-300 border border-neutral-700/50 hover:bg-neutral-800/80 rounded-lg text-[10px] py-1 px-3 font-medium shadow-none">
                                    💼 {singleJob.position} Positions
                                </Badge>
                                <Badge className="bg-violet-950/40 text-violet-300 border border-violet-900/40 hover:bg-violet-950/40 rounded-lg text-[10px] py-1 px-3 font-medium shadow-none">
                                    💰 ₹{singleJob.salary} LPA
                                </Badge>
                                <Badge className="bg-neutral-800/80 text-neutral-300 border border-neutral-700/50 hover:bg-neutral-800/80 rounded-lg text-[10px] py-1 px-3 font-medium shadow-none">
                                    📍 {singleJob.location}
                                </Badge>
                                <Badge className="bg-neutral-800/80 text-neutral-300 border border-neutral-700/50 hover:bg-neutral-800/80 rounded-lg text-[10px] py-1 px-3 font-medium shadow-none">
                                    ⏱️ {singleJob.jobType}
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-2xl px-8 py-6 text-sm font-bold tracking-wide transition-all duration-300 shadow-lg w-full md:w-auto uppercase ${
                                isApplied
                                    ? "bg-gray-400 text-black cursor-not-allowed"
                                   : "bg-white text-[#6B3AC2] hover:bg-gray-100 font-semibold shadow-lg"
                            }`}
                        >
                            {isApplied ? "Already Applied" : "Apply Now"}
                        </Button>
                    </div>

                    {/* Content Section Container */}
                    <div className="p-8">
                        <h2 className="text-lg font-bold text-white mb-3 tracking-tight">Job Description</h2>
                        <p className="text-neutral-400 leading-relaxed text-sm border-b border-neutral-800/60 pb-8 font-medium">
                            {singleJob.description}
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            
                            <div className="bg-[#17151e]/50 border border-violet-900/20 rounded-2xl p-5 sm:col-span-2 lg:col-span-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code size={16} className="text-violet-400" />
                                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Required Skills & Expertise</p>
                                </div>
                                <div className="text-sm font-medium text-violet-300 leading-relaxed bg-violet-950/20 p-4 rounded-xl border border-violet-900/40">
                                    {singleJob.requirements}
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><Briefcase size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Role</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">{singleJob.position} Openings</h3>
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><MapPin size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Location</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">{singleJob.location}</h3>
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><DollarSign size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Salary Package</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">₹{singleJob.salary} LPA</h3>
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><Award size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Experience Level</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">{singleJob.experienceLevel} Years</h3>
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><Users size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Total Applicants</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">{singleJob?.applications?.length || 0} Applied</h3>
                                </div>
                            </div>

                            <div className="bg-[#17151e]/60 border border-neutral-800/50 rounded-2xl p-5 flex items-start gap-4">
                                <div className="p-3 bg-neutral-800/80 text-violet-400 rounded-xl border border-neutral-700/50"><Calendar size={18} /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Posted Date</p>
                                    <h3 className="font-semibold text-sm text-neutral-200 mt-0.5">{singleJob.createdAt?.split("T")[0] || "N/A"}</h3>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Description;
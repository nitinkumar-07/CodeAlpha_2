import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job1 from "./Job1";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
    const { allJobs = [], searchedQuery = "" } = useSelector((state) => state.job || state.jobs || {});
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (
            !searchedQuery ||
            (Array.isArray(searchedQuery) && searchedQuery?.length === 0) ||
            (typeof searchedQuery === "string" && searchedQuery.trim() === "")
        ) {
            setFilterJobs(allJobs);
            return;
        }

        const queryArray = Array.isArray(searchedQuery) ? searchedQuery : [searchedQuery];

        const filteredJobs = allJobs.filter((job) => {
            return queryArray.some((query) => {
                const q = query.toLowerCase();
                return (
                    job.title?.toLowerCase().includes(q) ||
                    job.description?.toLowerCase().includes(q) ||
                    job.location?.toLowerCase().includes(q) ||
                    String(job.salary).toLowerCase().includes(q)
                );
            });
        });

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-[#0a0b10] min-h-screen text-white relative overflow-hidden pb-12">
            {/* Ambient Background Glow Layer */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

            <Navbar />

            <div className="max-w-7xl mx-auto mt-8 px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Left Panel */}
                    <div className="w-full md:w-1/4 md:min-w-[260px] bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-4 md:h-[82vh] md:overflow-y-auto custom-scrollbar shadow-xl">
                        <FilterCard />
                    </div>

                    {/* Right Panel */}
                    <div className="flex-1">
                        {filterJobs?.length <= 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
                                <p className="text-slate-400 font-medium text-base">No operations currently match your tracking matrix.</p>
                            </div>
                        ) : (
                            <div className="h-auto md:h-[82vh] md:overflow-y-auto pr-1 pb-6 custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {filterJobs?.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            key={job._id}
                                            className="h-full"
                                        >
                                            <Job1 job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Jobs;
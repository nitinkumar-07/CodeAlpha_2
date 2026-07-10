import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []);

  return (
    <div className="bg-[#0a0b10] py-16 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Opportunities</span>
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-md">
             Verified live roles across global systems updated minutes ago.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-5">
          {allJobs.length === 0 ? (
            <span className="text-slate-500 font-medium col-span-full text-center py-16 bg-white/[0.01] rounded-2xl border border-white/5">
              No live job listings currently match this configuration.
            </span>
          ) : (
            allJobs
              .filter(job => job?._id)
              .slice(0, 6)
              .map((job) => (
                <div key={job?._id} className="transition-all duration-300 hover:-translate-y-1.5">
                    <JobCards job={job} />
                </div>
              ))
          )}
        </div>
        
      </div>
    </div>
  );
};

export default LatestJobs;
import Job1 from "./Job1";
import Navbar from "./Navbar";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    
    <div className="min-h-screen bg-[#0c0a09] text-neutral-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="border-b border-neutral-800 pb-5 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Search Results
            </h1>
            <p className="text-sm text-neutral-400 mt-1.5 font-medium">
              Discover your next career step below.
            </p>
          </div>
          
          <div className="self-start sm:self-center bg-violet-600/20 text-violet-400 border border-violet-500/30 text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full shadow-sm">
            {allJobs?.length || 0} {allJobs?.length === 1 ? "Job Available" : "Jobs Available"}
          </div>
        </div>

        {/* Jobs Grid Layout */}
        {allJobs && allJobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs.map((job) => (
              <div 
                key={job._id} 
                className="transition-all duration-300 rounded-2xl"
              >
                <Job1 job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#131118]/40 border border-neutral-800 rounded-2xl shadow-sm max-w-md mx-auto mt-10 px-6">
            <div className="h-12 w-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-800">
              <svg className="h-6 w-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-neutral-200">No jobs found</h3>
            <p className="text-xs text-neutral-500 mt-1">We couldn't find any positions matching your current search parameters.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Browse;
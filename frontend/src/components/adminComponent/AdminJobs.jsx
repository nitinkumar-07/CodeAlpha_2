import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
          <Input
            className="w-full sm:w-fit bg-gray-900 border-gray-800 text-gray-100 placeholder-gray-500 focus-visible:ring-gray-700"
            placeholder="Filter by Name & Jobs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            className="w-full sm:w-auto bg-violet-700 text-white hover:bg-violet-600 font-semibold" 
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post new Job
          </Button>
        </div>
        <div className="overflow-x-auto border border-gray-800 rounded-md bg-gray-900">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
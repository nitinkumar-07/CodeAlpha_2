import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const JobSetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { allAdminJobs = [] } = useSelector((store) => store.job || {});

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      experienceLevel: Number(input.experience),
    };

    try {
      setLoading(true);
      const response = await axios.put(`${JOB_API_ENDPOINT}/update/${params.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message || "Job updated successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const singleJob = allAdminJobs.find((job) => job._id === params.id);
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || "",
      });
    }
  }, [params.id, allAdminJobs]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto my-10 px-4 md:px-0">
        <form onSubmit={submitHandler} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 border-gray-800 bg-gray-950 text-gray-400 font-semibold hover:bg-gray-900 hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-100">Job Edit</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" />
            </div>
            <div>
              <Label className="text-gray-400">Salary</Label>
              <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">Job Type</Label>
              <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">Experience Level</Label>
              <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
            <div>
              <Label className="text-gray-400">No. of Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="bg-gray-950 border-gray-800 text-gray-100 my-1 focus-visible:ring-gray-700" required />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-6 bg-blue-700 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6 bg-blue-600 text-white hover:bg-blue-700 font-semibold">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetup;
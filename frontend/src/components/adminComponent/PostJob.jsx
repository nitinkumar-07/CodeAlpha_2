import { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company || {});
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      return toast.error("Please select a company before posting.");
    }

    const payload = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      experienceLevel: Number(input.experience),
    };

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="flex items-center justify-center w-full my-10 px-4 md:px-0">
        <form
          onSubmit={submitHandler}
          className="p-6 sm:p-8 w-full max-w-4xl border border-gray-800 bg-gray-900 shadow-md rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-100">Post New Job</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-gray-400">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter job title"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Enter job description"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter job location"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter job salary"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter job position"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter job requirements"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-gray-400">Experience Level</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Enter job experience"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <Label className="text-gray-400">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Enter job type"
                className="my-1 bg-gray-950 border-gray-800 text-gray-100 focus-visible:ring-gray-700"
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="flex flex-col justify-end">
              <Label className="mb-2 text-gray-400">Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full bg-gray-950 border-gray-800 text-gray-100 focus:ring-gray-700">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-950 border-gray-800 text-gray-100">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id} className="hover:bg-gray-900 focus:bg-gray-400 text-gray-100">
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm font-medium text-red-400">No companies registered.</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            {loading ? (
              <Button disabled className="w-full px-4 py-2 text-sm text-white bg-blue-700 rounded-md">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 font-semibold"
              >
                Post Job
              </Button>
            )}
          </div>
          {companies.length === 0 && (
            <p className="text-sm font-bold my-4 text-center text-red-500">
              *Please register a company to post jobs.*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
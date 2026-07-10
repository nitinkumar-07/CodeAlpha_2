import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  const jobState = useSelector((store) => store.job);
  const allAdminJobs = jobState?.allAdminJobs || [];
  const searchJobByText = jobState?.searchJobByText || "";

  useEffect(() => {
    if (Array.isArray(allAdminJobs)) {
      const filtered = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        const jobTitle = job?.title?.toLowerCase() || "";
        const companyName = job?.company && typeof job.company === "object" && job.company.name
          ? job.company.name.toLowerCase()
          : "";

        const searchText = searchJobByText.toLowerCase();
        return jobTitle.includes(searchText) || companyName.includes(searchText);
      });
      setFilterJobs(filtered);
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-gray-900 text-gray-100">
      <Table>
        <TableCaption className="text-gray-500">Your recent Posted Jobs</TableCaption>
        <TableHeader className="bg-gray-950">
          <TableRow className="border-b border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400 font-semibold">Company Name</TableHead>
            <TableHead className="text-gray-400 font-semibold">Role</TableHead>
            <TableHead className="text-gray-400 font-semibold">Date</TableHead>
            <TableHead className="text-right text-gray-400 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow className="border-b border-gray-800 hover:bg-transparent">
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                No Job Added or Found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job?._id} className="border-b border-gray-800 hover:bg-gray-850">
                <TableCell className="text-gray-200">
                  {job?.company && typeof job.company === "object" ? job.company.name : "N/A"}
                </TableCell>
                <TableCell className="text-gray-300">{job?.title || "N/A"}</TableCell>
                <TableCell className="text-gray-400">{job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-200 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-1 bg-gray-950 border-gray-800 text-gray-200" align="end">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job?._id}`)}
                        className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-900 p-2 text-sm rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                        <span>Edit</span>
                      </div>
                      <hr className="border-gray-850 my-1" />
                      <div
                        onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}
                        className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-900 p-2 text-sm rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4 text-green-400" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
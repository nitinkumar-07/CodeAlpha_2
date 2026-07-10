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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
                { status }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100">
            <Table>
                <TableCaption className="text-gray-500">A list of your recent applied users</TableCaption>
                <TableHeader className="bg-gray-950">
                    <TableRow className="border-b border-gray-800 hover:bg-transparent">
                        <TableHead className="text-gray-400 font-semibold">FullName</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Email</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Contact</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Resume / Portfolio</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Date</TableHead>
                        <TableHead className="text-right text-gray-400 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!applicants || applicants.length === 0 ? (
                        <TableRow className="border-b border-gray-800 hover:bg-transparent">
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                No applicants found for this job.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants.map((item) => (
                            <TableRow key={item._id} className="border-b border-gray-800 hover:bg-gray-850">
                                <TableCell className="text-gray-200">{item?.applicant?.fullname || "N/A"}</TableCell>
                                <TableCell className="text-gray-300">{item?.applicant?.email || "N/A"}</TableCell>
                                <TableCell className="text-gray-300">{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer font-medium transition-colors"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Link
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-400">
                                    {item?.applicant?.createdAt ? item.applicant.createdAt.split("T")[0] : "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-200 transition-colors inline-flex items-center justify-center">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 bg-gray-950 border-gray-800 text-gray-200" align="end">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    key={index}
                                                    className="flex items-center gap-2 my-1 cursor-pointer hover:bg-gray-900 p-2 text-sm rounded-md transition-colors"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`shortlistingStatus-${item._id}`}
                                                        value={status}
                                                        className="accent-blue-500 cursor-pointer h-4 w-4 bg-gray-950 border-gray-800"
                                                    />
                                                    <span className={`${status === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {status}
                                                    </span>
                                                </div>
                                            ))}
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

export default ApplicantsTable;


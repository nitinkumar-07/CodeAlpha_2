import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText = "" } = useSelector(
        (store) => store.company || {}
    );

    const navigate = useNavigate();
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        if (companies && Array.isArray(companies)) {
            const filtered = companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name
                    ?.toLowerCase()
                    ?.includes(searchCompanyByText.toLowerCase());
            });

            setFilterCompany((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(filtered)) {
                    return prev; 
                }
                return filtered;
            });
        }
    }, [companies, searchCompanyByText]);

    if (!companies || companies.length === 0) {
        return <div className="text-center p-8 text-gray-400 bg-[#111622] rounded-xl border border-[#1E2533]">No companies found.</div>;
    }

    return (
        <div>
            <Table className="text-gray-200">
                <TableCaption className="text-gray-500 border-t border-[#1E2533] pt-4">Your recent registered Companies</TableCaption>
                <TableHeader className="bg-[#161B26]">
                    <TableRow className="border-b border-[#1E2533] hover:bg-transparent">
                        <TableHead className="text-gray-400 font-semibold">Logo</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Company Name</TableHead>
                        <TableHead className="text-gray-400 font-semibold">Date</TableHead>
                        <TableHead className="text-right text-gray-400 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company?._id} className="border-b border-[#1E2533] hover:bg-[#161B26]/50 transition-colors">
                            <TableCell>
                                <Avatar className="border border-[#222B3E]">
                                    <AvatarImage
                                        src={company?.logo || "default-logo-url"}
                                        alt={`${company?.name || 'Company'} logo`}
                                    />
                                </Avatar>
                            </TableCell>

                            <TableCell className="font-medium text-gray-100">{company?.name || "N/A"}</TableCell>
                            <TableCell className="text-gray-400">
                                {company?.createdAt ? company.createdAt.split("T")[0] : "N/A"}
                            </TableCell>

                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#1E2533] rounded-full transition-all">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-[#161B26] border-[#222B3E] text-gray-200 shadow-xl p-1 rounded-lg">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company?._id}`)}
                                            className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#222B3E] p-2 rounded text-sm transition-colors text-purple-400 hover:text-purple-300"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
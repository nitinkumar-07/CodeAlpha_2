import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">
            <Navbar />

            <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">
                <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4 sm:gap-0">
                    <Input
                        className="w-full sm:w-fit bg-[#161B26] border-[#222B3E] text-gray-100 placeholder-gray-500 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                        placeholder="Filter by Name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        className="w-full sm:w-auto bg-[#6B3AC2] hover:bg-[#552d9b] text-white transition-colors duration-200" 
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        Add Company
                    </Button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#1E2533] bg-[#111622] p-2">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;
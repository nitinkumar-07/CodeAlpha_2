import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
            const response = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName: companyName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response?.data?.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message);
                const companyId = response?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            console.error("Registration error:", error.response?.data);
        }
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="bg-[#111622] border border-[#1E2533] rounded-xl shadow-xl p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-500/10 text-[#8B5CF6] shrink-0 border border-purple-500/20">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl md:text-2xl text-gray-100">
                                Create a New Company
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                What would you like to name your company? You can change this later.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="font-medium text-gray-300">Company Name</Label>
                        <Input
                            type="text"
                            placeholder="e.g. Google, Microsoft, Acme Inc."
                            className="h-11 bg-[#161B26] border-[#222B3E] text-gray-100 placeholder-gray-600 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                            value={companyName || ""}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                            This name will be visible to job seekers.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#1E2533]">
                        <Button
                            variant="outline"
                            className="border-[#222B3E] bg-transparent text-gray-300 hover:bg-[#161B26] hover:text-white"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            className="bg-[#6B3AC2] hover:bg-[#552d9b] text-white"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;
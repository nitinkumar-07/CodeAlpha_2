import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null, 
    });

    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("profile", input.file);
        }

        try {
            setLoading(true);
            const response = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 200 && response.data.message) {
                toast.success(response.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null,
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">
            <Navbar />
            <div className="max-w-xl mx-auto my-10 px-4 md:px-0">
                <form onSubmit={submitHandler} className="bg-[#111622] border border-[#1E2533] rounded-xl shadow-xl p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 border-[#222B3E] bg-transparent text-gray-400 font-semibold hover:bg-[#161B26] hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl md:text-2xl text-gray-100">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-gray-300 text-sm">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="bg-[#161B26] border-[#222B3E] text-gray-100 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-gray-300 text-sm">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-[#161B26] border-[#222B3E] text-gray-100 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-gray-300 text-sm">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="bg-[#161B26] border-[#222B3E] text-gray-100 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-gray-300 text-sm">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="bg-[#161B26] border-[#222B3E] text-gray-100 focus:border-[#6B3AC2] focus:ring-[#6B3AC2]"
                            />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <Label className="text-gray-300 text-sm">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="bg-[#161B26] border-[#222B3E] text-gray-100 file:bg-[#222B3E] file:text-gray-200 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-[#2C374E] cursor-pointer"
                            />
                            {singleCompany?.logo && !input.file && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Current logo is active. Choose a file to replace it.
                                </p>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full my-6 bg-[#6B3AC2] text-white flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-6 bg-[#6B3AC2] hover:bg-[#552d9b] text-white transition-colors">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
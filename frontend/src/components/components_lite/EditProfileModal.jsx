import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, CloudUpload, User, Mail, Phone, Code, AlignLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const EditProfileModal = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector((store) => store.auth.user);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || user?.bio || "",
        skills: Array.isArray(user?.profile?.skills)
            ? user?.profile?.skills?.join(", ")
            : (user?.skills || user?.profile?.skills || ""),
        resume: null,
    });

    const [fileName, setFileName] = useState("");
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const FileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, resume: file });
            setFileName(file.name);
        }
    };

    const handleFileChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.resume && input.resume instanceof File) {
            formData.append("profile", input.resume);
        }

        try {
            setLoading(true);
            const response = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden sm:max-w-[520px] w-[92vw] rounded-2xl max-h-[88vh] p-0 overflow-y-auto bg-[#0F1422] border border-slate-800 shadow-2xl transition-all duration-200">
                
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="p-6 sm:p-8">
                    <DialogHeader className="pb-4 border-b border-slate-800/80">
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Edit Profile Details
                        </DialogTitle>
                        <p className="text-xs text-slate-500 mt-1">Make adjustments to your public job profile information.</p>
                    </DialogHeader>

                    <form onSubmit={handleFileChange} className="space-y-4 pt-5">
                        <div className="space-y-4">
                    
                            <div className="space-y-1 group">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className="w-full bg-[#151B2C] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:bg-[#121826] focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1 group">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="w-full bg-[#151B2C] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:bg-[#121826] focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1 group">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="w-full bg-[#151B2C] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:bg-[#121826] focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                        placeholder="+91 XXXXXXXXXX"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-1 group">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Bio</label>
                                <div className="relative">
                                    <AlignLeft className="absolute left-3.5 top-3 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <textarea
                                        name="bio"
                                        rows={2}
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className="w-full bg-[#151B2C] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-600 focus:bg-[#121826] focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-none leading-relaxed"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-1 group">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Skills</label>
                                <div className="relative">
                                    <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        type="text"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className="w-full bg-[#151B2C] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:bg-[#121826] focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                                <span className="text-[10px] text-indigo-400 font-medium pl-0.5 mt-0.5 block">Separate skills with commas (,)</span>
                            </div>

                            {/* File Upload Box */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block">Resume (PDF Only)</label>
                                <label
                                    htmlFor="resume"
                                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-800 rounded-xl bg-[#151B2C]/50 hover:bg-[#151B2C] hover:border-indigo-500/60 cursor-pointer transition-all group"
                                >
                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                        <CloudUpload className="h-6 w-6 text-slate-500 group-hover:text-indigo-400 mb-1 transition-colors" />
                                        {fileName ? (
                                            <p className="text-xs font-semibold text-indigo-400 truncate max-w-[260px] bg-[#121826] border border-indigo-500/30 px-3 py-1 rounded-lg shadow-md">
                                                {fileName}
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-xs font-bold text-slate-300">Click to upload or drag file</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">PDF up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        accept="application/pdf"
                                        onChange={FileChangeHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                        </div>

                        {/* Actions Footer */}
                        <DialogFooter className="pt-4 border-t border-slate-800/80 mt-6 flex flex-col-reverse sm:flex-row gap-2 bg-[#0F1422]">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="rounded-xl border-slate-800 bg-[#161D2F] text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-xs px-4"
                            >
                                Cancel
                            </Button>
                            {loading ? (
                                <Button disabled className="bg-indigo-600 text-white rounded-xl font-medium text-xs px-5 min-w-[120px]">
                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Updating
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium text-xs px-5 shadow-lg shadow-indigo-500/10 transition-all cursor-pointer">
                                    Save Changes
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileModal;
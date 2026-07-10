import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components_lite/Navbar"
import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, User, Mail, Phone, Lock, UploadCloud } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user} = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const ChangeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("profile", input.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error);
      const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#050508] min-h-screen text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-violet-600/20 to-indigo-600/50 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-xl bg-[#0c0d14]/40 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 md:p-10 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                Get Started
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-3">Create Account</h2>
            <p className="text-slate-400 text-xs mt-1">Join thousands of tech professionals today</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            
            {/* Input fields*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter Full Name" className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 outline-none text-xs" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter Email Address" className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 outline-none text-xs" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="+91 0000000000" className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 outline-none text-xs" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Choose safe password" className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 outline-none text-xs" />
                </div>
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Select Role Type</label>
              <div className="flex gap-3">
                <label className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2.5 cursor-pointer transition-all text-xs font-medium ${input.role === "Student" ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/5 bg-white/[0.01] text-slate-400'}`}>
                  <input type="radio" name="role" value="Student" checked={input.role === "Student"} onChange={changeEventHandler} className="accent-violet-500" /> Student
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2.5 cursor-pointer transition-all text-xs font-medium ${input.role === "Recruiter" ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/5 bg-white/[0.01] text-slate-400'}`}>
                  <input type="radio" name="role" value="Recruiter" checked={input.role === "Recruiter"} onChange={changeEventHandler} className="accent-violet-500" /> Recruiter
                </label>
              </div>
            </div>

            {/* File Upload*/}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Profile Picture / Attachment</label>
              <div className="relative border border-dashed border-white/10 hover:border-violet-500/30 rounded-xl p-3 bg-white/[0.01] text-center transition-colors group cursor-pointer">
                <input type="file" accept="image/*" onChange={ChangeFileHandler} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                <div className="flex items-center justify-center gap-2 text-slate-400 group-hover:text-slate-200">
                  <UploadCloud size={16} className="text-violet-400" />
                  <span className="text-xs font-medium truncate max-w-xs">
                    {input.file ? `Selected: ${input.file.name}` : "Click to upload image object"}
                  </span>
                </div>
              </div>
            </div>

            {/* Register Submit Button */}
            {loading ? (
              <button disabled className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 opacity-80 text-xs font-semibold mt-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Finalizing registration...
              </button>
            ) : (
              <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-violet-600/10 cursor-pointer active:scale-98 text-xs tracking-wide mt-2">
                Create Account
              </button>
            )}

            <p className="text-center text-xs text-slate-500 tracking-wide pt-1">
              Already have an account? <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold ml-1 cursor-pointer transition-colors">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

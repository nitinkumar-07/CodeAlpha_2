import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components_lite/Navbar"
import { useState, useEffect } from "react" 
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
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

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                navigate("/");
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-[#050508] min-h-screen text-slate-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 py-16 relative overflow-hidden">
               
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-violet-700/10 to-indigo-600/50 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full max-w-md bg-[#0c0d14]/40 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 md:p-10 relative z-10">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                            Secure Access
                        </span>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight mt-3">Welcome Back</h2>
                        <p className="text-slate-400 text-xs mt-1">Connect to launch your career dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={input.email} 
                                    onChange={changeEventHandler} 
                                    placeholder="name@example.com" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all outline-none text-sm" 
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={input.password} 
                                    onChange={changeEventHandler} 
                                    placeholder="••••••••" 
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all outline-none text-sm" 
                                />
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Account Type</label>
                            <div className="flex gap-3">
                                <label className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2.5 cursor-pointer transition-all text-xs font-medium ${input.role === "Student" ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/10'}`}>
                                    <input type="radio" name="role" value="Student" checked={input.role === "Student"} onChange={changeEventHandler} className="accent-violet-500" /> Student
                                </label>
                                <label className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2.5 cursor-pointer transition-all text-xs font-medium ${input.role === "Recruiter" ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/10'}`}>
                                    <input type="radio" name="role" value="Recruiter" checked={input.role === "Recruiter"} onChange={changeEventHandler} className="accent-violet-500" /> Recruiter
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {loading ? (
                            <button disabled className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 opacity-80 text-sm font-semibold pt-3">
                                <Loader2 className="h-4 w-4 animate-spin" /> Verification in progress...
                            </button>
                        ) : (
                            <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-violet-600/10 cursor-pointer active:scale-98 text-sm tracking-wide pt-3">
                                Sign In
                            </button>
                        )}

                        <p className="text-center text-xs text-slate-500 tracking-wide pt-2">
                            New to the network? <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold cursor-pointer ml-1 transition-colors">Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
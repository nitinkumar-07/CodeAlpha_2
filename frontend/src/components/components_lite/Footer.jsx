import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#06070a] border-t border-white/5 text-slate-400 py-8 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Copyright Segment */}
                <div className="text-center md:text-left text-xs md:text-sm">
                    <p>© 2026 Platform Matrix. Engineered by{" "}
                        <a href="https://github.com/nitinkumar-07" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                            Nitin Kumar
                        </a>
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">All architectural vectors securely mapped.</p>
                </div>

                <div className="flex items-center gap-6 text-xs font-medium">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Charter</Link>
                    <span className="text-slate-800">/</span>
                    <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Operations</Link>
                </div>

                <div className="flex items-center gap-4 text-slate-500">
                    <a href="#" className="hover:text-white transition-colors"><FaTwitter size={16} /></a>
                    <a href="https://github.com/nitinkumar-07" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub size={16} /></a>
                    <a href="https://www.linkedin.com/in/nitin-kumar-491813336/"
                    target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin size={16} /></a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
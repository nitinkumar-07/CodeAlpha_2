import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar, Briefcase, Building2, CheckCircle2 } from "lucide-react";

const AppliedJob = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job) || {};

    return (
        <div className="w-full bg-[#111622] rounded-xl border border-slate-800/80 overflow-hidden shadow-inner shadow-black/20">
            <Table>
                <TableHeader className="bg-[#141B2B]/40 border-b border-slate-800/60">
                    <TableRow className="hover:bg-transparent border-slate-800/50">
                        <TableHead className="w-[140px] font-bold text-slate-400 text-xs tracking-wider uppercase pl-6 py-4">
                            <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-slate-500" /> Date</span>
                        </TableHead>
                        <TableHead className="font-bold text-slate-400 text-xs tracking-wider uppercase py-4">
                            <span className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 text-slate-500" /> Job Title</span>
                        </TableHead>
                        <TableHead className="font-bold text-slate-400 text-xs tracking-wider uppercase py-4">
                            <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-slate-500" /> Company</span>
                        </TableHead>
                        <TableHead className="text-right font-bold text-slate-400 text-xs tracking-wider uppercase pr-6 py-4">
                            <span className="flex items-center justify-end gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-slate-500" /> Status</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-slate-800/40">
                    {allAppliedJobs.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={4} className="text-center font-medium text-slate-500 py-8 italic bg-[#111622]">
                                You have not applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => {
                            const status = appliedJob?.status?.toLowerCase() || "pending";
                            
                            let badgeStyles = "bg-slate-500/10 text-slate-400 border-slate-500/20";
                            if (status === "rejected") badgeStyles = "bg-rose-500/10 text-rose-400 border-rose-500/20";
                            if (status === "accepted" || status === "selected") badgeStyles = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

                            return (
                                <TableRow key={appliedJob?._id} className="border-slate-800/40 hover:bg-[#151B2C]/40 transition-colors">
                                    <TableCell className="pl-6 py-4 text-slate-300 font-medium text-xs">
                                        {appliedJob?.createdAt ? appliedJob.createdAt.split("T")[0] : "N/A"}
                                    </TableCell>
                                    <TableCell className="text-white font-semibold text-sm py-4">
                                        {appliedJob.job?.title || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-slate-400 py-4 font-medium">
                                        {appliedJob.job?.company?.name || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-right pr-6 py-4">
                                        <Badge className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border uppercase backdrop-blur-xs shadow-xs ${badgeStyles}`}>
                                            {status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJob;
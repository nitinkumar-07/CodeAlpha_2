import { Application } from "../models/application.model.js";
import { Job } from "../models/jobmodel.js";


export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Invalid Job ID",
                success: false
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        const application = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(application._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true
        });

    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: { path: "company", options: { sort: { createdAt: -1 } } }
        });

        if (!applications) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applied jobs fetched successfully",
            success: true,
            applications
        });

    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: { path: "applicant", options: { sort: { createdAt: -1 } } }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applicants fetched successfully",
            success: true,
            applicants: job.applications
        });

    } catch (error) {
        console.error("Error fetching applicants:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const statusUpdate = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            });
        }
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            success: true,
            application
        });
    } catch (error) {
        console.error("Error updating application status:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
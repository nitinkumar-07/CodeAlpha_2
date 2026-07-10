import { Job } from "../models/jobmodel.js";
//admin job post
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, companyId, salary, experienceLevel, location, jobType, position } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !companyId || (experienceLevel === undefined || experienceLevel === null || experienceLevel === "") || !location || !jobType || !position) {
            return res.status(400).json({
                message: "Fill all the fields ",
                success: false,
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            experienceLevel,
            location,
            jobType,
            position,
            company: companyId,
            created_by: userId
        });

        res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error post job",
            success: false,
        })
    }
};


export const getAllJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { jobType: { $regex: keyword, $options: "i" } },
                { position: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error fetching jobs",
            success: false,
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Job fetched successfully",
            success: true,
            job
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error fetching job by id",
            success: false,
        });
    }
};

//admin job created
export const getAdminJob = async (req, res) => {
    try {
        console.log("req.id =", req.id);
        console.log("Logged In User ID (req.id):", req.id);

        const jobs = await Job.find({
            created_by: req.id
        }).populate("company");

        console.log("Jobs =", jobs);

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (err) {
        console.log(err);
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updateData = req.body;

        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
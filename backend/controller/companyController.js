import { Company } from "../models/company.model.js";
import GetDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloud.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "company already exists",
                success: false,
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Created Successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error register company",
            success: false,
        })
    }
};


export const getAllCompanies = async (req, res) => {
    try {

        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "No companies found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Companies fetched successfully",
            success: true,
            companies,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error get all companies",
            success: false,
        })
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            company,
            success: true,

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error get company by id",
            success: false,
        })
    }
};

//update company details

export const updateCompany = async (req, res) => {
    try {

        console.log("Data Received:", req.body);
        console.log("File Received:", req.file);


        const companyId = req.params.id;
        const { name, description, website, location } = req.body;
        const file = req.file;

        const fileUri = GetDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error update company",
            success: false,
        })
    }
};

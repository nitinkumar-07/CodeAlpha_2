import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from "../utils/cloud.js";
import GetDataUri from "../utils/dataUri.js";
import { Readable } from "stream";
// import cookie-parser from 'cookie-parser';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All feilds are required", success: false })
        }

        const file = req.file;
        const fileUri = GetDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exits",
                success: false,
            });
        }

        const phoneUser = await User.findOne({ phoneNumber });
        if (phoneUser) {
            return res.status(400).json({
                message: "Phone number already exits",
                success: false,
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse?.secure_url || "",
            }
        });

        await newUser.save();

        return res.status(200).json({
            message: `Account created successfully ${fullname}`,
            success: true,
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(404).json({
                message: "Missing required feilds", success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(404).json({
                message: "Incorrect username or password",
                success: false,
            })
        }

        if (user.role !== role) {
            return res.status(403).json({
                message: "you don't have the necessary role to access this",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error login failed",
            success: false,
        })
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error logout",
            success: false,
        })
    }
};


export const updateProfile = async (req, res) => {
    try {

        console.log("req.id =", req.id);

        console.log("--- DEBUG START ---");
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);
        console.log("--- DEBUG END ---");

        console.log("Buffer Length:", req.file?.buffer?.length);
        console.log("Size:", req.file?.size);

        // if (!req.file) {
        //     return res.status(400).json({
        //         message: "No file uploaded.",
        //         success: false
        //     });
        // }
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let cloudResponse;
        if (file && file.buffer) {
            // const fileUri = GetDataUri(file);
            // cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            //     resource_type: "auto"
            // });

            // const fileBase64 = file.buffer.toString("base64");
            // const fileUri = `data:${file.mimetype};base64,${fileBase64}`;
            const fileBase64 = file.buffer.toString("base64");
            const fileUri = `data:${file.mimetype};base64,${fileBase64}`;
            // const fileUri = GetDataUri(file);

            //file ka naam nikalne ke liyee
            const cleanFileName = file.originalname.split('.').slice(0, -1).join('.');
            const uniquePublicId = `${cleanFileName}_${Date.now()}`;

            cloudResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "job_portal_resumes",
                        public_id: uniquePublicId,
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Stream Error:", error);
                            return reject(error);
                        }
                        resolve(result);
                    }
                );

                uploadStream.end(file.buffer);
            });
        }

        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());;

        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

        if (fullname) {
            user.fullname = fullname;
        }
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (!user.profile) {
            user.profile = {};
        }
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error updating profile",
            success: false,
        })
    }
}



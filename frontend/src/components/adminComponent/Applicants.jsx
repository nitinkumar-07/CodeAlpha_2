import { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice.js";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );
                dispatch(setAllApplicants(res.data.applicants));
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 my-10 md:px-0">
                <h1 className="font-bold text-2xl my-5 text-gray-100">
                    Applicants ({applicants?.length || 0})
                </h1>
                <div className="overflow-x-auto border border-gray-800 rounded-md bg-gray-900">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    );
};

export default Applicants;
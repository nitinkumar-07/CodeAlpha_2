import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom"; 

const useGetAllAdminJobs = () => {
    console.log("Hook Called");
    const dispatch = useDispatch();
    const location = useLocation(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
                    withCredentials: true,
                });
                console.log("Fresh API Response:", res.data);
                if ( res.data.success || res.data.status) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    setError("Failed to fetch jobs.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                setError(error.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch, location.pathname]);

    return { loading, error };
};

export default useGetAllAdminJobs;
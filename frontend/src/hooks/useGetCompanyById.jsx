import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {setSingleCompany} from "@/redux/companySlice";
const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const FetchSingleCompany = async () => {
            setLoading(true);
            setError(null);
            try {

                const res = await axios.get(
                    `${COMPANY_API_ENDPOINT}/get/${companyId}`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("API Response:", res.data);
                if (res.data.success) {
                    // Updated success check
                    dispatch(setSingleCompany(res.data.company));
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

        if (companyId) {
            FetchSingleCompany();
        }
    }, [companyId, dispatch]);

    return { loading, error };
};

export default useGetCompanyById
import {useEffect, useState} from "react";
import jobService from "../services/jobService";
import {Jobs} from "../types/jobInterfaces";


function useFetchJobs(jobTitle : string, page : number = 1, limit = 10){
    const [data, setData] = useState<Jobs>({ total : 0, ads : []})
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!jobTitle) {
            setData({ total: 0, ads: [] });
            setLoading(false);
            return;
        }
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const jobList = await jobService.fetchJobs(jobTitle, page, limit)
                setData(jobList.content);
            } catch (e) {
                setError(e as Error)
            } finally {
                setLoading(false)
            }
        };

        fetchJobs();
    }, [jobTitle, page]);

    return { data, loading, error };
}

export default useFetchJobs;
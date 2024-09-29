import {JobsResponse} from "../types/jobInterfaces";

const jobService = {
    fetchJobs: async (jobTitle: string, page : number, limit: number): Promise<JobsResponse> => {
        const baseUrl = 'http://localhost:3001/api/v1/jobs/bordeaux';
        const url = `${baseUrl}?jobTitle=${encodeURIComponent(jobTitle)}&page=${page}&limit=${limit}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching jobs:", error);
            throw error;
        }
    },
};

export default jobService;

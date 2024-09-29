import {ProvideSingleton} from "../util/provideSingleton";
import {jobData} from "../domain/Job/JobInterface";
import HttpError from "../middleware/httpError";

interface JobsListResponse {
    code: number;
    message: string;
    data: jobData;
}

@ProvideSingleton(JobsService)
export class JobsService {
    async getJobsList(token: string, city: string, limit: number, jobTitle: string, page: number): Promise<jobData> {
        try {
            const params = {
                what: jobTitle,
                where: city,
                limit: String(limit),
                page: String(page),
            };

            const response = await fetch(`https://api.jobijoba.com/v3/fr/ads/search?${new URLSearchParams(params)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data: JobsListResponse = await response.json();
            return data.data;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(`Error retrieving jobs : ${error.message}`, error.statusCode);
            } else {
                throw new HttpError('Internal server error', 500);
            }
        }
    }
}
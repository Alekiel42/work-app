import {
    Controller,
    Example,
    Get,
    Query,
    Route,
} from "tsoa";
import {jobData} from "../domain/Job/JobInterface";
import {ProvideSingleton} from "../util/provideSingleton";
import {inject} from "inversify";
import {SecurityTokenService} from "../services/securityTokenService"
import {JobsService} from "../services/jobsService";
import HttpError from "../middleware/httpError";

interface ResponseContent {
    content: jobData;
}

@ProvideSingleton(JobsController)
@Route("/api/v1/jobs")
export class JobsController extends Controller {
    constructor(
        @inject(SecurityTokenService)
        private readonly securityToken: SecurityTokenService,
        @inject(JobsService)
        private readonly jobsService: JobsService,
    ) {
        super();
    }

    /**
     * Retrieve a job's list
     * @summary GetJobs: get job's list at Bordeaux from a job title
     * @param jobTitle The job title
     * @param page The page number for pagination (default is 1)
     * @param limit The maximum number of job entries to return per page (default is 10).
     * @returns {ResponseContent} Success: return jobs list
     */
    @Example<ResponseContent>({
        content: {
            total: 24,
            ads: [
                {
                    id: "42",
                    link: "https://example.com/job/42",
                    title: "Développeuse web confirmé",
                    description: "Description du poste.",
                    publicationDate: "2024-09-27",
                    coordinates: "44.837789, -0.57918",
                    city: "Bordeaux",
                    postalCode: "33000",
                    department: "33",
                    region: "Nouvelle-Aquitaine",
                    sector: "Tech",
                    jobtitle: "Développeuse web",
                    company: "Seekube",
                    contractType: ["CDI"],
                    salary: "3500€"
                }
            ]
        },
    })
    @Get("/bordeaux")
    public async getJobs(
        @Query() jobTitle: string,
        @Query() page: number = 1,
        @Query() limit: number = 10
    ): Promise<ResponseContent> {
        const city = "Bordeaux"
        if (!jobTitle) {
            throw HttpError.badRequest(`The job title is required.`);
        }
        if (page < 1) {
            throw HttpError.badRequest(`The page number must be greater than 0.`);
        }
        if (limit < 1) {
            throw HttpError.badRequest(`The limit number must be greater than 0.`);
        }

        try {
            const token = await this.securityToken.getSecurityToken();

            const jobsList = await this.jobsService.getJobsList(token, city, limit, jobTitle, page);

            return {
                content : jobsList
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while retrieving jobs: ${error.message}`);
            } else {
                throw new Error(`Unknown error: ${String(error)}`);
            }
        }
    }
}